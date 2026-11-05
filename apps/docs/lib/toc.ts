export interface TocEntry {
  id: string
  title: string
  depth: number
  alias?: string
}

export const toId = (text: string) => text.trim().toLowerCase().replace(/`/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-');

export const createHeadingIds = () => {
  const counts = new Map<string, number>();

  return (text: string) => {
    const base = toId(text);
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    if (count === 0) return base;

    return `${base}-${count}`;
  };
};

const toPlainText = (markdown: string) => markdown.replace(/`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

const readHeadings = (markdown: string): TocEntry[] => {
  const headingId = createHeadingIds();

  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .split('\n')
    .flatMap((line) => {
      const match = line.match(/^(#{2,4}) (.+)$/);
      if (!match) return [];

      const title = toPlainText(match[2]);

      return [{ id: headingId(title), title, depth: match[1].length }];
    });
};

const sameStructure = (headings: TocEntry[], reference: TocEntry[]) => {
  if (headings.length !== reference.length) return false;

  return headings.every((heading, index) => heading.depth === reference[index].depth);
};

export const getToc = (markdown: string, reference?: string): TocEntry[] => {
  const headings = readHeadings(markdown);
  if (reference === undefined) return headings;

  const target = readHeadings(reference);
  if (!sameStructure(headings, target)) return headings;

  const ids = new Set(target.map((heading) => heading.id));

  return headings.map((heading, index) => {
    const { id } = target[index];
    if (ids.has(heading.id)) return { ...heading, id };

    return { ...heading, id, alias: heading.id };
  });
};
