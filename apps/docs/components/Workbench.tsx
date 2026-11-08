'use client';

import { useId, useRef, useState } from 'react';
import {
  Icon,
  IconButton,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { ChevronDown, RotateCcw, SquareArrowOutUpRight } from '@vega-ui/icons';
import { CodeBody, CopyButton } from './CodeBlock';
import { codeUrl, COLLAPSED_LINES, isPartial } from '@/lib/code';
import { EXAMPLE_META, EXAMPLES, SANDBOX_PACKAGE } from '@/generated/examples';
import { PREVIEWS } from './ComponentPreviews';
import { useDictionary, useLocale } from './LocaleProvider';
import styles from './Workbench.module.css';

const RTL_LANGUAGES = ['ar', 'he'];

const SANDBOX_FILES = {
  '.stackblitzrc': JSON.stringify({ installDependencies: true, startCommand: 'npm run dev' }, null, 2),
  'package.json': JSON.stringify({ name: 'vega-ui-example', private: true, type: 'module', scripts: { dev: 'vite', build: 'vite build' }, ...SANDBOX_PACKAGE }, null, 2),
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vega UI example</title>
    <style>
      body { margin: 0; font-family: system-ui, sans-serif; }
      #root { display: grid; place-items: center; min-height: 100vh; padding: 24px; box-sizing: border-box; }
    </style>
  </head>
  <body class="light">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`,
  'tsconfig.json': JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      strict: true,
      skipLibCheck: true,
      isolatedModules: true,
      noEmit: true,
    },
    include: ['src'],
  }, null, 2),
  'src/vite-env.d.ts': `/// <reference types="vite/client" />
`,
  'src/main.tsx': `import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Example from './Example';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Example />
  </StrictMode>,
);
`,
};

const openInStackBlitz = (title: string, code: string, styles: Record<string, string>) => {
  const files: Record<string, string> = { ...SANDBOX_FILES, 'src/Example.tsx': code };
  for (const [name, css] of Object.entries(styles)) files[`src/${name}`] = css;

  const fields: Record<string, string> = { 'project[title]': title, 'project[template]': 'node' };
  for (const [name, content] of Object.entries(files)) fields[`project[files][${name}]`] = content;

  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'https://stackblitz.com/run?file=src/Example.tsx';
  form.target = '_blank';
  form.hidden = true;

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.append(input);
  }

  document.body.append(form);
  form.submit();
  form.remove();
};

export const Workbench = ({ slug, example, code, html }: { slug: string, example?: string, code?: string, html?: string }) => {
  const locale = useLocale();
  const t = useDictionary();
  const Example = example ? EXAMPLES[example] : undefined;
  const meta = example ? EXAMPLE_META[example] : undefined;
  const locales = meta?.locales;
  const name = example ? example.split('/').at(-1) : `${slug}.tsx`;
  const codeId = useId();
  const [run, setRun] = useState(0);
  const [open, setOpen] = useState(false);
  const [dir, setDir] = useState('ltr');
  const [exampleLocale, setExampleLocale] = useState(locales?.[0]);
  const [fullHtml, setFullHtml] = useState<string>();
  const requested = useRef(false);
  const preview = Example ? <Example locale={exampleLocale} /> : PREVIEWS[slug]?.node;

  const changeLocale = (next: string | null) => {
    if (!next) return;

    setExampleLocale(next);
    setDir(RTL_LANGUAGES.includes(next.split('-')[0]) ? 'rtl' : 'ltr');
  };

  const loadFullCode = () => {
    if (!code || requested.current || !isPartial(code)) return;

    requested.current = true;
    fetch(codeUrl(code))
      .then((response) => (response.ok ? response.text() : undefined))
      .then(setFullHtml)
      .catch(() => {
        requested.current = false;
      });
  };

  const toggleCode = () => {
    loadFullCode();
    setOpen(!open);
  };

  if (!preview) return null;

  const lines = code?.split('\n').length ?? 0;
  const foldable = lines > COLLAPSED_LINES;
  const linesLabel = t.code.lines[new Intl.PluralRules(locale).select(lines)];

  return (
    <div role='group' className={styles.workbench} aria-label={t.code.preview}>
      <div className={styles.bench}>
        <div className={styles.tools}>
          {locales && (
            <Select size='xs' variant='inline' value={exampleLocale} onChangeValue={changeLocale}>
              <SelectCombobox aria-label={t.code.exampleLocale}>
                <SelectValue />
                <SelectIcon />
              </SelectCombobox>
              <SelectListbox>
                {locales.map((item) => <SelectOption key={item} value={item} lang={item}>{item}</SelectOption>)}
              </SelectListbox>
            </Select>
          )}
          <SegmentedControl size='xs' variant='secondary' name={`${codeId}-dir`} role='radiogroup' aria-label={t.code.direction} value={dir} onChange={(event) => setDir(event.target.value)}>
            <SegmentedControlItem value='ltr'>
              <SegmentedControlItemInput />
              LTR
            </SegmentedControlItem>
            <SegmentedControlItem value='rtl'>
              <SegmentedControlItemInput />
              RTL
            </SegmentedControlItem>
            <SegmentedControlIndicator />
          </SegmentedControl>
          <IconButton size='xs' variant='secondary' appearance='ghost' aria-label={t.code.reset} onClick={() => setRun(run + 1)}>
            <Icon size='xs'><RotateCcw /></Icon>
          </IconButton>
        </div>
        <div key={run} dir={dir} lang={exampleLocale} className={styles.specimen} data-wide={meta?.wide || undefined}>{preview}</div>
      </div>

      {code && (
        <div className={styles.drawer} data-open={open || !foldable || undefined}>
          <div className={styles.drawerBar}>
            <Text className={styles.drawerLabel}>{`${name} · ${lines} ${linesLabel}`}</Text>
            <div className={styles.actions}>
              {meta?.sandbox && (
                <IconButton
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={t.code.stackblitz}
                  title={t.code.stackblitz}
                  onClick={() => openInStackBlitz(`Vega UI · ${example}`, code, meta.sandbox ?? {})}
                >
                  <Icon><SquareArrowOutUpRight /></Icon>
                </IconButton>
              )}
              <CopyButton code={code} />
            </div>
          </div>
          <div id={codeId} className={styles.code}>
            <CodeBody code={code} html={fullHtml ?? html} />
          </div>
          {foldable && (
            <button type='button' className={styles.pull} aria-expanded={open} aria-controls={codeId} onPointerEnter={loadFullCode} onFocus={loadFullCode} onClick={toggleCode}>
              {open ? t.code.hide : t.code.show}
              <Icon size='xs' className={styles.chevron}><ChevronDown /></Icon>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
