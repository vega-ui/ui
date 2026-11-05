import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { Fragment } from 'react';
import { Link, Text } from '@vega-ui/react';
import { getDictionary, type Locale } from '@/lib/i18n';
import styles from './PageFooter.module.css';

const root = join(process.cwd(), '../..');
const dates = new Map<string, string | undefined>();

const git = (args: string[]) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

const isShallow = () => {
  try {
    return git(['rev-parse', '--is-shallow-repository']) !== 'false';
  } catch {
    return true;
  }
};

const shallow = isShallow();

const readDate = (path: string) => {
  if (shallow) return undefined;

  try {
    return git(['log', '-1', '--format=%cI', '--', path]) || undefined;
  } catch {
    return undefined;
  }
};

const getLastUpdated = (path: string) => {
  if (!dates.has(path)) dates.set(path, readDate(path));

  return dates.get(path);
};

const EDIT_URL = 'https://github.com/vega-ui/ui/edit/main/';

interface PageFooterProps {
  locale: Locale
  path: string
  parts?: { label: string, path: string }[]
}

export const PageFooter = ({ locale, path, parts = [] }: PageFooterProps) => {
  const t = getDictionary(locale).doc;
  const updated = [path, ...parts.map((part) => part.path)].map(getLastUpdated).filter(Boolean).sort().at(-1);
  const [before, after] = t.updated.split('{date}');

  return (
    <footer className={styles.footer}>
      {parts.length > 1 ? (
        <Text size={2}>
          {t.editParts}
          {parts.map((part, index) => <Fragment key={part.path}>{index > 0 ? ' · ' : ' '}<Link href={`${EDIT_URL}${part.path}`}>{part.label}</Link></Fragment>)}
        </Text>
      ) : (
        <Text size={2}>
          <Link href={`${EDIT_URL}${path}`}>{t.edit}</Link>
        </Text>
      )}
      {updated && (
        <Text size={2} className={styles.updated}>
          {before}
          <time dateTime={updated}>{new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(updated))}</time>
          {after}
        </Text>
      )}
    </footer>
  );
};
