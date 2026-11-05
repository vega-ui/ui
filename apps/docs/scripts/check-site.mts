import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import type { AddressInfo } from 'node:net';
import { chromium } from 'playwright';
import type { BrowserContext } from 'playwright';

const outDir = path.resolve(process.argv[2] ?? path.join(process.cwd(), 'out'));
const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/\/$/, '');
const axePath = createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const POOL = 6;
const LIBRARY_AREAS = '[class*="_specimen"], [class*="_stage"], pre';

const AXE_COMPONENTS = ['button', 'dialog', 'select', 'data-grid', 'date-field'];
const AXE_PATHS = ['/', '/components/', '/docs/getting-started/', '/changelog/', '/this-page-does-not-exist/'];
const OVERFLOW_PATHS = [
  '/',
  '/components/',
  '/docs/getting-started/',
  '/changelog/',
  '/components/button/',
  '/components/button/api/',
  '/components/data-grid/',
  '/components/data-grid/examples/',
  '/components/date-field/api/',
  '/ru/components/dialog/',
];
const OVERFLOW_WIDTHS = [320, 390];

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
};

type Resolved = { file: string } | { redirect: string } | null;

const isFile = (file: string) => fs.existsSync(file) && fs.statSync(file).isFile();

const resolvePath = (pathname: string): Resolved => {
  if (pathname !== basePath && !pathname.startsWith(`${basePath}/`)) return null;
  const relative = pathname.slice(basePath.length) || '/';
  const target = path.join(outDir, relative);
  if (!target.startsWith(outDir)) return null;
  if (relative.endsWith('/')) return isFile(path.join(target, 'index.html')) ? { file: path.join(target, 'index.html') } : null;
  if (isFile(target)) return { file: target };
  if (isFile(path.join(target, 'index.html'))) return { redirect: `${pathname}/` };
  if (isFile(`${target}.html`)) return { file: `${target}.html` };
  return null;
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  const resolved = resolvePath(decodeURIComponent(url.pathname));
  if (resolved && 'redirect' in resolved) {
    response.writeHead(301, { location: `${resolved.redirect}${url.search}` });
    response.end();
    return;
  }
  const file = resolved ? resolved.file : path.join(outDir, '404.html');
  response.writeHead(resolved ? 200 : 404, { 'content-type': CONTENT_TYPES[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(response);
});

await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
const localRoot = `${origin}${basePath}`;

const locs = [...fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const siteRoot = locs.reduce((shortest, loc) => (loc.length < shortest.length ? loc : shortest)).replace(/\/$/, '');
const toLocal = (url: string) => (url.startsWith(siteRoot) ? `${localRoot}${url.slice(siteRoot.length)}` : url);

const failures: Record<string, string[]> = { http: [], console: [], links: [], axe: [], overflow: [] };
const warnings: Record<string, number> = {};

const pool = async <T>(items: T[], run: (item: T) => Promise<void>) => {
  let cursor = 0;
  await Promise.all(Array.from({ length: POOL }, async () => {
    while (cursor < items.length) {
      const item = items[cursor];
      cursor += 1;
      await run(item);
    }
  }));
};

const short = (url: string) => url.replace(origin, '');

const browser = await chromium.launch();
const newContext = async (theme: string, width = 1280) => {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  await context.addInitScript((value) => localStorage.setItem('theme', value), theme);
  return context;
};

const crawlContext = await newContext('light');
const idsByPath = new Map<string, Set<string>>();
const links = new Map<string, string>();
const pages = locs.map(toLocal);

console.log(`Crawling ${pages.length} pages from sitemap.xml at ${localRoot}/`);
await pool(pages, async (url) => {
  const page = await crawlContext.newPage();
  const where = short(url);
  let pending = 0;
  page.on('request', () => { pending += 1; });
  page.on('requestfinished', () => { pending -= 1; });
  page.on('requestfailed', () => { pending -= 1; });
  page.on('console', (message) => {
    if (message.type() === 'error') failures.console.push(`${where} :: ${message.text().slice(0, 300)}`);
  });
  page.on('pageerror', (error) => failures.console.push(`${where} :: ${error.message.slice(0, 300)}`));
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith(origin)) failures.http.push(`${where} :: ${response.status()} ${short(response.url())}`);
  });
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(() => new Promise((resolve) => requestIdleCallback(resolve)));
    while (pending > 0) await page.waitForTimeout(50);
    const found = await page.evaluate((areas) => ({
      ids: [...document.querySelectorAll('[id]')].map((element) => element.id),
      hrefs: [...document.querySelectorAll('a[href]')].filter((anchor) => !anchor.closest(areas)).map((anchor) => (anchor as HTMLAnchorElement).href),
    }), LIBRARY_AREAS);
    idsByPath.set(new URL(url).pathname, new Set(found.ids));
    for (const href of found.hrefs) {
      const local = toLocal(href);
      if (local.startsWith(origin) && !links.has(local)) links.set(local, where);
    }
  } catch (error) {
    failures.http.push(`${where} :: ${String(error).split('\n')[0]}`);
  } finally {
    await page.close();
  }
});
await crawlContext.close();

const staticIds = (file: string) => new Set([...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));

for (const [link, from] of links) {
  const url = new URL(link);
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.startsWith(`${basePath}/storybook/`)) continue;
  let resolved = resolvePath(pathname);
  let target = pathname;
  if (resolved && 'redirect' in resolved) {
    target = resolved.redirect;
    resolved = resolvePath(target);
  }
  if (!resolved || 'redirect' in resolved) {
    failures.links.push(`${from} -> ${short(link)} (no such file)`);
    continue;
  }
  const fragment = decodeURIComponent(url.hash.slice(1));
  if (!fragment) continue;
  const ids = idsByPath.get(target) ?? staticIds(resolved.file);
  if (!ids.has(fragment)) failures.links.push(`${from} -> ${short(link)} (no element with id "${fragment}")`);
}

const componentPaths = AXE_COMPONENTS.flatMap((slug) => {
  const dir = path.join(outDir, 'components', slug);
  const subpages = fs.readdirSync(dir).filter((entry) => isFile(path.join(dir, entry, 'index.html'))).map((entry) => `${entry}/`);
  return ['', ...subpages].map((subpage) => `/components/${slug}/${subpage}`);
});
const axeJobs = ['light', 'dark'].flatMap((theme) => [...AXE_PATHS, ...componentPaths].map((pathname) => ({ theme, url: `${localRoot}${pathname}` })));

const axeContexts: Record<string, BrowserContext> = { light: await newContext('light', 1440), dark: await newContext('dark', 1440) };
const axeGroups = new Map<string, { count: number, pages: Set<string>, samples: Map<string, number> }>();

console.log(`Running axe on ${axeJobs.length} page variants`);
await pool(axeJobs, async (job) => {
  const page = await axeContexts[job.theme].newPage();
  const where = `${short(job.url)} (${job.theme})`;
  try {
    await page.goto(job.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.addScriptTag({ path: axePath });
    const nodes = await page.evaluate(async (areas) => {
      const axe = (window as unknown as { axe: { run: (context: Document, options: object) => Promise<{ violations: { id: string, nodes: { target: unknown[], html: string }[] }[] }> } }).axe;
      const result = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] });
      return result.violations.flatMap((violation) => violation.nodes.map((node) => {
        const selector = node.target[node.target.length - 1];
        const element = typeof selector === 'string' ? document.querySelector(selector) : null;
        const libraryClass = /(^|\s)_[a-zA-Z]+_[a-z0-9]{5}_\d/.test(String(element?.className ?? ''));
        const inLibrary = Boolean(element?.closest(areas)) || (violation.id === 'color-contrast' && libraryClass);
        return { rule: violation.id, selector: String(selector), html: node.html.slice(0, 160), inLibrary };
      }));
    }, LIBRARY_AREAS);
    for (const node of nodes) {
      if (node.inLibrary) {
        warnings[node.rule] = (warnings[node.rule] ?? 0) + 1;
        continue;
      }
      const group = axeGroups.get(node.rule) ?? { count: 0, pages: new Set<string>(), samples: new Map<string, number>() };
      const sample = `${node.selector} ${node.html}`;
      group.count += 1;
      group.samples.set(sample, (group.samples.get(sample) ?? 0) + 1);
      group.pages.add(where);
      axeGroups.set(node.rule, group);
    }
  } catch (error) {
    failures.axe.push(`${where} :: ${String(error).split('\n')[0]}`);
  } finally {
    await page.close();
  }
});
await Promise.all(Object.values(axeContexts).map((context) => context.close()));

for (const [rule, group] of axeGroups) {
  const samples = [...group.samples].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([sample, count]) => `\n      ${count}x ${sample}`);
  failures.axe.push(`${rule}: ${group.count} node(s) on ${group.pages.size} page(s), e.g. ${[...group.pages].slice(0, 3).join(', ')}${samples.join('')}`);
}

const overflowJobs = OVERFLOW_WIDTHS.flatMap((width) => OVERFLOW_PATHS.map((pathname) => ({ width, url: `${localRoot}${pathname}` })));
console.log(`Checking horizontal overflow on ${overflowJobs.length} page variants`);
const overflowContexts = new Map<number, BrowserContext>();
for (const width of OVERFLOW_WIDTHS) overflowContexts.set(width, await newContext('light', width));
await pool(overflowJobs, async (job) => {
  const page = await overflowContexts.get(job.width)!.newPage();
  const where = `${short(job.url)} @${job.width}px`;
  try {
    await page.goto(job.url, { waitUntil: 'networkidle', timeout: 60000 });
    const overflow = await page.evaluate(() => {
      const width = document.documentElement.scrollWidth;
      if (width <= innerWidth) return null;
      const culprits = [...document.querySelectorAll('body *')]
        .filter((element) => element.getBoundingClientRect().right > innerWidth + 1)
        .filter((element) => ![...element.children].some((child) => child.getBoundingClientRect().right > innerWidth + 1))
        .sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right)
        .slice(0, 3)
        .map((element) => [element.tagName.toLowerCase(), ...(element.getAttribute('class') ?? '').split(' ').slice(0, 1)].filter(Boolean).join('.'));
      return `scrollWidth ${width} > ${innerWidth}: ${culprits.join(', ')}`;
    });
    if (overflow) failures.overflow.push(`${where} :: ${overflow}`);
  } catch (error) {
    failures.overflow.push(`${where} :: ${String(error).split('\n')[0]}`);
  } finally {
    await page.close();
  }
});
await Promise.all([...overflowContexts.values()].map((context) => context.close()));

await browser.close();
server.close();

const LABELS: Record<string, string> = {
  http: 'HTTP errors',
  console: 'Console and page errors',
  links: 'Broken internal links',
  axe: 'Accessibility violations in site chrome',
  overflow: 'Horizontal overflow',
};

console.log(`\nChecked ${pages.length} pages, ${links.size} internal links, ${axeJobs.length} axe runs, ${overflowJobs.length} overflow runs.`);
const warningEntries = Object.entries(warnings);
if (warningEntries.length > 0) {
  console.log(`\nWarnings (not failing): axe violations in live previews, code, and library-component contrast: ${warningEntries.map(([rule, count]) => `${rule} ${count}`).join(', ')}`);
}

let failed = false;
for (const [key, items] of Object.entries(failures)) {
  const unique = [...new Set(items)];
  if (unique.length === 0) {
    console.log(`ok  ${LABELS[key]}`);
    continue;
  }
  failed = true;
  console.log(`\nFAIL ${LABELS[key]}: ${unique.length}`);
  for (const item of unique.slice(0, 30)) console.log(`  ${item}`);
  if (unique.length > 30) console.log(`  ... and ${unique.length - 30} more`);
}

process.exit(failed ? 1 : 0);
