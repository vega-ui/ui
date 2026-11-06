'use client';

import type { ReactNode } from 'react';
import NextLink from 'next/link';
import ReactMarkdown, { type ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Code, Heading, Link, Table, TableBody, TableData, TableHead, TableHeading, TableRow, Text } from '@vega-ui/react';
import { codeKey } from '@/lib/code';
import type { Highlighted } from '@/lib/highlight';
import { getInstallVariants } from '@/lib/install';
import { localize } from '@/lib/i18n';
import { resolveHref } from '@/lib/resolveHref';
import { createHeadingIds, type TocEntry } from '@/lib/toc';
import { EXAMPLES } from '@/generated/examples';
import { AccessibilityInspector } from './AccessibilityInspector';
import { CodeBlock } from './CodeBlock';
import { InstallBlock } from './InstallBlock';
import { PropsTable } from './PropsTable';
import { VariablesInspector } from './VariablesInspector';
import { Workbench } from './Workbench';
import { useLocale } from './LocaleProvider';
import styles from './Markdown.module.css';

type Node = ExtraProps['node'];

const textOf = (node: Node): string => {
  if (!node) return '';

  return node.children.map((child) => {
    if (child.type === 'text') return child.value;
    if (child.type === 'element') return textOf(child);

    return '';
  }).join('');
};

type Parent = { children: NonNullable<Node>['children'] };

const rehypeKbd = () => (tree: Parent) => {
  let key: NonNullable<Node> | undefined;

  tree.children = tree.children.flatMap((child) => {
    if (child.type === 'raw' && child.value === '<kbd>') {
      key = { type: 'element', tagName: 'kbd', properties: {}, children: [] };
      return [key];
    }
    if (child.type === 'raw' && child.value === '</kbd>') {
      key = undefined;
      return [];
    }
    if (key) {
      key.children.push(child);
      return [];
    }
    if (child.type === 'element') rehypeKbd()(child);

    return [child];
  });
};

type HeadingIds = Pick<TocEntry, 'id' | 'alias'>;

interface MarkdownProps {
  source: string
  slug?: string
  headings?: TocEntry[]
  highlighted: Highlighted
}

export const Markdown = ({ source, slug, headings, highlighted }: MarkdownProps) => {
  const locale = useLocale();
  const createId = createHeadingIds();
  const entries = new Map<number, HeadingIds>();

  const headingEntry = (node: Node) => {
    const offset = node?.position?.start.offset ?? -1;
    const saved = entries.get(offset);
    if (saved) return saved;

    const entry: HeadingIds = headings?.[entries.size] ?? { id: createId(textOf(node)) };
    entries.set(offset, entry);

    return entry;
  };

  const renderHeading = (as: 'h2' | 'h3' | 'h4', node: Node, children: ReactNode) => {
    const { id, alias } = headingEntry(node);

    return (
      <Heading as={as} fontWeight={600} id={id} className={styles[as]}>
        {alias && <span id={alias} className={styles.alias} />}
        {children}
      </Heading>
    );
  };

  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKbd]}
        components={{
          kbd: ({ children }) => <kbd className={styles.kbd}>{children}</kbd>,
          h1: ({ children }) => <Heading as='h2' fontWeight={600} className={styles.h1}>{children}</Heading>,
          h2: ({ node, children }) => renderHeading('h2', node, children),
          h3: ({ node, children }) => renderHeading('h3', node, children),
          h4: ({ node, children }) => renderHeading('h4', node, children),
          p: ({ children }) => <Text asChild className={styles.p}><p>{children}</p></Text>,
          ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
          ol: ({ children }) => <ol className={styles.list}>{children}</ol>,
          li: ({ children }) => <Text asChild className={styles.li}><li>{children}</li></Text>,
          a: ({ href = '', children }) => {
            const resolved = resolveHref(href, locale, slug);
            if (resolved.startsWith('/')) return <Link asChild><NextLink href={localize(locale, resolved)}>{children}</NextLink></Link>;

            return <Link href={resolved}>{children}</Link>;
          },
          pre: ({ children }) => <>{children}</>,
          code: ({ node, className, children }) => {
            const language = className?.match(/language-(\w+)/)?.[1];
            const code = String(children).replace(/\n$/, '');
            if (!language && !code.includes('\n')) return <Code size={2} className={styles.code}>{children}</Code>;

            const example = String(node?.data?.meta ?? '').match(/example=(\S+)/)?.[1];
            if (language === 'a11y') return <AccessibilityInspector slug={slug ?? ''} example={example} keys={code} />;
            if (language === 'props') return <PropsTable rows={code} />;
            if (language === 'cssvars') return <VariablesInspector slug={slug ?? ''} variables={code} />;

            if (example && EXAMPLES[example]) return <Workbench slug={slug ?? ''} example={example} code={code} html={highlighted[codeKey(code)]} />;

            const variants = getInstallVariants(code);
            if (variants) return <InstallBlock variants={variants} highlighted={highlighted} />;

            return <CodeBlock code={code} html={highlighted[codeKey(code)]} />;
          },
          table: ({ children }) => <div className={styles.table}><Table>{children}</Table></div>,
          thead: ({ children }) => <TableHead>{children}</TableHead>,
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          tr: ({ children }) => <TableRow>{children}</TableRow>,
          th: ({ children }) => <TableHeading>{children}</TableHeading>,
          td: ({ children }) => <TableData>{children}</TableData>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
};
