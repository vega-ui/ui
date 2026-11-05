#!/usr/bin/env node

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { AddressInfo } from 'node:net';
import { chromium, firefox, webkit } from 'playwright';
import type { Locator, Page } from 'playwright';
import type { Check, Expectation, KeyboardSpec, Step, Target } from '../docs/keyboard/types.ts';

const ROOT = process.cwd();
const SPEC_DIR = path.join(ROOT, 'docs', 'keyboard');
const COMPONENTS_DIR = path.join(ROOT, 'docs', 'en', 'components');
const TIMEOUT = 3000;

const readArg = (name: string) => {
  const index = process.argv.indexOf(name);

  return index === -1 ? undefined : process.argv[index + 1];
};

const ENGINES = { chromium, firefox, webkit };
const engineArg = readArg('--browser') ?? 'chromium';
const engines: (keyof typeof ENGINES)[] = engineArg === 'all' ? ['chromium', 'firefox'] : [engineArg as keyof typeof ENGINES];
const only = readArg('--only')?.split(',');
const outDir = readArg('--out');

const serve = async (dir: string) => {
  const root = path.resolve(dir);
  const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/\/$/, '');
  const types: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname).slice(basePath.length);
    const target = path.join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
    const file = target.startsWith(root) && fs.existsSync(target) && fs.statSync(target).isFile() ? target : path.join(root, '404.html');
    response.writeHead(file === target ? 200 : 404, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(response);
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

  return { server, url: `http://127.0.0.1:${(server.address() as AddressInfo).port}${basePath}` };
};

const listExamplePages = () => {
  const pages = new Map<string, string>();

  for (const slug of fs.readdirSync(COMPONENTS_DIR)) {
    const dir = path.join(COMPONENTS_DIR, slug);
    if (!fs.statSync(dir).isDirectory()) continue;

    for (const file of fs.readdirSync(dir).filter((name) => name.endsWith('.md'))) {
      const page = file === 'index.md' ? '' : `${file.replace(/\.md$/, '')}/`;
      for (const match of fs.readFileSync(path.join(dir, file), 'utf8').matchAll(/^<!-- example: (\S+) -->$/gm)) {
        if (!pages.has(match[1])) pages.set(match[1], `/components/${slug}/${page}`);
      }
    }
  }

  return pages;
};

const describeTarget = (target: Target) => `${target.role}${target.name === undefined ? '' : ` "${target.name}"`}${target.nth === undefined ? '' : ` #${target.nth}`}`;

const describeExpectation = (expectation: Expectation) => {
  if ('focused' in expectation) return `focused ${describeTarget(expectation.focused)}`;
  if ('active' in expectation) return `active ${describeTarget(expectation.active)}`;
  if ('visible' in expectation) return `visible ${describeTarget(expectation.visible)}`;
  if ('hidden' in expectation) return `hidden ${describeTarget(expectation.hidden)}`;
  if ('checked' in expectation) return `${describeTarget(expectation.of)} checked=${expectation.checked}`;
  if ('attr' in expectation) return `${describeTarget(expectation.of)} [${expectation.attr}]=${expectation.is}`;

  return `${describeTarget(expectation.of)} value="${expectation.value}"`;
};

const byRole = (scope: Page | Locator, target: Target) => {
  const options = target.name === undefined ? {} : { name: target.name, exact: typeof target.name === 'string' };

  return scope.getByRole(target.role as Parameters<Page['getByRole']>[0], options).nth(target.nth ?? 0);
};

const resolve = async (page: Page, specimen: Locator, target: Target) => {
  const local = byRole(specimen, target);
  if (await local.count() > 0) return local;

  return byRole(page, target);
};

const isActiveDescendant = (element: Element) => {
  const id = document.activeElement?.getAttribute('aria-activedescendant');

  return Boolean(id) && element.id === id;
};

const evaluate = async (page: Page, specimen: Locator, expectation: Expectation) => {
  if ('hidden' in expectation) {
    const locator = await resolve(page, specimen, expectation.hidden);

    return await locator.count() === 0 || !await locator.isVisible();
  }

  const target = 'focused' in expectation ? expectation.focused
    : 'active' in expectation ? expectation.active
      : 'visible' in expectation ? expectation.visible
        : expectation.of;
  const locator = await resolve(page, specimen, target);
  if (await locator.count() === 0) return false;

  if ('focused' in expectation) return locator.evaluate((element) => element === document.activeElement);
  if ('active' in expectation) return locator.evaluate(isActiveDescendant);
  if ('visible' in expectation) return locator.isVisible();
  if ('checked' in expectation) return await locator.isChecked() === expectation.checked;
  if ('attr' in expectation) return await locator.getAttribute(expectation.attr) === expectation.is;

  return await locator.inputValue() === expectation.value;
};

const waitFor = async (page: Page, specimen: Locator, expectations: Expectation[]) => {
  const deadline = Date.now() + TIMEOUT;
  let failed = expectations;

  while (Date.now() < deadline) {
    const results = await Promise.all(expectations.map((expectation) => evaluate(page, specimen, expectation).catch(() => false)));
    failed = expectations.filter((_, index) => !results[index]);
    if (failed.length === 0) return [];
    await page.waitForTimeout(50);
  }

  return failed.map(describeExpectation);
};

const runStep = async (page: Page, specimen: Locator, step: Step) => {
  if ('press' in step) return page.keyboard.press(step.press);

  const locator = await resolve(page, specimen, 'focus' in step ? step.focus : step.click);
  await locator.waitFor({ state: 'attached', timeout: TIMEOUT });
  if ('focus' in step) return locator.focus();

  return locator.click();
};

const runCheck = async (page: Page, check: Check) => {
  const name = check.example.split('/').at(-1);
  const workbench = page.getByRole('group', { name: 'Live preview' }).filter({ hasText: `${name} · ` });
  if (await workbench.count() !== 1) return [`${await workbench.count()} workbenches for ${check.example}`];

  await workbench.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    document.querySelectorAll('dialog[open]').forEach((dialog) => (dialog as HTMLDialogElement).close());
    document.querySelectorAll(':popover-open').forEach((popover) => (popover as HTMLElement).hidePopover());
  });
  await workbench.getByRole('radio', { name: check.dir === 'rtl' ? 'RTL' : 'LTR' }).check({ force: true });
  await workbench.getByRole('button', { name: 'Reset preview' }).click();
  await page.mouse.move(0, 0);

  const specimen = workbench.locator('[class*="_specimen"]');
  await specimen.locator('*').first().waitFor({ timeout: TIMEOUT });

  for (const step of check.steps) await runStep(page, specimen, step);

  const before = await waitFor(page, specimen, check.before ?? []);
  if (before.length > 0) return before.map((message) => `before: ${message}`);

  await page.keyboard.press(check.press);

  return waitFor(page, specimen, check.expect);
};

const specs = new Map<string, KeyboardSpec>();
for (const file of fs.readdirSync(SPEC_DIR).filter((name) => name.endsWith('.mts')).sort()) {
  const slug = file.replace(/\.mts$/, '');
  if (only && !only.includes(slug)) continue;

  specs.set(slug, (await import(pathToFileURL(path.join(SPEC_DIR, file)).href)).default);
}

const pages = listExamplePages();
const problems: string[] = [];
const byPage = new Map<string, { label: string, check: Check }[]>();

for (const [slug, spec] of specs) {
  for (const row of spec) {
    const label = `${slug} · ${row.keys.join(' / ')} · ${row.en}`;
    const missing = row.keys.filter((key) => !row.checks.some((check) => check.press === key));
    if (missing.length > 0) problems.push(`${label}: no check presses ${missing.join(', ')}`);

    row.checks.forEach((check, index) => {
      const url = pages.get(check.example);
      if (!url) {
        problems.push(`${label}: example ${check.example} is not embedded in any component page`);
        return;
      }

      byPage.set(url, [...byPage.get(url) ?? [], { label: `${label} [${index + 1}${check.dir === 'rtl' ? ' rtl' : ''}]`, check }]);
    });
  }
}

const served = outDir ? await serve(outDir) : undefined;
const baseUrl = (served?.url ?? readArg('--base-url') ?? 'http://localhost:3000').replace(/\/$/, '');
let total = 0;

for (const engine of engines) {
  const browser = await ENGINES[engine].launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });

  for (const [url, checks] of byPage) {
    const page = await context.newPage();
    await page.goto(`${baseUrl}${url}`, { waitUntil: 'load' });

    for (const { label, check } of checks) {
      total += 1;
      const failures = await runCheck(page, check).catch((error: Error) => [error.message.split('\n')[0]]);
      if (failures.length > 0) problems.push(`[${engine}] ${label}: ${failures.join('; ')}`);
    }

    await page.close();
  }

  await browser.close();
}

served?.server.close();

if (problems.length > 0) {
  console.error(`Keyboard checks failed (${problems.length}):\n${problems.map((problem) => `- ${problem}`).join('\n')}`);
  process.exit(1);
}

console.log(`Keyboard checks passed: ${total} check(s) on ${engines.join(', ')}.`);
