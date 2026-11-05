#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const COMPONENTS_DIR = path.join(ROOT, 'docs', 'en', 'components');
const DOCS_DIR = path.join(ROOT, 'docs', 'en');
const TRANSLATION_DIRS = [path.join(ROOT, 'docs', 'ru')];
const UI_SRC_DIR = path.join(ROOT, 'packages', 'ui', 'src');
const EXTRA_MARKDOWN_FILES = [path.join(ROOT, 'packages', 'ui', 'README.md')];
const ALLOWED_COMPONENT_FILES = new Set<string>([
  'index.md',
  'examples.md',
  'api.md',
  'anatomy.md',
  'styling.md',
  'accessibility.md',
  'comparison.md',
  'patterns.md',
  'troubleshooting.md',
]);
const DOC_PROFILES = [
  'primitive',
  'form-control',
  'compound',
  'advanced interactive',
] as const;
const DOC_PROFILE_REQUIRED_FILES: Record<(typeof DOC_PROFILES)[number], readonly string[]> = {
  primitive: ['index.md'],
  'form-control': ['index.md', 'examples.md', 'api.md', 'accessibility.md'],
  compound: ['index.md', 'anatomy.md', 'examples.md', 'api.md'],
  'advanced interactive': [
    'index.md',
    'anatomy.md',
    'examples.md',
    'api.md',
    'styling.md',
    'accessibility.md',
    'comparison.md',
    'patterns.md',
    'troubleshooting.md',
  ],
};
const TAXONOMY = [
  'Basic',
  'Controlled/Stateful',
  'Form/Integration',
  'Layout/Overlay',
  'Error',
  'Disabled',
  'Edge',
] as const;

const errors: string[] = [];
const warnings: string[] = [];

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

function getH2Headings(content: string): string[] {
  return Array.from(content.matchAll(/^## (.+)$/gm), (match) => match[1].trim());
}

function getH3Headings(content: string): string[] {
  return Array.from(content.matchAll(/^### (.+)$/gm), (match) => match[1].trim());
}

function getHeadingDepths(content: string): number[] {
  return Array.from(content.replace(/```[\s\S]*?```/g, '').matchAll(/^(#{2,3}) .+$/gm), (match) => match[1].length);
}

function validateHeadingStructure(translationFile: string, englishFile: string): void {
  const translated = getHeadingDepths(readFile(translationFile));
  const english = getHeadingDepths(readFile(englishFile));

  if (translated.join() === english.join()) {
    return;
  }

  warnings.push(
    `${rel(translationFile)}: h2/h3 structure differs from ${rel(englishFile)} (${translated.length} vs ${english.length} headings), so its anchors fall back to translated slugs.`,
  );
}

function getDocProfile(content: string): string | null {
  const match = content.match(/^## Doc Profile\s+`([^`]+)`/m);
  return match?.[1]?.trim() ?? null;
}

function hasHeading(content: string, level: number, heading: string): boolean {
  const re = new RegExp(`^${'#'.repeat(level)} ${escapeRegExp(heading)}$`, 'm');
  return re.test(content);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    errors.push(message);
  }
}

function assertHeadingsInOrder(
  filePath: string,
  actualHeadings: string[],
  orderedSubset: readonly string[],
): void {
  let lastIndex = -1;

  for (const heading of actualHeadings) {
    const index = orderedSubset.indexOf(heading);

    if (index === -1) {
      continue;
    }

    if (index < lastIndex) {
      errors.push(
        `${rel(filePath)}: heading "${heading}" is out of order for the declared documentation contract.`,
      );
      return;
    }

    lastIndex = index;
  }
}

function rel(filePath: string): string {
  return path.relative(ROOT, filePath);
}

function toSourceComponentName(componentDirName: string): string {
  return componentDirName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function resolveModuleFile(specifier: string, containingFile: string): string | null {
  if (!specifier.startsWith('.')) {
    return null;
  }

  const base = path.resolve(path.dirname(containingFile), specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.d.ts`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
    path.join(base, 'index.d.ts'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function collectPublicTypeExports(
  entryFilePath: string,
  seen = new Set<string>(),
  cache = new Map<string, Set<string>>(),
): Set<string> {
  const normalized = path.normalize(entryFilePath);

  if (cache.has(normalized)) {
    return cache.get(normalized) ?? new Set<string>();
  }

  if (seen.has(normalized) || !fs.existsSync(normalized)) {
    return new Set<string>();
  }

  seen.add(normalized);

  const content = fs.readFileSync(normalized, 'utf8');
  const sourceFile = ts.createSourceFile(
    normalized,
    content,
    ts.ScriptTarget.Latest,
    true,
    normalized.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const exports = new Set<string>();

  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement)) {
      const specifier = statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
        ? statement.moduleSpecifier.text
        : null;

      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) {
          if (statement.isTypeOnly || element.isTypeOnly) {
            exports.add(element.name.text);
          }
        }
      } else if (specifier) {
        const resolved = resolveModuleFile(specifier, normalized);
        if (resolved) {
          for (const name of Array.from(collectPublicTypeExports(resolved, seen, cache))) {
            exports.add(name);
          }
        }
      }

      continue;
    }

    const modifiers = (statement as ts.Node & { modifiers?: ts.NodeArray<ts.ModifierLike> }).modifiers;
    const isExported = Boolean(modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));

    if (
      isExported &&
      (ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name
    ) {
      exports.add(statement.name.text);
    }
  }

  cache.set(normalized, exports);
  return exports;
}

function getExportedTypesFromIndexDoc(content: string): string[] {
  const blockMatch = content.match(/## Exported Types\s+([\s\S]*?)(?:\n## |$)/m);
  if (!blockMatch) {
    return [];
  }

  const results: string[] = [];

  for (const line of blockMatch[1].split('\n')) {
    const match = line.match(/^- `([^`]+)`/);
    if (!match) {
      continue;
    }

    const raw = match[1].trim();
    const name = raw.split(/[ <(=]/)[0];
    if (name) {
      results.push(name);
    }
  }

  return results;
}

function listMarkdownFiles(dirPath: string): string[] {
  const result: string[] = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }) as import('node:fs').Dirent[];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      result.push(...listMarkdownFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      result.push(entryPath);
    }
  }

  return result;
}

function listComponentDirs(): string[] {
  return fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry: import('node:fs').Dirent) => entry.isDirectory() && !entry.name.startsWith('_'))
    .map((entry: import('node:fs').Dirent) => path.join(COMPONENTS_DIR, entry.name));
}

function slugifyHeading(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[`]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

function getMarkdownAnchors(filePath: string): Set<string> {
  const content = readFile(filePath);
  const headings = Array.from(content.matchAll(/^(#{1,6}) (.+)$/gm), (match) => match[2].trim());
  return new Set(headings.map(slugifyHeading));
}

function splitLinkTarget(target: string): { pathPart: string; anchorPart: string } {
  const hashIndex = target.indexOf('#');

  if (hashIndex === -1) {
    return { pathPart: target, anchorPart: '' };
  }

  return {
    pathPart: target.slice(0, hashIndex),
    anchorPart: target.slice(hashIndex + 1),
  };
}

function resolveLinkPath(sourceFile: string, pathPart: string): string {
  if (path.isAbsolute(pathPart)) {
    return path.normalize(pathPart);
  }

  return path.resolve(path.dirname(sourceFile), pathPart);
}

function validateMarkdownLinks(filePath: string): void {
  const content = readFile(filePath);
  const linkTargets = Array.from(
    content.matchAll(/\[[^\]]+\]\(([^)\s]+(?:#[^)]+)?)\)/g),
    (match) => match[1].trim(),
  );

  for (const target of linkTargets) {
    if (
      target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('mailto:') ||
      target.startsWith('tel:')
    ) {
      continue;
    }

    const { pathPart, anchorPart } = splitLinkTarget(target);
    const resolvedPath = pathPart ? resolveLinkPath(filePath, pathPart) : filePath;

    if (!fs.existsSync(resolvedPath)) {
      errors.push(`${rel(filePath)}: broken link target "${target}".`);
      continue;
    }

    if (!anchorPart) {
      continue;
    }

    let anchorFilePath = resolvedPath;

    if (fs.statSync(anchorFilePath).isDirectory()) {
      const indexPath = path.join(anchorFilePath, 'index.md');

      if (!fs.existsSync(indexPath)) {
        errors.push(`${rel(filePath)}: link target "${target}" points to a directory without index.md.`);
        continue;
      }

      anchorFilePath = indexPath;
    }

    if (!anchorFilePath.endsWith('.md')) {
      continue;
    }

    const anchors = getMarkdownAnchors(anchorFilePath);
    if (!anchors.has(anchorPart)) {
      errors.push(
        `${rel(filePath)}: broken anchor "${target}" (anchor not found in ${rel(anchorFilePath)}).`,
      );
    }
  }
}

function validateIndex(filePath: string): void {
  const content = readFile(filePath);
  const h2 = getH2Headings(content);
  const docProfile = getDocProfile(content);
  const componentDirName = path.basename(path.dirname(filePath));
  const sourceEntryPath = path.join(UI_SRC_DIR, toSourceComponentName(componentDirName), 'index.ts');

  assert(/^# .+/m.test(content), `${rel(filePath)}: missing H1 title.`);
  assert(hasHeading(content, 2, 'Summary'), `${rel(filePath)}: missing "## Summary".`);
  assert(hasHeading(content, 2, 'Imports'), `${rel(filePath)}: missing "## Imports".`);
  assert(hasHeading(content, 2, 'Variants'), `${rel(filePath)}: missing "## Variants".`);
  assert(hasHeading(content, 2, 'Edge Cases'), `${rel(filePath)}: missing "## Edge Cases".`);
  assert(
    hasHeading(content, 2, 'Common Mistakes'),
    `${rel(filePath)}: missing "## Common Mistakes".`,
  );
  assert(
    hasHeading(content, 2, 'Example') ||
      hasHeading(content, 2, 'Minimal Composition') ||
      hasHeading(content, 2, 'Basic Usage'),
    `${rel(filePath)}: missing primary usage section ("## Example", "## Minimal Composition", or "## Basic Usage").`,
  );

  if (docProfile !== null) {
    assert(
      DOC_PROFILES.includes(docProfile as (typeof DOC_PROFILES)[number]),
      `${rel(filePath)}: invalid doc profile "${docProfile}".`,
    );

    assertHeadingsInOrder(filePath, h2, ['Doc Profile', 'Summary', 'Imports', 'Exported Types']);
  } else {
    assertHeadingsInOrder(filePath, h2, ['Summary', 'Imports', 'Exported Types']);
  }

  const primaryUsageIndex = Math.min(
    ...['Example', 'Minimal Composition', 'Basic Usage']
      .map((heading) => h2.indexOf(heading))
      .filter((index) => index !== -1),
  );
  const variantsIndex = h2.indexOf('Variants');
  const edgeCasesIndex = h2.indexOf('Edge Cases');
  const mistakesIndex = h2.indexOf('Common Mistakes');

  assert(
    Number.isFinite(primaryUsageIndex) &&
      (edgeCasesIndex === -1 || primaryUsageIndex < edgeCasesIndex),
    `${rel(filePath)}: primary usage section should appear before "## Edge Cases".`,
  );
  assert(
    variantsIndex === -1 || edgeCasesIndex === -1 || variantsIndex < edgeCasesIndex,
    `${rel(filePath)}: "## Variants" should appear before "## Edge Cases".`,
  );
  assert(
    edgeCasesIndex === -1 || mistakesIndex === -1 || edgeCasesIndex < mistakesIndex,
    `${rel(filePath)}: "## Edge Cases" should appear before "## Common Mistakes".`,
  );

  if (fs.existsSync(sourceEntryPath) && hasHeading(content, 2, 'Exported Types')) {
    const documentedTypes = getExportedTypesFromIndexDoc(content);
    const publicTypeExports = collectPublicTypeExports(sourceEntryPath);

    for (const documentedType of documentedTypes) {
      assert(
        publicTypeExports.has(documentedType),
        `${rel(filePath)}: "${documentedType}" is listed in "## Exported Types" but is not a public type export of ${toSourceComponentName(componentDirName)}/index.ts.`,
      );
    }
  }
}

function validateDocProfile(componentDir: string, fileNames: Set<string>, profile: string): void {
  if (!DOC_PROFILES.includes(profile as (typeof DOC_PROFILES)[number])) {
    return;
  }

  const requiredFiles = DOC_PROFILE_REQUIRED_FILES[profile as (typeof DOC_PROFILES)[number]];

  for (const requiredFile of requiredFiles) {
    assert(
      fileNames.has(requiredFile),
      `${rel(componentDir)}: doc profile "${profile}" requires "${requiredFile}".`,
    );
  }
}

function validateExamples(filePath: string): void {
  const content = readFile(filePath);
  const h2 = getH2Headings(content);
  const h3 = getH3Headings(content);

  assert(/^# .+ Examples$/m.test(content), `${rel(filePath)}: H1 should end with "Examples".`);

  for (const heading of h2) {
    assert(
      TAXONOMY.includes(heading as (typeof TAXONOMY)[number]),
      `${rel(filePath)}: unexpected H2 heading "${heading}" in examples.md.`,
    );
  }

  assertHeadingsInOrder(filePath, h2, TAXONOMY);

  for (const heading of h3) {
    const matchesPrefix = TAXONOMY.some(
      (prefix) => heading === prefix || heading.startsWith(`${prefix}: `),
    );
    assert(
      matchesPrefix,
      `${rel(filePath)}: H3 example heading "${heading}" must use a shared taxonomy prefix.`,
    );
  }
}

function validateApi(filePath: string): void {
  const content = readFile(filePath);
  const h2 = getH2Headings(content);

  assert(/^# .+ API$/m.test(content), `${rel(filePath)}: H1 should end with "API".`);
  assert(
    hasHeading(content, 2, 'Root API') || hasHeading(content, 2, 'Root Props'),
    `${rel(filePath)}: missing "## Root API" or "## Root Props".`,
  );
  assert(hasHeading(content, 2, 'Types'), `${rel(filePath)}: missing "## Types".`);
  assert(hasHeading(content, 2, 'State Model'), `${rel(filePath)}: missing "## State Model".`);

  assertHeadingsInOrder(filePath, h2, [
    'Root API',
    'Root Props',
    'Child Parts API',
    'Child Parts',
    'Hooks',
    'Types',
    'State Model',
    'Integration Notes',
  ]);
}

function validateAnatomy(filePath: string): void {
  const content = readFile(filePath);
  const h2 = getH2Headings(content);

  assert(/^# .+ Anatomy$/m.test(content), `${rel(filePath)}: H1 should end with "Anatomy".`);
  for (const heading of [
    'Overview',
    'Required Parts',
    'Optional Parts',
    'Composition Order',
    'Valid Composition Patterns',
    'Invalid Composition Patterns',
  ]) {
    assert(hasHeading(content, 2, heading), `${rel(filePath)}: missing "## ${heading}".`);
  }

  assertHeadingsInOrder(filePath, h2, [
    'Overview',
    'Required Parts',
    'Optional Parts',
    'Composition Order',
    'Valid Composition Patterns',
    'Invalid Composition Patterns',
  ]);
}

function validateStyling(filePath: string): void {
  const content = readFile(filePath);
  const h2 = getH2Headings(content);

  assert(/^# .+ Styling$/m.test(content), `${rel(filePath)}: H1 should end with "Styling".`);
  for (const heading of [
    'Overview',
    'Public CSS Variables',
    'Part-Level Variables',
    'State And Variant Interaction',
    'Examples',
    'Do Not Override',
  ]) {
    assert(hasHeading(content, 2, heading), `${rel(filePath)}: missing "## ${heading}".`);
  }

  assertHeadingsInOrder(filePath, h2, [
    'Overview',
    'Public CSS Variables',
    'Part-Level Variables',
    'State And Variant Interaction',
    'Examples',
    'Do Not Override',
  ]);
}

function validateAccessibility(filePath: string): void {
  const content = readFile(filePath);
  const h2 = getH2Headings(content);

  assert(
    /^# .+ Accessibility$/m.test(content),
    `${rel(filePath)}: H1 should end with "Accessibility".`,
  );
  for (const heading of [
    'Labeling',
    'Keyboard Behavior',
    'Focus Behavior',
    'Screen Reader Semantics',
    'Accessibility Risks',
  ]) {
    assert(hasHeading(content, 2, heading), `${rel(filePath)}: missing "## ${heading}".`);
  }

  assertHeadingsInOrder(filePath, h2, [
    'Responsibilities',
    'Labeling',
    'Keyboard Behavior',
    'Focus Behavior',
    'Screen Reader Semantics',
    'Form Semantics',
    'Accessibility Risks',
  ]);
}

function validateComparison(filePath: string): void {
  const content = readFile(filePath);
  const h2 = getH2Headings(content);

  assert(
    /^# .+ Comparison$/m.test(content),
    `${rel(filePath)}: H1 should end with "Comparison".`,
  );
  for (const heading of [
    'Quick Decision Rule',
    'Choose This Component When',
    'Do Not Choose This Component When',
  ]) {
    assert(hasHeading(content, 2, heading), `${rel(filePath)}: missing "## ${heading}".`);
  }

  assertHeadingsInOrder(filePath, h2, [
    'Quick Decision Rule',
    'Choose This Component When',
    'Do Not Choose This Component When',
  ]);
}

function validatePatterns(filePath: string): void {
  const content = readFile(filePath);

  assert(/^# .+ Patterns$/m.test(content), `${rel(filePath)}: H1 should end with "Patterns".`);

  const sections = content.split(/^## /gm).slice(1);
  assert(sections.length > 0, `${rel(filePath)}: patterns.md should contain at least one H2 pattern.`);

  for (const section of sections) {
    const title = section.split('\n', 1)[0]?.trim() || '(unknown)';
    for (const marker of ['When to use:', 'Composition notes:', 'Trade-offs:']) {
      assert(
        section.includes(marker),
        `${rel(filePath)}: pattern "${title}" is missing "${marker}".`,
      );
    }
  }
}

function validateTroubleshooting(filePath: string): void {
  const content = readFile(filePath);

  assert(
    /^# .+ Troubleshooting$/m.test(content),
    `${rel(filePath)}: H1 should end with "Troubleshooting".`,
  );

  const sections = content.split(/^## /gm).slice(1);
  assert(
    sections.length > 0,
    `${rel(filePath)}: troubleshooting.md should contain at least one problem section.`,
  );

  for (const section of sections) {
    const title = section.split('\n', 1)[0]?.trim() || '(unknown)';
    for (const marker of ['### Symptom', '### Likely Cause', '### How To Verify', '### Fix']) {
      assert(
        section.includes(marker),
        `${rel(filePath)}: troubleshooting item "${title}" is missing "${marker}".`,
      );
    }
  }
}

function validateComponentDir(componentDir: string): void {
  const entries = fs.readdirSync(componentDir, { withFileTypes: true }) as import('node:fs').Dirent[];
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md'));
  const fileNames = new Set(files.map((entry) => entry.name));
  const indexPath = path.join(componentDir, 'index.md');

  assert(
    fileNames.has('index.md'),
    `${rel(componentDir)}: every component directory must contain index.md.`,
  );

  for (const file of files) {
    assert(
      ALLOWED_COMPONENT_FILES.has(file.name),
      `${rel(path.join(componentDir, file.name))}: unexpected file name for component docs.`,
    );
  }

  for (const entry of entries) {
    assert(
      !entry.isDirectory(),
      `${rel(path.join(componentDir, entry.name))}: nested directories are not allowed inside a component docs directory.`,
    );
  }

  if (fileNames.has('index.md')) {
    const docProfile = getDocProfile(readFile(indexPath));
    if (docProfile !== null) {
      validateDocProfile(componentDir, fileNames, docProfile);
    }
  }

  for (const fileName of Array.from(fileNames)) {
    const filePath = path.join(componentDir, fileName);
    switch (fileName) {
      case 'index.md':
        validateIndex(filePath);
        break;
      case 'examples.md':
        validateExamples(filePath);
        break;
      case 'api.md':
        validateApi(filePath);
        break;
      case 'anatomy.md':
        validateAnatomy(filePath);
        break;
      case 'styling.md':
        validateStyling(filePath);
        break;
      case 'accessibility.md':
        validateAccessibility(filePath);
        break;
      case 'comparison.md':
        validateComparison(filePath);
        break;
      case 'patterns.md':
        validatePatterns(filePath);
        break;
      case 'troubleshooting.md':
        validateTroubleshooting(filePath);
        break;
      default:
        break;
    }
  }
}

function main(): void {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error('docs/components directory not found.');
    process.exit(1);
  }

  for (const componentDir of listComponentDirs()) {
    validateComponentDir(componentDir);
  }

  for (const markdownFile of [...listMarkdownFiles(DOCS_DIR), ...EXTRA_MARKDOWN_FILES]) {
    validateMarkdownLinks(markdownFile);
  }

  for (const translationDir of TRANSLATION_DIRS) {
    for (const markdownFile of listMarkdownFiles(translationDir)) {
      const englishFile = path.join(DOCS_DIR, path.relative(translationDir, markdownFile));

      assert(
        fs.existsSync(englishFile),
        `${rel(markdownFile)}: a translation needs the English page at the same path in docs/en.`,
      );
      validateMarkdownLinks(markdownFile);

      if (fs.existsSync(englishFile)) {
        validateHeadingStructure(markdownFile, englishFile);
      }
    }
  }

  if (warnings.length > 0) {
    console.warn('Documentation warnings:\n');
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
    console.warn('');
  }

  if (errors.length > 0) {
    console.error('Documentation validation failed:\n');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('Documentation validation passed.');
}

main();
