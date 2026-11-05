#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const DOCS_DIR = path.join(process.cwd(), 'docs');
const EXAMPLES_DIR = path.join(DOCS_DIR, 'examples');
const LANGUAGE_DIRS = ['en', 'ru'].map((language) => path.join(DOCS_DIR, language));
const EXAMPLE_RE = /^<!-- example: (\S+) -->\n```(\w+)\n[\s\S]*?^```\n<!-- \/example -->$/gm;
const check = process.argv.includes('--check');

const listMarkdown = (dir: string): string[] => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const file = path.join(dir, entry.name);
  if (entry.isDirectory()) return listMarkdown(file);

  return entry.name.endsWith('.md') ? [file] : [];
});

const stale: string[] = [];

for (const file of LANGUAGE_DIRS.flatMap(listMarkdown)) {
  const markdown = fs.readFileSync(file, 'utf8');

  const synced = markdown.replace(EXAMPLE_RE, (_, source: string, language: string) => {
    const code = fs.readFileSync(path.join(EXAMPLES_DIR, source), 'utf8').trimEnd();

    return `<!-- example: ${source} -->\n\`\`\`${language}\n${code}\n\`\`\`\n<!-- /example -->`;
  });

  if (synced === markdown) continue;

  stale.push(path.relative(process.cwd(), file));
  if (!check) fs.writeFileSync(file, synced);
}

if (check && stale.length > 0) {
  console.error(`Examples are out of sync in:\n${stale.map((file) => `- ${file}`).join('\n')}\nRun pnpm docs:examples.`);
  process.exit(1);
}

console.log(check ? 'Doc examples are in sync.' : `Synced ${stale.length} file(s).`);
