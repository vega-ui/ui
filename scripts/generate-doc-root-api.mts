#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const UI_DIR = path.join(ROOT, 'packages', 'ui');
const UI_SRC_DIR = path.join(UI_DIR, 'src');
const PACKAGES_DIR = path.join(ROOT, 'packages');
const ROOT_START = '<!-- AUTO-GENERATED:ROOT_API:start -->';
const ROOT_END = '<!-- AUTO-GENERATED:ROOT_API:end -->';
const CHECK = process.argv.includes('--check');
const STRICT_TRANSLATIONS = process.argv.includes('--strict-translations');

interface Locale {
  dir: string;
  header: string[];
  yes: string;
  no: string;
  rootHeadings: string[];
  partsHeadings: string[];
  accepts: (items: string[]) => string;
  allAttributes: (tag: string) => string;
  htmlAttributes: string;
  translations?: string;
}

const LOCALES: Locale[] = [
  {
    dir: 'en',
    header: ['Prop', 'Type', 'Default', 'Required', 'Description'],
    yes: 'Yes',
    no: 'No',
    rootHeadings: ['Root API', 'Root Props'],
    partsHeadings: ['Child Parts API', 'Child Parts'],
    accepts: (items) => `Also accepts ${items.join(' and ')}.`,
    allAttributes: (tag) => `all \`${tag}\` attributes`,
    htmlAttributes: 'all HTML attributes',
  },
  {
    dir: 'ru',
    header: ['Проп', 'Тип', 'По умолчанию', 'Обязательный', 'Описание'],
    yes: 'Да',
    no: 'Нет',
    rootHeadings: ['API корня', 'Пропсы корня'],
    partsHeadings: ['API дочерних частей', 'Дочерние части'],
    accepts: (items) => `Также принимает ${items.join(' и ')}.`,
    allAttributes: (tag) => `все атрибуты \`${tag}\``,
    htmlAttributes: 'все HTML-атрибуты',
    translations: path.join(ROOT, 'docs', 'ru', 'api-descriptions.json'),
  },
];

const ELEMENT_TAGS: Record<string, string> = {
  Anchor: '<a>',
  Button: '<button>',
  Dialog: '<dialog>',
  Div: '<div>',
  FieldSet: '<fieldset>',
  Form: '<form>',
  Heading: '<h1>–<h6>',
  Image: '<img>',
  Input: '<input>',
  Label: '<label>',
  Legend: '<legend>',
  LI: '<li>',
  Meter: '<meter>',
  OList: '<ol>',
  Option: '<option>',
  Paragraph: '<p>',
  Pre: '<pre>',
  Progress: '<progress>',
  Select: '<select>',
  Span: '<span>',
  Table: '<table>',
  TableCaption: '<caption>',
  TableCell: '<td>',
  TableRow: '<tr>',
  TableSection: '<tbody>',
  TextArea: '<textarea>',
  UList: '<ul>',
};

interface PropRow {
  prop: string;
  type: string;
  defaultValue: string;
  required: boolean;
  description: string;
}

interface Translation {
  en: string;
  ru: string;
}

interface ComponentModel {
  name: string;
  rows: PropRow[];
  element: string | null;
  inheritsHtml: boolean;
  inheritsRef: boolean;
}

const missingDocs: string[] = [];
const translationFiles = new Map<string, Record<string, Translation>>();
const usedTranslations = new Set<string>();
const missingTranslations = new Set<string>();
const staleTranslations = new Set<string>();

main();

function main(): void {
  const docsDirs = fs
    .readdirSync(path.join(ROOT, 'docs', 'en', 'components'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .map((entry) => entry.name)
    .sort();

  const indexFiles = new Map<string, string>();
  for (const docsDir of docsDirs) {
    const indexFile = path.join(UI_SRC_DIR, toSourceComponentName(docsDir), 'index.ts');
    if (fs.existsSync(indexFile)) {
      indexFiles.set(docsDir, indexFile);
    }
  }

  const program = createProgram([...indexFiles.values()]);
  const checker = program.getTypeChecker();
  const stale: string[] = [];
  let updated = 0;

  for (const [docsDir, indexFile] of indexFiles) {
    const rootName = toSourceComponentName(docsDir);
    const models = getFolderModels(program, checker, indexFile);
    const root = models.find((model) => model.name === rootName);
    const parts = models.filter((model) => model.name !== rootName);

    for (const locale of LOCALES) {
      const apiFile = path.join(ROOT, 'docs', locale.dir, 'components', docsDir, 'api.md');
      if (!fs.existsSync(apiFile)) {
        continue;
      }

      const current = fs.readFileSync(apiFile, 'utf8');
      let next = current;
      if (root) {
        next = replaceRootBlock(next, buildBlock(ROOT_START, ROOT_END, root, locale), locale);
      }
      for (const part of parts) {
        next = replacePartBlock(next, part, locale);
      }

      if (next === current) {
        continue;
      }

      if (CHECK) {
        stale.push(path.relative(ROOT, apiFile));
        continue;
      }

      fs.writeFileSync(apiFile, next, 'utf8');
      updated += 1;
    }
  }

  if (CHECK) {
    const translationsFailed = reportTranslations() && STRICT_TRANSLATIONS;
    if (stale.length > 0) {
      console.error(`API tables are stale in ${stale.length} file(s). Run pnpm docs:generate:api.`);
      stale.forEach((file) => console.error(`- ${file}`));
      process.exit(1);
    }
    if (translationsFailed) {
      console.error('Translations are missing or stale (--strict-translations).');
      process.exit(1);
    }
    console.log('API tables are up to date.');
    return;
  }

  console.log(`API tables generated for ${updated} file(s).`);
  reportTranslations();
  if (missingDocs.length > 0) {
    console.log(`Props without JSDoc (${missingDocs.length}):`);
    [...new Set(missingDocs)].forEach((entry) => console.log(`- ${entry}`));
  }
}

function toSourceComponentName(docsDir: string): string {
  return docsDir
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function createProgram(rootNames: string[]): ts.Program {
  const configFile = path.join(UI_DIR, 'tsconfig.app.json');
  const config = ts.readConfigFile(configFile, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, UI_DIR, undefined, configFile);

  return ts.createProgram(rootNames, parsed.options);
}

function getFolderModels(program: ts.Program, checker: ts.TypeChecker, indexFile: string): ComponentModel[] {
  const sourceFile = program.getSourceFile(indexFile);
  const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    return [];
  }

  const models: ComponentModel[] = [];

  for (const exported of checker.getExportsOfModule(moduleSymbol)) {
    const name = exported.getName();
    if (!/^[A-Z]/.test(name) || name.endsWith('Context') || name.endsWith('Provider')) {
      continue;
    }

    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    if (!(symbol.flags & (ts.SymbolFlags.Variable | ts.SymbolFlags.Function))) {
      continue;
    }

    const model = getComponentModel(checker, name, symbol);
    if (model) {
      models.push(model);
    }
  }

  return models;
}

function getComponentModel(checker: ts.TypeChecker, name: string, symbol: ts.Symbol): ComponentModel | null {
  const declaration = symbol.valueDeclaration;
  if (!declaration) {
    return null;
  }

  const [signature] = checker.getTypeOfSymbolAtLocation(symbol, declaration).getCallSignatures();
  const [propsParam] = signature?.getParameters() ?? [];
  if (!propsParam) {
    return null;
  }

  const propsType = checker.getTypeOfSymbolAtLocation(propsParam, declaration);
  const defaults = collectDefaults(declaration);
  const rows: PropRow[] = [];
  let element: string | null = null;
  let inheritsHtml = false;
  let inheritsRef = false;

  for (const prop of getProperties(propsType)) {
    const propName = prop.getName();
    const declarations = prop.getDeclarations() ?? [];
    const own = declarations.find(isLibraryDeclaration);

    if (!own) {
      if (propName === 'key') {
        continue;
      }
      if (propName === 'ref') {
        inheritsRef = true;
        continue;
      }
      inheritsHtml = true;
      element ??= getElementTag(checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, declaration)));
      continue;
    }

    const description = formatDescription(ts.displayPartsToString(prop.getDocumentationComment(checker)));
    if (!description) {
      missingDocs.push(`${name}.${propName}`);
    }

    rows.push({
      prop: propName,
      type: getTypeText(checker, prop, own, declaration),
      defaultValue: defaults.get(propName) ?? getDefaultTag(checker, prop),
      required: !(prop.flags & ts.SymbolFlags.Optional),
      description,
    });
  }

  if (rows.length === 0 && !inheritsHtml && !inheritsRef) {
    return null;
  }

  return { name, rows, element, inheritsHtml, inheritsRef };
}

function getProperties(type: ts.Type): ts.Symbol[] {
  const types = type.isUnion() ? type.types : [type];
  const seen = new Map<string, ts.Symbol>();

  for (const member of types) {
    for (const prop of member.getProperties()) {
      if (!seen.has(prop.getName())) {
        seen.set(prop.getName(), prop);
      }
    }
  }

  return [...seen.values()];
}

function isLibraryDeclaration(declaration: ts.Declaration): boolean {
  const fileName = declaration.getSourceFile().fileName;

  return fileName.startsWith(PACKAGES_DIR) && !fileName.includes('/node_modules/');
}

function getElementTag(typeText: string): string | null {
  if (/\bSVGSVGElement\b/.test(typeText)) {
    return '<svg>';
  }

  const match = typeText.match(/\bHTML(\w*)Element\b/);
  if (!match) {
    return null;
  }

  return ELEMENT_TAGS[match[1]] ?? null;
}

function getTypeText(checker: ts.TypeChecker, prop: ts.Symbol, own: ts.Declaration, location: ts.Node): string {
  if (ts.isMethodSignature(own)) {
    const params = own.parameters.map((parameter) => parameter.getText()).join(', ');
    return cleanText(`(${params}) => ${own.type?.getText() ?? 'void'}`);
  }

  const typeNode = (ts.isPropertySignature(own) || ts.isPropertyDeclaration(own)) ? own.type : undefined;
  if (typeNode && !referencesOuterTypeParameters(own, typeNode)) {
    return cleanText(typeNode.getText());
  }

  const typeText = checker.typeToString(
    checker.getTypeOfSymbolAtLocation(prop, location),
    undefined,
    ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinitionsOutsideCurrentScope,
  );
  if (!(prop.flags & ts.SymbolFlags.Optional)) {
    return typeText;
  }

  const withoutUndefined = typeText.replace(/ \| undefined$/, '');
  const unwrapped = withoutUndefined.match(/^\((.*)\)$/)?.[1];

  return unwrapped && withoutUndefined !== typeText ? unwrapped : withoutUndefined;
}

function referencesOuterTypeParameters(declaration: ts.Declaration, typeNode: ts.TypeNode): boolean {
  const parent = declaration.parent;
  const typeParameters = (ts.isInterfaceDeclaration(parent) || ts.isTypeLiteralNode(parent))
    ? (ts.isInterfaceDeclaration(parent) ? parent.typeParameters : getTypeAliasParameters(parent))
    : undefined;
  if (!typeParameters || typeParameters.length === 0) {
    return false;
  }

  const names = typeParameters.map((parameter) => parameter.name.text);
  const text = typeNode.getText();

  return names.some((name) => new RegExp(`\\b${name}\\b`).test(text));
}

function getTypeAliasParameters(node: ts.Node): ts.NodeArray<ts.TypeParameterDeclaration> | undefined {
  let current: ts.Node | undefined = node.parent;
  while (current && !ts.isTypeAliasDeclaration(current) && !ts.isSourceFile(current)) {
    current = current.parent;
  }

  return current && ts.isTypeAliasDeclaration(current) ? current.typeParameters : undefined;
}

function getDefaultTag(checker: ts.TypeChecker, prop: ts.Symbol): string {
  const tag = prop.getJsDocTags(checker).find((entry) => entry.name === 'default');
  if (!tag?.text) {
    return '';
  }

  return cleanText(ts.displayPartsToString(tag.text));
}

function collectDefaults(declaration: ts.Declaration): Map<string, string> {
  const defaults = new Map<string, string>();
  const fn = findImplementation(declaration);
  const [firstParam] = fn?.parameters ?? [];
  if (!fn || !firstParam) {
    return defaults;
  }

  if (ts.isObjectBindingPattern(firstParam.name)) {
    addBindingDefaults(firstParam.name, defaults);
    return defaults;
  }

  if (!ts.isIdentifier(firstParam.name) || !fn.body) {
    return defaults;
  }

  const paramName = firstParam.name.text;
  const visit = (node: ts.Node): void => {
    if (
      ts.isVariableDeclaration(node)
      && ts.isObjectBindingPattern(node.name)
      && node.initializer
      && ts.isIdentifier(node.initializer)
      && node.initializer.text === paramName
    ) {
      addBindingDefaults(node.name, defaults);
    }
    ts.forEachChild(node, visit);
  };
  visit(fn.body);

  return defaults;
}

function findImplementation(declaration: ts.Node): ts.SignatureDeclaration | null {
  if (ts.isFunctionDeclaration(declaration) || ts.isArrowFunction(declaration) || ts.isFunctionExpression(declaration)) {
    return declaration;
  }

  if (ts.isVariableDeclaration(declaration)) {
    return declaration.initializer ? findImplementation(declaration.initializer) : null;
  }

  if (ts.isCallExpression(declaration)) {
    const fn = declaration.arguments.find((argument) => findImplementation(argument));
    return fn ? findImplementation(fn) : null;
  }

  if (ts.isAsExpression(declaration) || ts.isParenthesizedExpression(declaration) || ts.isSatisfiesExpression(declaration)) {
    return findImplementation(declaration.expression);
  }

  return null;
}

function addBindingDefaults(pattern: ts.ObjectBindingPattern, defaults: Map<string, string>): void {
  for (const element of pattern.elements) {
    if (!element.initializer) {
      continue;
    }

    const key = element.propertyName ?? element.name;
    if (ts.isIdentifier(key) || ts.isStringLiteral(key)) {
      const value = ts.isAsExpression(element.initializer) ? element.initializer.expression : element.initializer;
      defaults.set(key.text, cleanText(value.getText()));
    }
  }
}

function formatDescription(comment: string): string {
  let text = '';
  let previousItem = false;

  for (const rawLine of comment.split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    const item = line.match(/^[-–•]\s+(.*)$/)?.[1];
    if (item !== undefined) {
      text += previousItem && !/[.:;!?]$/.test(text) ? `; ${item}` : ` ${item}`;
      previousItem = true;
      continue;
    }

    text += previousItem && !/[.:;!?]$/.test(text) ? `. ${line}` : ` ${line}`;
    previousItem = false;
  }

  return codeHtmlTags(cleanText(text));
}

function codeHtmlTags(value: string): string {
  return value
    .split('`')
    .map((segment, index) => (index % 2 === 0 ? segment.replace(/<\/?[a-zA-Z][^<>]*>/g, (tag) => `\`${tag}\``) : segment))
    .join('`');
}

function cleanText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, '\\|');
}

function inlineCode(value: string): string {
  const fence = value.includes('`') ? '``' : '`';
  return `${fence}${escapeCell(value)}${fence}`;
}

function buildBlock(start: string, end: string, model: ComponentModel, locale: Locale): string {
  const lines = [start];

  if (model.rows.length > 0) {
    lines.push(`| ${locale.header.join(' | ')} |`, `|${' --- |'.repeat(locale.header.length)}`);
    for (const row of model.rows) {
      const cells = [
        inlineCode(row.prop),
        inlineCode(row.type),
        row.defaultValue ? inlineCode(row.defaultValue) : '—',
        row.required ? locale.yes : locale.no,
        row.description ? escapeCell(translate(model.name, row, locale)) : '—',
      ];
      lines.push(`| ${cells.join(' | ')} |`);
    }
  }

  const accepts = getAcceptsLine(model, locale);
  if (accepts) {
    if (model.rows.length > 0) {
      lines.push('');
    }
    lines.push(accepts);
  }

  lines.push(end);

  return lines.join('\n');
}

function translate(component: string, row: PropRow, locale: Locale): string {
  if (!locale.translations) {
    return row.description;
  }

  const key = `${component}.${row.prop}`;
  const entry = loadTranslations(locale.translations)[key];
  usedTranslations.add(key);
  if (!entry) {
    missingTranslations.add(key);
    return row.description;
  }
  if (entry.en !== row.description) {
    staleTranslations.add(key);
    return row.description;
  }

  return entry.ru;
}

function loadTranslations(file: string): Record<string, Translation> {
  const cached = translationFiles.get(file);
  if (cached) {
    return cached;
  }

  const entries = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  translationFiles.set(file, entries);

  return entries;
}

function reportTranslations(): boolean {
  const unused = [...translationFiles.values()]
    .flatMap((entries) => Object.keys(entries))
    .filter((key) => !usedTranslations.has(key));
  const groups: [string, string[]][] = [
    ['Missing translations', [...missingTranslations]],
    ['Stale translations (English JSDoc changed)', [...staleTranslations]],
    ['Unused translations', unused],
  ];

  for (const [title, keys] of groups) {
    if (keys.length === 0) {
      continue;
    }
    console.warn(`${title} (${keys.length}):`);
    keys.sort().forEach((key) => console.warn(`- ${key}`));
  }

  return missingTranslations.size > 0 || staleTranslations.size > 0;
}

function getAcceptsLine(model: ComponentModel, locale: Locale): string {
  const items: string[] = [];
  if (model.inheritsRef) {
    items.push('`ref`');
  }
  if (model.inheritsHtml) {
    items.push(model.element ? locale.allAttributes(model.element) : locale.htmlAttributes);
  }

  return items.length > 0 ? locale.accepts(items) : '';
}

function replaceRootBlock(content: string, block: string, locale: Locale): string {
  if (content.includes(ROOT_START) && content.includes(ROOT_END)) {
    return replaceBetween(content, ROOT_START, ROOT_END, block);
  }

  const heading = findHeading(content, locale.rootHeadings);
  if (!heading) {
    return content;
  }

  const sectionEnd = findNextHeading(content, heading.end, 2);
  return insertIntoSection(content, heading.end, sectionEnd, block);
}

function replacePartBlock(content: string, model: ComponentModel, locale: Locale): string {
  const start = `<!-- AUTO-GENERATED:PART_API:${model.name}:start -->`;
  const end = `<!-- AUTO-GENERATED:PART_API:${model.name}:end -->`;
  const block = buildBlock(start, end, model, locale);

  if (content.includes(start) && content.includes(end)) {
    return replaceBetween(content, start, end, block);
  }

  const partHeading = content.match(new RegExp(`^(#{2,4}) \`${model.name}\`\\s*$`, 'm'));
  if (partHeading && partHeading.index !== undefined) {
    const headingEnd = partHeading.index + partHeading[0].length;
    const sectionEnd = findNextHeading(content, headingEnd, partHeading[1].length);
    return insertIntoSection(content, headingEnd, sectionEnd, block);
  }

  const parts = findHeading(content, locale.partsHeadings);
  if (!parts) {
    return content;
  }

  const sectionEnd = findPartsSectionEnd(content, parts.end);
  const section = content.slice(parts.end, sectionEnd);
  const level = /^## `/m.test(section) ? '##' : '###';
  const before = content.slice(0, sectionEnd).replace(/\n+$/, '');

  return `${before}\n\n${level} \`${model.name}\`\n\n${block}\n\n${content.slice(sectionEnd).replace(/^\n+/, '')}`;
}

function replaceBetween(content: string, start: string, end: string, block: string): string {
  const from = content.indexOf(start);
  const to = content.indexOf(end, from) + end.length;

  return `${content.slice(0, from)}${block}${content.slice(to)}`;
}

function findHeading(content: string, names: string[]): { end: number } | null {
  for (const name of names) {
    const match = content.match(new RegExp(`^## ${escapeRegExp(name)}\\s*$`, 'm'));
    if (match && match.index !== undefined) {
      return { end: match.index + match[0].length };
    }
  }

  return null;
}

function findNextHeading(content: string, from: number, level: number): number {
  const pattern = new RegExp(`\\n#{1,${level}} `, 'g');
  pattern.lastIndex = from;
  const fences = /\n```/g;
  let inFence = false;
  let cursor = from;

  for (;;) {
    const heading = pattern.exec(content);
    if (!heading) {
      return content.length;
    }

    fences.lastIndex = cursor;
    let fence = fences.exec(content);
    while (fence && fence.index < heading.index) {
      inFence = !inFence;
      fence = fences.exec(content);
    }
    cursor = heading.index;

    if (!inFence) {
      return heading.index + 1;
    }
  }
}

function findPartsSectionEnd(content: string, from: number): number {
  let cursor = from;

  for (;;) {
    const next = findNextHeading(content, cursor, 2);
    if (next >= content.length || !content.startsWith('## `', next)) {
      return next;
    }
    cursor = next;
  }
}

function insertIntoSection(content: string, headingEnd: number, sectionEnd: number, block: string): string {
  const section = content.slice(headingEnd, sectionEnd);
  const table = section.match(/\n\| (Prop|Проп) \|[^\n]*\n(\|[^\n]*\n?)*/);

  if (table && table.index !== undefined) {
    const from = headingEnd + table.index + 1;
    const to = headingEnd + table.index + table[0].length;
    const after = content.slice(to).replace(/^\n*/, '');
    return `${content.slice(0, from)}${block}\n\n${after}`;
  }

  const intro = section.match(/^\n+(?![-|<`#])[^\n]+(\n(?![-|<`#\n])[^\n]+)*/);
  const insertAt = headingEnd + (intro ? intro[0].length : 0);
  const before = content.slice(0, insertAt).replace(/\n+$/, '');
  const after = content.slice(insertAt).replace(/^\n+/, '');

  return `${before}\n\n${block}\n\n${after}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
