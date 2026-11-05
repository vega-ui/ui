#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { KeyboardSpec } from '../docs/keyboard/types.ts';

const ROOT = process.cwd();
const SPEC_DIR = path.join(ROOT, 'docs', 'keyboard');
const START = '<!-- AUTO-GENERATED:KEYBOARD:start -->';
const END = '<!-- AUTO-GENERATED:KEYBOARD:end -->';
const CHECK = process.argv.includes('--check');
const ONLY = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : undefined;

const LOCALES = [
  { dir: 'en', headings: ['## Keyboard Behavior'], header: ['Key', 'Action'], text: (row: KeyboardSpec[number]) => row.en },
  { dir: 'ru', headings: ['## Поведение клавиатуры', '## Работа с клавиатурой'], header: ['Клавиша', 'Действие'], text: (row: KeyboardSpec[number]) => row.ru },
];

const KEY_LABELS: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  PageUp: 'Page Up',
  PageDown: 'Page Down',
  Control: 'Ctrl',
};

const formatKey = (key: string) => key
  .split('+')
  .map((part) => `<kbd>${KEY_LABELS[part] ?? part}</kbd>`)
  .join(' + ');

const buildBlock = (spec: KeyboardSpec, locale: typeof LOCALES[number]) => [
  START,
  `| ${locale.header.join(' | ')} |`,
  '| --- | --- |',
  ...spec.map((row) => `| ${row.keys.map(formatKey).join(' / ')} | ${locale.text(row).replaceAll('|', '\\|')} |`),
  END,
].join('\n');

const insertBlock = (markdown: string, block: string, headings: string[], file: string) => {
  const start = markdown.indexOf(START);
  if (start !== -1) {
    const end = markdown.indexOf(END, start);
    if (end === -1) throw new Error(`${file}: ${START} has no ${END}.`);

    return markdown.slice(0, start) + block + markdown.slice(end + END.length);
  }

  const heading = headings.find((item) => markdown.includes(`\n${item}\n`));
  if (!heading) throw new Error(`${file}: missing "${headings.join('" or "')}".`);

  const at = markdown.indexOf(`\n${heading}\n`);

  const after = at + heading.length + 2;

  return `${markdown.slice(0, after)}\n${block}\n${markdown.slice(after)}`;
};

const specs = fs.readdirSync(SPEC_DIR)
  .filter((file) => file.endsWith('.mts'))
  .filter((file) => !ONLY || ONLY.includes(file.replace(/\.mts$/, '')))
  .sort();
const stale: string[] = [];

for (const file of specs) {
  const slug = file.replace(/\.mts$/, '');
  const spec: KeyboardSpec = (await import(pathToFileURL(path.join(SPEC_DIR, file)).href)).default;

  for (const locale of LOCALES) {
    const target = path.join(ROOT, 'docs', locale.dir, 'components', slug, 'accessibility.md');
    if (!fs.existsSync(target)) continue;

    const current = fs.readFileSync(target, 'utf8');
    const next = insertBlock(current, buildBlock(spec, locale), locale.headings, path.relative(ROOT, target));
    if (next === current) continue;

    stale.push(path.relative(ROOT, target));
    if (!CHECK) fs.writeFileSync(target, next);
  }
}

if (CHECK && stale.length > 0) {
  console.error(`Keyboard tables are stale in:\n${stale.map((file) => `- ${file}`).join('\n')}\nRun pnpm docs:keyboard.`);
  process.exit(1);
}

console.log(CHECK ? 'Keyboard tables are up to date.' : `Keyboard tables generated for ${stale.length} file(s).`);
