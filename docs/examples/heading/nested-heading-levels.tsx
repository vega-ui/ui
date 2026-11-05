import { Heading, Text, type HeadingAs } from '@vega-ui/react';

interface Topic {
  title: string
  children?: Topic[]
}

const guide: Topic = {
  title: 'Admin guide',
  children: [
    {
      title: 'Security',
      children: [
        {
          title: 'Single sign-on',
          children: [
            {
              title: 'SAML setup',
              children: [
                {
                  title: 'Okta',
                  children: [
                    { title: 'Group mapping', children: [{ title: 'Nested groups' }] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { title: 'Billing' },
  ],
};

const levels: HeadingAs[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function TopicSection({ topic, depth }: { topic: Topic, depth: number }) {
  const level = levels[Math.min(depth, levels.length - 1)];

  return (
    <section style={{ display: 'grid', gap: 'var(--spacing-4)', paddingInlineStart: depth === 0 ? 0 : 'var(--spacing-6)' }}>
      <Heading as={level} size={Math.max(7 - depth, 2)}>{topic.title}</Heading>
      {depth >= levels.length && <Text size={1} style={{ color: 'var(--label-tertiary)' }}>Deeper than h6, shown at the h6 level</Text>}
      {topic.children?.map((child) => (
        <TopicSection key={child.title} topic={child} depth={depth + 1} />
      ))}
    </section>
  );
}

export default function NestedHeadingLevels() {
  return <TopicSection topic={guide} depth={0} />;
}
