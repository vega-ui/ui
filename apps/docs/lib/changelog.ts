import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), '../..');

export const CHANGELOG_PACKAGES = [
  { slug: 'react', dir: 'ui', label: 'React', name: '@vega-ui/react' },
  { slug: 'hooks', dir: 'hooks', label: 'Hooks', name: '@vega-ui/hooks' },
  { slug: 'utils', dir: 'utils', label: 'Utils', name: '@vega-ui/utils' },
  { slug: 'icons', dir: 'icons', label: 'Icons', name: '@vega-ui/icons' },
  { slug: 'tokens', dir: 'tokens', label: 'Tokens', name: '@vega-ui/tokens-core' },
  { slug: 'theme', dir: 'theme', label: 'Theme', name: '@vega-ui/theme-core' },
  { slug: 'context', dir: 'react-context', label: 'Context', name: '@vega-ui/react-context' },
  { slug: 'i18n', dir: 'i18n', label: 'i18n', name: '@vega-ui/i18n' },
];

export type ReleaseType = 'major' | 'minor' | 'patch';

export interface ChangelogEntry {
  commit?: string
  body: string
}

export interface ChangelogSection {
  type: ReleaseType
  entries: ChangelogEntry[]
}

export interface ChangelogRelease {
  id: string
  version: string
  type: ReleaseType
  breaking: boolean
  dependenciesOnly: boolean
  unreleased?: boolean
  sections: ChangelogSection[]
}

export interface ChangelogPackage {
  slug: string
  label: string
  name: string
  releases: ChangelogRelease[]
  unreleased?: ChangelogRelease
}

const TYPES: ReleaseType[] = ['major', 'minor', 'patch'];

const DEPENDENCY_LINE = /^\s*- @vega-ui\/[\w-]+@\S+$/;

export const versionId = (slug: string, version: string) => {
  const id = `v${version.replace(/\./g, '-')}`;
  if (slug === 'react') return id;

  return `${slug}-${id}`;
};

const typeByVersion = (version: string, previous?: string): ReleaseType => {
  const [major, minor] = version.split('.');
  if (!previous) return minor === '0' ? 'major' : 'patch';

  const [previousMajor, previousMinor] = previous.split('.');
  if (major !== previousMajor) return 'major';
  if (minor !== previousMinor) return 'minor';

  return 'patch';
};

const toEntry = (lines: string[]): ChangelogEntry | null => {
  const [first, ...rest] = lines;
  if (first.startsWith('- Updated dependencies')) return null;
  if (DEPENDENCY_LINE.test(first)) return null;

  const match = first.match(/^- ([0-9a-f]{7,40}): (.*)$/);
  const head = match ? match[2] : first.slice(2);
  const tail = rest
    .filter((line) => !DEPENDENCY_LINE.test(line))
    .map((line) => line.replace(/^ {2}/, '').replace(/^#{1,6} (.+)$/, '**$1**'));
  const body = [head.replace(/^#{1,6} (.+)$/, '**$1**'), ...tail].join('\n').trim();
  if (!body) return null;

  return { commit: match?.[1], body };
};

const parseEntries = (block: string) => {
  const groups: string[][] = [];

  for (const line of block.split('\n')) {
    if (line.startsWith('- ')) {
      groups.push([line]);
      continue;
    }

    groups.at(-1)?.push(line);
  }

  return groups.flatMap((group) => toEntry(group) ?? []);
};

const parseRelease = (slug: string, chunk: string): Omit<ChangelogRelease, 'type'> & { type?: ReleaseType } => {
  const [version, ...body] = chunk.split('\n');
  const parts = body.join('\n').split(/^### (Major|Minor|Patch) Changes$/m);
  const sections: ChangelogSection[] = [];

  for (let index = 1; index < parts.length; index += 2) {
    const type = parts[index].toLowerCase() as ReleaseType;
    const entries = parseEntries(parts[index + 1]);
    if (entries.length > 0) sections.push({ type, entries });
  }

  const declared = TYPES.find((type) => parts.some((part, index) => index % 2 === 1 && part.toLowerCase() === type));

  return {
    id: versionId(slug, version.trim()),
    version: version.trim(),
    type: declared,
    breaking: sections.some((section) => section.type === 'major'),
    dependenciesOnly: parts.length > 1 && sections.length === 0,
    sections: sections.sort((a, b) => TYPES.indexOf(a.type) - TYPES.indexOf(b.type)),
  };
};

interface Changeset {
  bumps: Record<string, ReleaseType>
  body: string
}

const readChangesets = (): Changeset[] => {
  const dir = join(root, '.changeset');

  return readdirSync(dir)
    .filter((file) => file.endsWith('.md') && file !== 'README.md')
    .sort()
    .map((file) => {
      const [, frontmatter, ...body] = readFileSync(join(dir, file), 'utf8').split(/^---$/m);
      const bumps = Object.fromEntries([...frontmatter.matchAll(/^"?([^":\s]+)"?:\s*(major|minor|patch)\s*$/gm)].map(([, name, type]) => [name, type as ReleaseType]));

      return { bumps, body: body.join('---').trim() };
    });
};

const readVersion = (dir: string): string => JSON.parse(readFileSync(join(root, 'packages', dir, 'package.json'), 'utf8')).version;

const compareVersions = (a: string, b: string) => {
  const left = a.split('.').map(Number);
  const right = b.split('.').map(Number);
  const index = left.findIndex((part, position) => part !== right[position]);

  return index === -1 ? 0 : left[index] - right[index];
};

const bumpVersion = (version: string, type: ReleaseType) => {
  const [major, minor, patch] = version.split('.').map(Number);
  if (type === 'major') return `${major + 1}.0.0`;
  if (type === 'minor') return `${major}.${minor + 1}.0`;

  return `${major}.${minor}.${patch + 1}`;
};

const strongest = (types: ReleaseType[]) => TYPES.find((type) => types.includes(type));

const matchesPattern = (pattern: string, name: string) => {
  const source = pattern.split('*').filter(Boolean).map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*');

  return new RegExp(`^${source}${pattern.endsWith('*') ? '.*' : ''}$`).test(name);
};

const readFixedGroups = (): string[][] => JSON.parse(readFileSync(join(root, '.changeset', 'config.json'), 'utf8')).fixed ?? [];

const getUnreleased = (item: typeof CHANGELOG_PACKAGES[number], changesets: Changeset[]): ChangelogRelease | undefined => {
  const group = readFixedGroups().find((patterns) => patterns.some((pattern) => matchesPattern(pattern, item.name)));
  const members = group ? CHANGELOG_PACKAGES.filter((member) => group.some((pattern) => matchesPattern(pattern, member.name))) : [item];
  const type = strongest(changesets.flatMap((changeset) => members.flatMap((member) => changeset.bumps[member.name] ?? [])));
  if (!type) return undefined;

  const base = members.map((member) => readVersion(member.dir)).sort(compareVersions).at(-1) ?? '0.0.0';
  const version = bumpVersion(base, type);
  const sections = TYPES
    .map((sectionType) => ({
      type: sectionType,
      entries: changesets.filter((changeset) => changeset.bumps[item.name] === sectionType).map((changeset) => ({ body: changeset.body })),
    }))
    .filter((section) => section.entries.length > 0);

  return {
    id: item.slug === 'react' ? 'unreleased' : `${item.slug}-unreleased`,
    version,
    type,
    breaking: sections.some((section) => section.type === 'major'),
    dependenciesOnly: false,
    unreleased: true,
    sections,
  };
};

const readReleases = ({ slug, dir }: typeof CHANGELOG_PACKAGES[number]): ChangelogRelease[] => {
  const path = join(root, 'packages', dir, 'CHANGELOG.md');
  if (!existsSync(path)) return [];

  const parsed = readFileSync(path, 'utf8').split(/^## /m).slice(1).map((chunk) => parseRelease(slug, chunk));

  return parsed.map((release, index) => ({
    ...release,
    type: release.type ?? typeByVersion(release.version, parsed[index + 1]?.version),
  }));
};

export const getChangelog = (): ChangelogPackage[] => {
  const changesets = readChangesets();

  return CHANGELOG_PACKAGES.map((item) => ({
    slug: item.slug,
    label: item.label,
    name: item.name,
    releases: readReleases(item),
    unreleased: getUnreleased(item, changesets),
  }));
};
