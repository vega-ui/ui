#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'docs');
const TMP_DIR = path.join(ROOT, 'packages', 'ui', '.doc-example-check');
const TS_CONFIG_PATH = path.join(ROOT, 'tsconfig.json');
const UI_ENTRY = path.join(ROOT, 'packages', 'ui', 'src', 'index.ts');
const ICONS_ENTRY = path.join(ROOT, 'packages', 'icons', 'src', 'index.ts');
const EXTRA_ROOTS = [
  path.join(ROOT, 'packages', 'ui', 'global.d.ts'),
  path.join(ROOT, 'packages', 'ui', 'src', 'vite-env.d.ts'),
  path.join(ROOT, 'packages', 'icons', 'global.d.ts'),
  path.join(ROOT, 'packages', 'icons', 'src', 'vite-env.d.ts'),
];
const CODE_LANGUAGES = new Set(['ts', 'tsx', 'typescript', 'jsx']);
const REACT_VALUE_EXPORTS = new Set([
  'Children',
  'Fragment',
  'Suspense',
  'cloneElement',
  'createContext',
  'forwardRef',
  'startTransition',
  'useContext',
  'useDeferredValue',
  'useEffect',
  'useId',
  'useImperativeHandle',
  'useLayoutEffect',
  'useMemo',
  'useReducer',
  'useRef',
  'useState',
  'useTransition',
]);
const JSX_COMPONENT_NAME_RE = /^[A-Z][A-Za-z0-9_]*$/;
const TEMPLATE_DIR = path.join(ROOT, 'docs', 'components', '_templates');
const WARNED_UNKNOWN_COMPONENTS = new Set<string>();

interface Snippet {
  id: string;
  mdFilePath: string;
  language: string;
  code: string;
  startLine: number;
  declaredNames: Set<string>;
  jsxComponentNames: Set<string>;
}

interface SnippetPrelude {
  lines: string[];
  lineCount: number;
}

interface GeneratedSnippetFile {
  snippet: Snippet;
  filePath: string;
  prelude: SnippetPrelude;
}

function getSnippetKey(snippet: Snippet): string {
  return `${path.normalize(snippet.mdFilePath)}#${snippet.id}`;
}

const parsedConfig = ts.parseJsonConfigFileContent(
  ts.readConfigFile(TS_CONFIG_PATH, ts.sys.readFile).config,
  ts.sys,
  ROOT,
);
const compilerOptions: ts.CompilerOptions = {
  ...parsedConfig.options,
  noEmit: true,
  pretty: false,
  skipLibCheck: true,
  target: parsedConfig.options.target ?? ts.ScriptTarget.ESNext,
  module: parsedConfig.options.module ?? ts.ModuleKind.ESNext,
  jsx: parsedConfig.options.jsx ?? ts.JsxEmit.ReactJSX,
};

const uiExports = collectValueExports(UI_ENTRY, compilerOptions);
const uiTypeExports = collectTypeExports(UI_ENTRY, compilerOptions);
const iconExports = collectValueExports(ICONS_ENTRY, compilerOptions);
const iconTypeExports = collectTypeExports(ICONS_ENTRY, compilerOptions);

const snippets = listMarkdownFiles(DOCS_DIR).flatMap(extractSnippetsFromMarkdown);

if (snippets.length === 0) {
  console.log('No TypeScript examples found.');
  process.exit(0);
}

fs.rmSync(TMP_DIR, { recursive: true, force: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

const snippetStubs = new Map<string, Set<string>>();
const snippetUnknownComponents = new Map<string, Set<string>>();

for (const snippet of snippets) {
  const snippetKey = getSnippetKey(snippet);
  snippetStubs.set(snippetKey, new Set<string>());
  snippetUnknownComponents.set(snippetKey, new Set<string>());
}

let generatedFiles = writeGeneratedFiles();
let diagnostics = getProgramDiagnostics(generatedFiles);

for (let iteration = 0; iteration < 6; iteration += 1) {
  let addedStub = false;

  for (const diagnostic of diagnostics) {
    if (diagnostic.code !== 2304 || !diagnostic.file) {
      continue;
    }

    const generated = generatedFiles.find((entry) => entry.filePath === diagnostic.file?.fileName);
    if (!generated) {
      continue;
    }

    const match = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n').match(/Cannot find name '([^']+)'/);
    if (!match) {
      continue;
    }

    const name = match[1];
    const snippetKey = getSnippetKey(generated.snippet);
    const stubs = snippetStubs.get(snippetKey);
    if (!stubs) {
      continue;
    }

    if (generated.snippet.jsxComponentNames.has(name)) {
      snippetUnknownComponents.get(snippetKey)?.add(name);
      continue;
    }

    if (
      uiExports.has(name) ||
      uiTypeExports.has(name) ||
      iconExports.has(name) ||
      iconTypeExports.has(name)
    ) {
      if (!stubs.has(name)) {
        stubs.add(name);
        addedStub = true;
      }
      continue;
    }

    if (!stubs.has(name)) {
      stubs.add(name);
      addedStub = true;
    }
  }

  if (!addedStub) {
    break;
  }

  generatedFiles = writeGeneratedFiles();
  diagnostics = getProgramDiagnostics(generatedFiles);
}

const finalErrors: string[] = [];

for (const generated of generatedFiles) {
  const snippet = generated.snippet;
  const unknownComponents = Array.from(snippetUnknownComponents.get(getSnippetKey(snippet)) ?? []);

  for (const componentName of unknownComponents) {
    const warningKey = `${rel(snippet.mdFilePath)}#${snippet.id}:${componentName}`;
    if (WARNED_UNKNOWN_COMPONENTS.has(warningKey)) {
      continue;
    }

    WARNED_UNKNOWN_COMPONENTS.add(warningKey);
    console.warn(
      `Warning: ${rel(snippet.mdFilePath)} example ${snippet.id} references unknown component "${componentName}". It was stubbed as an external component.`,
    );
  }
}

for (const diagnostic of diagnostics) {
  if (!diagnostic.file) {
    finalErrors.push(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    continue;
  }

  const generated = generatedFiles.find((entry) => entry.filePath === diagnostic.file?.fileName);
  if (!generated) {
    continue;
  }

  const snippet = generated.snippet;
  const start = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
  const snippetLine = Math.max(1, start.line + 1 - generated.prelude.lineCount);
  const originalLine = snippet.startLine + snippetLine - 1;
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

  if (diagnostic.code === 2304) {
    const match = message.match(/Cannot find name '([^']+)'/);
    if (match) {
      const name = match[1];
      const stubs = snippetStubs.get(getSnippetKey(snippet)) ?? new Set<string>();

      if (stubs.has(name)) {
        continue;
      }

      if (snippetUnknownComponents.get(getSnippetKey(snippet))?.has(name)) {
        continue;
      }
    }
  }

  finalErrors.push(
    `${rel(snippet.mdFilePath)}:${originalLine}: example ${snippet.id} failed TS validation: ${message}`,
  );
}

fs.rmSync(TMP_DIR, { recursive: true, force: true });

if (finalErrors.length > 0) {
  console.error('Documentation example validation failed.\n');
  for (const error of finalErrors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Documentation example validation passed for ${snippets.length} snippet(s).`);

function writeGeneratedFiles(): GeneratedSnippetFile[] {
  return snippets.map((snippet, index) => {
    const filePath = path.join(TMP_DIR, `${String(index + 1).padStart(4, '0')}-${slugify(rel(snippet.mdFilePath))}.tsx`);
    const prelude = buildPrelude(snippet, snippetStubs.get(getSnippetKey(snippet)) ?? new Set<string>());
    const source = `${prelude.lines.join('\n')}\n${snippet.code}\n\nexport {};\n`;

    fs.writeFileSync(filePath, source, 'utf8');

    return { snippet, filePath, prelude };
  });
}

function buildPrelude(snippet: Snippet, appStubs: Set<string>): SnippetPrelude {
  const lines = [`import * as React from 'react';`];
  const uiImportPath = toImportPath(path.relative(TMP_DIR, UI_ENTRY));
  const iconsImportPath = toImportPath(path.relative(TMP_DIR, ICONS_ENTRY));

  for (const reactName of Array.from(REACT_VALUE_EXPORTS).sort()) {
    if (!snippet.declaredNames.has(reactName)) {
      lines.push(`declare const ${reactName}: typeof import('react').${reactName};`);
    }
  }

  const declaredUiNames = new Set<string>();
  const declaredUiTypeNames = new Set<string>();
  const declaredIconNames = new Set<string>();
  const declaredIconTypeNames = new Set<string>();

  for (const name of Array.from(snippet.jsxComponentNames)) {
    if (snippet.declaredNames.has(name)) {
      continue;
    }

    if (uiExports.has(name)) {
      declaredUiNames.add(name);
      continue;
    }

    if (uiTypeExports.has(name)) {
      declaredUiTypeNames.add(name);
      continue;
    }

    if (iconExports.has(name)) {
      declaredIconNames.add(name);
      continue;
    }

    if (iconTypeExports.has(name)) {
      declaredIconTypeNames.add(name);
      continue;
    }

    lines.push(`declare const ${name}: React.ComponentType<any>;`);
  }

  for (const stub of Array.from(appStubs)) {
    if (snippet.declaredNames.has(stub)) {
      continue;
    }

    if (uiExports.has(stub)) {
      declaredUiNames.add(stub);
      continue;
    }

    if (uiTypeExports.has(stub)) {
      declaredUiTypeNames.add(stub);
      continue;
    }

    if (iconExports.has(stub)) {
      declaredIconNames.add(stub);
      continue;
    }

    if (iconTypeExports.has(stub)) {
      declaredIconTypeNames.add(stub);
      continue;
    }

    lines.push(`declare const ${stub}: any;`);
  }

  for (const name of Array.from(declaredUiNames).sort()) {
    lines.push(`declare const ${name}: typeof import('${uiImportPath}').${name};`);
  }

  for (const name of Array.from(declaredUiTypeNames).sort()) {
    lines.push(`type ${name} = import('${uiImportPath}').${name};`);
  }

  for (const name of Array.from(declaredIconNames).sort()) {
    lines.push(`declare const ${name}: typeof import('${iconsImportPath}').${name};`);
  }

  for (const name of Array.from(declaredIconTypeNames).sort()) {
    lines.push(`type ${name} = import('${iconsImportPath}').${name};`);
  }

  return { lines, lineCount: lines.length };
}

function getProgramDiagnostics(generatedFiles: GeneratedSnippetFile[]): readonly ts.Diagnostic[] {
  const rootNames = [
    ...generatedFiles.map((entry) => entry.filePath),
    ...EXTRA_ROOTS.filter((filePath) => fs.existsSync(filePath)),
  ];
  const program = ts.createProgram(rootNames, compilerOptions);

  return ts.getPreEmitDiagnostics(program).filter((diagnostic) => {
    const fileName = diagnostic.file?.fileName ?? '';
    return !fileName.includes(`${path.sep}node_modules${path.sep}`);
  });
}

function extractSnippetsFromMarkdown(filePath: string): Snippet[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const snippets: Snippet[] = [];
  const codeFenceRe = /```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = codeFenceRe.exec(content)) !== null) {
    const language = (match[1] ?? '').trim().toLowerCase();
    if (!CODE_LANGUAGES.has(language)) {
      continue;
    }

    index += 1;
    const before = content.slice(0, match.index);
    const startLine = before.split('\n').length + 1;
    const code = match[2].trim();
    const sourceFile = ts.createSourceFile(
      `${filePath}#example-${index}.tsx`,
      code,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const declaredNames = collectDeclaredNames(sourceFile);
    const jsxComponentNames = collectJsxComponentNames(sourceFile, declaredNames);

    snippets.push({
      id: `example-${index}`,
      mdFilePath: filePath,
      language,
      code,
      startLine,
      declaredNames,
      jsxComponentNames,
    });
  }

  return snippets;
}

function collectDeclaredNames(sourceFile: ts.SourceFile): Set<string> {
  const names = new Set<string>();

  const addBindingName = (name: ts.BindingName): void => {
    if (ts.isIdentifier(name)) {
      names.add(name.text);
      return;
    }

    for (const element of name.elements) {
      if (ts.isOmittedExpression(element)) {
        continue;
      }

      addBindingName(element.name);
    }
  };

  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node)) {
      addBindingName(node.name);
    } else if (
      ts.isFunctionDeclaration(node) ||
      ts.isClassDeclaration(node) ||
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isEnumDeclaration(node)
    ) {
      if (node.name) {
        names.add(node.name.text);
      }
    } else if (ts.isParameter(node)) {
      addBindingName(node.name);
    } else if (ts.isImportClause(node)) {
      if (node.name) {
        names.add(node.name.text);
      }
      if (node.namedBindings) {
        if (ts.isNamespaceImport(node.namedBindings)) {
          names.add(node.namedBindings.name.text);
        } else {
          for (const element of node.namedBindings.elements) {
            if (element.name) {
              names.add(element.name.text);
            }
          }
        }
      }
    } else if (ts.isCatchClause(node) && node.variableDeclaration) {
      addBindingName(node.variableDeclaration.name);
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return names;
}

function collectJsxComponentNames(sourceFile: ts.SourceFile, declaredNames: Set<string>): Set<string> {
  const names = new Set<string>();

  const visit = (node: ts.Node): void => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tagName = node.tagName;

      if (ts.isIdentifier(tagName) && JSX_COMPONENT_NAME_RE.test(tagName.text) && !declaredNames.has(tagName.text)) {
        names.add(tagName.text);
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return names;
}

function collectValueExports(
  entryFilePath: string,
  options: ts.CompilerOptions,
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
          if (!element.isTypeOnly) {
            exports.add(element.name.text);
          }
        }
      } else if (specifier) {
        const resolved = resolveModuleFile(specifier, normalized, options);
        if (resolved) {
          for (const name of Array.from(collectValueExports(resolved, options, seen, cache))) {
            exports.add(name);
          }
        }
      }

      continue;
    }

    if (
      (ts.isVariableStatement(statement) || ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement)) &&
      hasExportModifier(statement)
    ) {
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          collectBindingExports(declaration.name, exports);
        }
      } else if (statement.name) {
        exports.add(statement.name.text);
      }
    }
  }

  cache.set(normalized, exports);
  return exports;
}

function collectTypeExports(
  entryFilePath: string,
  options: ts.CompilerOptions,
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
          if (element.isTypeOnly) {
            exports.add(element.name.text);
          }
        }
      } else if (specifier) {
        const resolved = resolveModuleFile(specifier, normalized, options);
        if (resolved) {
          for (const name of Array.from(collectTypeExports(resolved, options, seen, cache))) {
            exports.add(name);
          }
        }
      }

      continue;
    }

    if (
      (ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      hasExportModifier(statement) &&
      statement.name
    ) {
      exports.add(statement.name.text);
    }
  }

  cache.set(normalized, exports);
  return exports;
}

function collectBindingExports(name: ts.BindingName, exports: Set<string>): void {
  if (ts.isIdentifier(name)) {
    exports.add(name.text);
    return;
  }

  for (const element of name.elements) {
    if (ts.isOmittedExpression(element)) {
      continue;
    }

    collectBindingExports(element.name, exports);
  }
}

function hasExportModifier(node: ts.Node): boolean {
  const modifiers = (node as ts.Node & { modifiers?: ts.NodeArray<ts.ModifierLike> }).modifiers;
  return Boolean(modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
}

function resolveModuleFile(specifier: string, containingFile: string, options: ts.CompilerOptions): string | null {
  const resolved = ts.resolveModuleName(specifier, containingFile, options, ts.sys).resolvedModule;
  if (resolved?.resolvedFileName && !resolved.resolvedFileName.endsWith('.css')) {
    return resolved.resolvedFileName;
  }

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

function listMarkdownFiles(dirPath: string): string[] {
  const result: string[] = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (path.normalize(entryPath).startsWith(path.normalize(TEMPLATE_DIR))) {
        continue;
      }

      result.push(...listMarkdownFiles(entryPath));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      continue;
    }

    if (path.normalize(entryPath) === path.normalize(path.join(ROOT, 'docs', 'component-template.md'))) {
      continue;
    }

    result.push(entryPath);
  }

  return result;
}

function slugify(value: string): string {
  return value.replace(/[^\w.-]+/g, '-').replace(/-+/g, '-');
}

function toImportPath(relativePath: string): string {
  const normalized = relativePath.split(path.sep).join('/');
  return normalized.startsWith('.') ? normalized.replace(/\.(ts|tsx|d\.ts)$/, '') : `./${normalized.replace(/\.(ts|tsx|d\.ts)$/, '')}`;
}

function rel(filePath: string): string {
  return path.relative(ROOT, filePath);
}
