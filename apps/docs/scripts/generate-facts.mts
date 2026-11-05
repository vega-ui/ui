import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { features } from 'web-features';
import { getChangelog } from '../lib/changelog.ts';
import { getComponents } from '../lib/content.ts';

const root = path.join(process.cwd(), '../..');
const uiDir = path.join(root, 'packages/ui');
const output = path.join(process.cwd(), 'generated/facts.json');

const requireFromUi = createRequire(path.join(uiDir, 'package.json'));
const requireFromVite = createRequire(requireFromUi.resolve('vite'));
const esbuild = requireFromVite('esbuild') as typeof import('esbuild');

const CSS_TARGET = ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'];
const BROWSERS = ['chrome', 'edge', 'firefox', 'safari', 'safari_ios'] as const;
const MDN = 'https://developer.mozilla.org/docs/Web/';
const INITIAL_VERSION = '1.0.0';

type Note = 'animation' | 'fallback' | 'closedby' | 'prefixed' | 'rtl' | 'vertical' | 'tokens';

interface Detector {
  id: string
  mdn: string
  css?: RegExp
  js?: RegExp
  note?: Note | ((css: string, js: string) => Note | undefined)
}

const DETECTORS: Detector[] = [
  { id: 'dialog', mdn: 'HTML/Reference/Elements/dialog', js: /\.showModal\(/ },
  { id: 'popover', mdn: 'API/Popover_API', js: /\.togglePopover\(|\.showPopover\(|popover:"(?:auto|manual|hint)"/, css: /:popover-open/ },
  { id: 'dialog-closedby', mdn: 'HTML/Reference/Elements/dialog#closedby', js: /closedby:/, note: 'closedby' },
  { id: 'anchor-positioning', mdn: 'CSS/CSS_anchor_positioning', css: /anchor-name:|position-anchor:|anchor\(/, note: (css) => /@supports not \(anchor-name/.test(css) ? 'fallback' : undefined },
  { id: 'has', mdn: 'CSS/:has', css: /:has\(/ },
  { id: 'modal', mdn: 'CSS/:modal', css: /:modal\b/ },
  { id: 'backdrop', mdn: 'CSS/::backdrop', css: /::backdrop/ },
  { id: 'relative-color', mdn: 'CSS/CSS_colors/Relative_colors', css: /\b(?:oklch|oklab|rgb|hsl|lch|lab)\(from\b/ },
  { id: 'color-mix', mdn: 'CSS/color_value/color-mix', css: /color-mix\(/ },
  { id: 'oklab', mdn: 'CSS/color_value/oklch', css: /.*/, note: (css) => /oklch\(|oklab\(/.test(css) ? undefined : 'tokens' },
  { id: 'registered-custom-properties', mdn: 'CSS/@property', css: /@property\b/ },
  { id: 'starting-style', mdn: 'CSS/@starting-style', css: /@starting-style/, note: 'animation' },
  { id: 'transition-behavior', mdn: 'CSS/transition-behavior', css: /allow-discrete|transition-behavior/, note: 'animation' },
  { id: 'field-sizing', mdn: 'CSS/field-sizing', css: /field-sizing/ },
  { id: 'scroll-snap', mdn: 'CSS/CSS_scroll_snap', css: /scroll-snap-(?:type|align)/ },
  { id: 'scrollend', mdn: 'API/Element/scrollend_event', js: /"scrollend"/, note: (_, js) => /"onscrollend"in/.test(js) ? 'fallback' : undefined },
  { id: 'scrollbar-width', mdn: 'CSS/scrollbar-width', css: /scrollbar-width/, note: (css) => /::-webkit-scrollbar/.test(css) ? 'prefixed' : undefined },
  { id: 'inert', mdn: 'HTML/Reference/Global_attributes/inert', js: /\binert:/ },
  { id: 'intl-locale', mdn: 'JavaScript/Reference/Global_Objects/Intl/Locale', js: /Intl\.Locale\b/ },
  { id: 'intl-locale-info', mdn: 'JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo', js: /getWeekInfo/, note: 'fallback' },
  { id: 'intl-duration-format', mdn: 'JavaScript/Reference/Global_Objects/Intl/DurationFormat', js: /Intl\.DurationFormat/ },
  { id: 'intl-segmenter', mdn: 'JavaScript/Reference/Global_Objects/Intl/Segmenter', js: /Intl\.Segmenter/ },
  { id: 'intl-display-names', mdn: 'JavaScript/Reference/Global_Objects/Intl/DisplayNames', js: /Intl\.DisplayNames/ },
  { id: 'resize-observer', mdn: 'API/ResizeObserver', js: /new ResizeObserver/ },
  { id: 'intersection-observer', mdn: 'API/IntersectionObserver', js: /new IntersectionObserver/ },
  { id: 'visual-viewport', mdn: 'API/Visual_Viewport_API', js: /\.visualViewport\b/ },
  { id: 'web-animations', mdn: 'API/Web_Animations_API', js: /\.getAnimations\(/ },
  { id: 'pointer-events-api', mdn: 'API/Pointer_events', js: /\.setPointerCapture\(/ },
  { id: 'backdrop-filter', mdn: 'CSS/backdrop-filter', css: /backdrop-filter/, note: (css) => /-webkit-backdrop-filter/.test(css) ? 'prefixed' : undefined },
  { id: 'masks', mdn: 'CSS/mask-image', css: /mask-image/, note: (css) => /-webkit-mask-image/.test(css) ? 'prefixed' : undefined },
  { id: 'clip-path', mdn: 'CSS/clip-path', css: /clip-path/ },
  { id: 'individual-transforms', mdn: 'CSS/scale', css: /[{;](?:scale|translate|rotate):/ },
  { id: 'aspect-ratio', mdn: 'CSS/aspect-ratio', css: /aspect-ratio/ },
  { id: 'logical-properties', mdn: 'CSS/CSS_logical_properties_and_values', css: /[{;](?:inset-(?:inline|block)|(?:margin|padding)-(?:inline|block)|(?:inline|block)-size|border-(?:start|end)-(?:start|end)-radius)\b/ },
  { id: 'dir-pseudo', mdn: 'CSS/:dir', css: /:dir\(/, note: 'rtl' },
  { id: 'vertical-form-controls', mdn: 'CSS/writing-mode', css: /writing-mode:vertical/, note: 'vertical' },
  { id: 'focus-visible', mdn: 'CSS/:focus-visible', css: /:focus-visible/ },
  { id: 'where', mdn: 'CSS/:where', css: /:where\(/ },
  { id: 'contain', mdn: 'CSS/contain', css: /[{;]contain:/ },
  { id: 'scroll-behavior', mdn: 'CSS/scroll-behavior', css: /scroll-behavior:smooth/ },
];

const toKebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const compareVersions = (a: string, b: string) => {
  const left = a.split('.').map(Number);
  const right = b.split('.').map(Number);

  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    const diff = (left[index] ?? 0) - (right[index] ?? 0);
    if (diff !== 0) return diff;
  }

  return 0;
};

const kB = (bytes: number) => Math.round(bytes / 102.4) / 10;

const bundle = async (dir: string) => {
  const result = await esbuild.build({
    entryPoints: [path.join(uiDir, 'dist', dir, 'index.js')],
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    write: false,
    metafile: true,
    outfile: 'out.js',
    external: ['react', 'react-dom', 'react/*', 'react-dom/*'],
    logLevel: 'silent',
  });
  const js = result.outputFiles[0].text;
  const exports = Object.values(result.metafile.outputs)[0].exports;
  const modules = Object.keys(result.metafile.inputs)
    .map((input) => path.resolve(input))
    .filter((input) => input.startsWith(path.join(uiDir, 'dist')) && input.endsWith('.module.css.js'))
    .map((input) => input.replace(path.join(uiDir, 'dist'), path.join(uiDir, 'src')).replace(/\.js$/, ''))
    .filter((file) => fs.existsSync(file));

  const css = modules.length === 0 ? '' : (await esbuild.build({
    stdin: { contents: modules.map((file) => `@import ${JSON.stringify(file)};`).join('\n'), loader: 'css', resolveDir: uiDir },
    bundle: true,
    minify: true,
    target: CSS_TARGET,
    loader: { '.css': 'local-css' },
    write: false,
    outfile: 'out.css',
    logLevel: 'silent',
  })).outputFiles[0].text;

  return { js, css, exports };
};

const measure = (js: string, css: string) => {
  const gzipJs = gzipSync(js).length;
  const gzipCss = css ? gzipSync(css).length : 0;
  const brotliJs = brotliCompressSync(js).length;
  const brotliCss = css ? brotliCompressSync(css).length : 0;

  return {
    gzip: kB(gzipJs + gzipCss),
    brotli: kB(brotliJs + brotliCss),
    js: { minified: kB(js.length), gzip: kB(gzipJs), brotli: kB(brotliJs) },
    css: { minified: kB(css.length), gzip: kB(gzipCss), brotli: kB(brotliCss) },
  };
};

const detect = (js: string, css: string) => DETECTORS.flatMap((detector) => {
  const found = (detector.css && detector.css.test(css)) || (detector.js && detector.js.test(js));
  if (!found) return [];

  const feature = features[detector.id];
  if (!feature || feature.kind !== 'feature') throw new Error(`Unknown web feature ${detector.id}`);

  const note = typeof detector.note === 'function' ? detector.note(css, js) : detector.note;
  const support = Object.fromEntries(BROWSERS.map((browser) => [browser, feature.status.support[browser] ?? null]));

  return [{
    id: detector.id,
    name: feature.name,
    mdn: `${MDN}${detector.mdn}`,
    baseline: feature.status.baseline,
    since: feature.status.baseline_low_date ?? null,
    support,
    required: !note || note === 'tokens',
    note: note ?? null,
  }];
});

type Detected = ReturnType<typeof detect>[number];

const summarize = (detected: Detected[]) => {
  const required = detected.filter((feature) => feature.required);
  const browsers = Object.fromEntries(BROWSERS.map((browser) => {
    const versions = required.map((feature) => feature.support[browser]);
    if (versions.some((version) => version === null)) return [browser, null];

    const highest = (versions as string[]).reduce((max, version) => compareVersions(version, max) > 0 ? version : max, '0');

    return [browser, highest.replace(/^≤/, '')];
  }));

  if (required.some((feature) => feature.baseline === false)) return { baseline: 'limited', year: null, browsers };

  const newly = required.filter((feature) => feature.baseline === 'low');
  if (newly.length === 0) return { baseline: 'widely', year: null, browsers };

  const year = newly.map((feature) => (feature.since ?? '').slice(0, 4)).sort().at(-1) ?? null;

  return { baseline: 'newly', year, browsers };
};

const releases = getChangelog().find((entry) => entry.slug === 'react')?.releases ?? [];

const readTags = () => {
  try {
    return execFileSync('git', ['tag', '--list', '@vega-ui/react@*'], { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .map((tag) => {
        const listing = execFileSync('git', ['ls-tree', '-d', '--name-only', tag, 'packages/ui/src/', 'packages/ui/src/components/'], { cwd: root, encoding: 'utf8' });

        return { version: tag.replace('@vega-ui/react@', ''), dirs: new Set(listing.split('\n').map((line) => path.basename(line))) };
      })
      .sort((a, b) => compareVersions(a.version, b.version));
  } catch {
    return [];
  }
};

const tags = readTags();

const history = (dir: string, exports: string[]) => {
  const first = tags.find((tag) => tag.dirs.has(dir));
  const names = exports.filter((name) => name.startsWith(dir) || name.startsWith(`use${dir}`));
  if (!first || names.length === 0) return { added: null, changed: null };

  const pattern = new RegExp(`(?<![\\w-])(?:${names.join('|')})(?![\\w-])`);
  const mentions = (release: typeof releases[number]) => release.sections.some((section) => section.entries.some((entry) => pattern.test(entry.body)));

  if (first === tags[0]) {
    const latest = releases.find(mentions);

    return { added: { version: INITIAL_VERSION, id: null }, changed: latest ? { version: latest.version, id: latest.id } : null };
  }

  const previous = tags[tags.indexOf(first) - 1];
  const candidates = releases.filter((release) => compareVersions(release.version, previous.version) > 0 && compareVersions(release.version, first.version) <= 0);
  const shipped = candidates.findLast(mentions) ?? candidates.find((release) => release.version === first.version);
  const renamed = releases.findLast(mentions);
  const introduced = renamed && shipped && compareVersions(renamed.version, shipped.version) < 0 ? renamed : shipped;
  if (!introduced) return { added: null, changed: null };

  const latest = releases.filter((release) => compareVersions(release.version, introduced.version) >= 0).find(mentions);

  return {
    added: { version: introduced.version, id: introduced.id },
    changed: latest ? { version: latest.version, id: latest.id } : null,
  };
};

const dirs = new Map(fs.readdirSync(path.join(uiDir, 'src'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(uiDir, 'dist', entry.name, 'index.js')))
  .map((entry) => [toKebab(entry.name), entry.name]));

const TEST_CALL = /^\s*(?:it|test)(?:\.\w+\(.*?\))?\(/gm;

const countTests = (dir: string) => {
  const files = fs.readdirSync(path.join(uiDir, 'src', dir), { recursive: true, encoding: 'utf8' })
    .filter((file) => /\.test\.tsx?$/.test(file));

  return files.reduce((count, file) => count + (fs.readFileSync(path.join(uiDir, 'src', dir, file), 'utf8').match(TEST_CALL)?.length ?? 0), 0);
};

const facts: Record<string, unknown> = {};

for (const component of getComponents()) {
  const dir = dirs.get(component.slug);
  if (!dir) continue;

  const { js, css, exports } = await bundle(dir);
  const detected = detect(js, css);

  facts[component.slug] = {
    entry: `@vega-ui/react/${dir}`,
    ...summarize(detected),
    features: detected.map(({ id, name, mdn, required, note }) => ({ id, name, mdn, required, note })),
    size: measure(js, css),
    tests: countTests(dir),
    ...history(dir, exports),
  };
}

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(facts, null, 2)}\n`);
console.log(`Facts for ${Object.keys(facts).length} components written to ${path.relative(process.cwd(), output)}`);
