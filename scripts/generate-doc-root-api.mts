#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const DOCS_COMPONENTS_DIR = path.join(ROOT, 'docs', 'components');
const UI_SRC_DIR = path.join(ROOT, 'packages', 'ui', 'src');
const START_MARKER = '<!-- AUTO-GENERATED:ROOT_API:start -->';
const END_MARKER = '<!-- AUTO-GENERATED:ROOT_API:end -->';

interface PropDocRow {
  prop: string;
  type: string;
  defaultValue: string;
  required: string;
  notes: string;
}

interface ComponentApiModel {
  componentName: string;
  propsTypeName: string;
  rows: PropDocRow[];
}

main();

function main(): void {
  const componentDirs = fs
    .readdirSync(DOCS_COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .map((entry) => entry.name)
    .sort();

  let updated = 0;

  for (const componentDirName of componentDirs) {
    const componentName = toSourceComponentName(componentDirName);
    const sourceFilePath = path.join(UI_SRC_DIR, componentName, `${componentName}.tsx`);
    const apiFilePath = path.join(DOCS_COMPONENTS_DIR, componentDirName, 'api.md');

    if (!fs.existsSync(sourceFilePath) || !fs.existsSync(apiFilePath)) {
      continue;
    }

    const model = getComponentApiModel(componentName, sourceFilePath);
    if (!model || model.rows.length === 0) {
      continue;
    }

    const current = fs.readFileSync(apiFilePath, 'utf8');
    const next = replaceRootApiTable(current, model);

    if (next !== current) {
      fs.writeFileSync(apiFilePath, next, 'utf8');
      updated += 1;
    }
  }

  console.log(`Root API tables generated for ${updated} file(s).`);
}

function toSourceComponentName(componentDirName: string): string {
  return componentDirName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function getComponentApiModel(componentName: string, sourceFilePath: string): ComponentApiModel | null {
  const sourceText = fs.readFileSync(sourceFilePath, 'utf8');
  const sourceFile = ts.createSourceFile(sourceFilePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const propsTypeName = `${componentName}Props`;
  const propsNode = sourceFile.statements.find(
    (statement): statement is ts.InterfaceDeclaration =>
      ts.isInterfaceDeclaration(statement) && statement.name.text === propsTypeName,
  );

  if (!propsNode) {
    return null;
  }

  const defaults = collectDefaultsForComponent(componentName, sourceFile);
  const rows: PropDocRow[] = [];

  for (const member of propsNode.members) {
    const row = getPropRow(member, sourceFile, defaults);
    if (row) {
      rows.push(row);
    }
  }

  return { componentName, propsTypeName, rows };
}

function collectDefaultsForComponent(componentName: string, sourceFile: ts.SourceFile): Map<string, string> {
  const defaults = new Map<string, string>();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== componentName) {
        continue;
      }

      const initializer = declaration.initializer;
      if (!initializer || (!ts.isArrowFunction(initializer) && !ts.isFunctionExpression(initializer))) {
        continue;
      }

      const [firstParam] = initializer.parameters;
      if (!firstParam || !ts.isObjectBindingPattern(firstParam.name)) {
        continue;
      }

      for (const element of firstParam.name.elements) {
        if (ts.isOmittedExpression(element) || !ts.isIdentifier(element.name) || !element.initializer) {
          continue;
        }

        defaults.set(element.name.text, cleanCodeText(element.initializer.getText(sourceFile)));
      }
    }
  }

  return defaults;
}

function getPropRow(
  member: ts.TypeElement,
  sourceFile: ts.SourceFile,
  defaults: Map<string, string>,
): PropDocRow | null {
  if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
    const prop = member.name.text;
    return {
      prop,
      type: normalizeTypeText(member.type?.getText(sourceFile) ?? 'unknown'),
      defaultValue: escapeCell(defaults.get(prop) ?? '—'),
      required: member.questionToken ? 'No' : 'Yes',
      notes: escapeCell(getDocSummary(member)),
    };
  }

  if (ts.isMethodSignature(member) && member.name && ts.isIdentifier(member.name)) {
    const prop = member.name.text;
    const params = member.parameters
      .map((parameter) => {
        const name = parameter.name.getText(sourceFile);
        const type = parameter.type?.getText(sourceFile) ?? 'unknown';
        return `${name}: ${normalizeTypeText(type)}`;
      })
      .join(', ');
    const returnType = normalizeTypeText(member.type?.getText(sourceFile) ?? 'void');

    return {
      prop,
      type: escapeCell(`(${params}) => ${returnType}`),
      defaultValue: escapeCell(defaults.get(prop) ?? '—'),
      required: member.questionToken ? 'No' : 'Yes',
      notes: escapeCell(getDocSummary(member)),
    };
  }

  return null;
}

function getDocSummary(node: ts.Node): string {
  const text = ts.getJSDocCommentsAndTags(node)
    .map((entry) => entry.getText())
    .join('\n');

  const cleaned = text
    .replace(/^\/\*\*[\s\r\n]*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim())
    .filter((line) => line.length > 0 && !line.startsWith('@'))
    .join(' ');

  const normalized = cleaned
    .replace(/^Optional\s+/i, '')
    .replace(/^The\s+/i, '')
    .replace(/^If true,\s*/i, '')
    .replace(/^Whether\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  const firstSentence = normalized.match(/.+?[.?!](?=\s|$)/)?.[0] ?? normalized;
  const concise = firstSentence
    .replace(/\s*Useful for.*$/i, '')
    .replace(/\s*Can be used to.*$/i, '')
    .replace(/\s*Typically.*$/i, '')
    .replace(/\s*Defaults to.*$/i, '')
    .replace(/\s*Should be within.*$/i, '')
    .replace(/\s*When provided.*$/i, '')
    .trim();

  return concise || '—';
}

function normalizeTypeText(value: string): string {
  return escapeCell(
    value
      .replace(/\s+/g, ' ')
      .replace(/\s*\|\s*/g, ' \\| ')
      .trim(),
  );
}

function cleanCodeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, '\\|');
}

function buildTable(model: ComponentApiModel): string {
  const lines = [
    START_MARKER,
    '| Prop | Type | Default | Required | Notes |',
    '| --- | --- | --- | --- | --- |',
  ];

  for (const row of model.rows) {
    lines.push(`| \`${row.prop}\` | \`${row.type}\` | \`${row.defaultValue}\` | ${row.required} | ${row.notes} |`);
  }

  lines.push(END_MARKER);

  return lines.join('\n');
}

function replaceRootApiTable(content: string, model: ComponentApiModel): string {
  const table = buildTable(model);

  if (content.includes(START_MARKER) && content.includes(END_MARKER)) {
    return content.replace(
      new RegExp(`${escapeRegExp(START_MARKER)}[\\s\\S]*?${escapeRegExp(END_MARKER)}`, 'm'),
      table,
    );
  }

  const rootHeadingMatch = content.match(/^## (Root API|Root Props)$/m);
  if (!rootHeadingMatch || rootHeadingMatch.index === undefined) {
    return content;
  }

  const rootHeadingIndex = rootHeadingMatch.index;
  const afterHeadingIndex = rootHeadingIndex + rootHeadingMatch[0].length;
  const afterHeading = content.slice(afterHeadingIndex);
  const nextH2Match = afterHeading.match(/\n## /);
  const rootSectionEnd = nextH2Match ? afterHeadingIndex + nextH2Match.index + 1 : content.length;
  const rootSection = content.slice(afterHeadingIndex, rootSectionEnd);

  const tableMatch = rootSection.match(/\n\| Prop \|[\s\S]*?(?=\n## |\n$|$)/);
  if (tableMatch && tableMatch.index !== undefined) {
    const absoluteStart = afterHeadingIndex + tableMatch.index;
    const absoluteEnd = absoluteStart + tableMatch[0].length;
    return `${content.slice(0, absoluteStart)}\n\n${table}\n${content.slice(absoluteEnd)}`;
  }

  return `${content.slice(0, afterHeadingIndex)}\n\n${table}${content.slice(afterHeadingIndex)}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
