import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { isValidElement, type ReactNode } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CHANGELOG_PACKAGES, getChangelog, type ChangelogEntry, type ChangelogRelease } from './changelog';
import { getDictionary } from './i18n';
import { SITE_NAME, siteUrl } from './site';

export const FEED_PATH = '/changelog/feed.xml';

const root = join(process.cwd(), '../..');

const git = (args: string[]) => {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch {
    return '';
  }
};

const readTagDates = () => {
  const dates = new Map<string, string>();

  for (const line of git(['for-each-ref', 'refs/tags/@vega-ui/', '--format=%(refname:strip=2) %(creatordate:iso-strict)']).split('\n')) {
    const [tag, date] = line.split(' ');
    if (tag && date) dates.set(tag, new Date(date).toISOString());
  }

  return dates;
};

const readHeadingDates = (file: string) => {
  const dates = new Map<string, string>();
  let time = '';

  for (const line of git(['blame', '--line-porcelain', '--', file]).split('\n')) {
    if (line.startsWith('committer-time ')) {
      time = line.slice('committer-time '.length);
      continue;
    }

    const version = line.match(/^\t## (\S+)$/)?.[1];
    if (version && time) dates.set(version, new Date(Number(time) * 1000).toISOString());
  }

  return dates;
};

const escapeXml = (text: string) => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const VOID_ELEMENTS = new Set(['br', 'hr', 'img', 'input']);

const toHtml = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return escapeXml(String(node));
  if (Array.isArray(node)) return node.map(toHtml).join('');
  if (!isValidElement<Record<string, unknown>>(node)) return '';

  const { children, ...props } = node.props;
  const content = toHtml(children as ReactNode);
  if (typeof node.type !== 'string') return content;

  const attributes = Object.entries(props)
    .filter(([, value]) => typeof value === 'string')
    .map(([name, value]) => ` ${name === 'className' ? 'class' : name}="${escapeXml(String(value))}"`)
    .join('');
  if (VOID_ELEMENTS.has(node.type)) return `<${node.type}${attributes}>`;

  return `<${node.type}${attributes}>${content}</${node.type}>`;
};

const renderEntry = (entry: ChangelogEntry) => {
  const body = toHtml(Markdown({ children: entry.body, remarkPlugins: [remarkGfm] }));
  if (!entry.commit) return `<li>${body}</li>`;

  return `<li>${body}<p><a href="https://github.com/vega-ui/ui/commit/${entry.commit}">${entry.commit}</a></p></li>`;
};

const renderRelease = (release: ChangelogRelease) => {
  const t = getDictionary('en').changelog;
  if (release.dependenciesOnly) return `<p>${t.dependencies}</p>`;
  if (release.sections.length === 0) return `<p>${t.empty}</p>`;

  return release.sections
    .map((section) => `<h3>${t.sections[section.type]}</h3><ul>${section.entries.map(renderEntry).join('')}</ul>`)
    .join('');
};

export const getChangelogFeed = () => {
  const t = getDictionary('en').changelog;
  const tags = readTagDates();
  const now = new Date().toISOString();
  const changelog = getChangelog();

  const entries = CHANGELOG_PACKAGES.flatMap((item, index) => {
    const headings = readHeadingDates(`packages/${item.dir}/CHANGELOG.md`);

    return changelog[index].releases.map((release) => ({
      title: `${item.name} ${release.version}`,
      url: siteUrl(`/changelog/#${release.id}`),
      updated: tags.get(`${item.name}@${release.version}`) ?? headings.get(release.version) ?? now,
      content: renderRelease(release),
    }));
  }).sort((a, b) => b.updated.localeCompare(a.updated));

  const updated = entries[0]?.updated ?? now;

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <id>${escapeXml(siteUrl(FEED_PATH))}</id>`,
    `  <title>${escapeXml(`${SITE_NAME} ${t.title}`)}</title>`,
    `  <subtitle>${escapeXml(t.description)}</subtitle>`,
    `  <updated>${updated}</updated>`,
    `  <author><name>${SITE_NAME}</name></author>`,
    `  <link rel="self" type="application/atom+xml" href="${escapeXml(siteUrl(FEED_PATH))}"/>`,
    `  <link rel="alternate" type="text/html" href="${escapeXml(siteUrl('/changelog/'))}"/>`,
    ...entries.map((entry) => [
      '  <entry>',
      `    <id>${escapeXml(entry.url)}</id>`,
      `    <title>${escapeXml(entry.title)}</title>`,
      `    <updated>${entry.updated}</updated>`,
      `    <link rel="alternate" type="text/html" href="${escapeXml(entry.url)}"/>`,
      `    <content type="html">${escapeXml(entry.content)}</content>`,
      '  </entry>',
    ].join('\n')),
    '</feed>',
    '',
  ].join('\n');
};
