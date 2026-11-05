import { Button, Heading, Separator, Text } from '@vega-ui/react';
import { Fragment, useState } from 'react';

const projects = [
  { name: 'Website redesign', status: 'active' },
  { name: 'Mobile onboarding', status: 'active' },
  { name: 'Q3 pricing test', status: 'paused' },
  { name: 'Legacy API migration', status: 'archived' },
  { name: 'Holiday campaign', status: 'archived' },
];

const groups = [
  { status: 'active', title: 'Active' },
  { status: 'paused', title: 'Paused' },
  { status: 'archived', title: 'Archived' },
];

export default function ConditionalDivider() {
  const [showArchived, setShowArchived] = useState(false);

  const visibleGroups = [];

  for (const group of groups) {
    if (group.status === 'archived' && !showArchived) continue;

    const items = projects.filter((project) => project.status === group.status);
    if (items.length === 0) continue;

    visibleGroups.push({ ...group, items });
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button
        size='sm'
        variant='secondary'
        appearance='ghost'
        aria-pressed={showArchived}
        onClick={() => setShowArchived(!showArchived)}
        style={{ justifySelf: 'start' }}
      >
        Show archived
      </Button>
      {visibleGroups.map((group, index) => (
        <Fragment key={group.status}>
          {index > 0 && <Separator />}
          <section aria-labelledby={`projects-${group.status}`} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Heading as='h3' size={2} id={`projects-${group.status}`} style={{ color: 'var(--label-secondary)' }}>{group.title}</Heading>
            {group.items.map((project) => (
              <Text key={project.name} size={3}>{project.name}</Text>
            ))}
          </section>
        </Fragment>
      ))}
    </div>
  );
}
