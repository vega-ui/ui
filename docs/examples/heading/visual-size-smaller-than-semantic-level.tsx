import { Heading, Text } from '@vega-ui/react';

const sections = [
  { title: 'Recent activity', items: ['Invoice #4821 paid', 'Dana joined the workspace'] },
  { title: 'Pinned projects', items: ['Website redesign', 'Mobile onboarding'] },
];

export default function VisualSizeSmallerThanSemanticLevel() {
  return (
    <aside aria-label='Sidebar' style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 240 }}>
      {sections.map((section) => (
        <section key={section.title} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Heading as='h2' size={2} fontWeight={500} style={{ color: 'var(--label-secondary)' }}>{section.title}</Heading>
          {section.items.map((item) => (
            <Text key={item} size={3}>{item}</Text>
          ))}
        </section>
      ))}
    </aside>
  );
}
