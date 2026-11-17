import { useId } from 'react';
import { Heading, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  const titleId = useId();

  return (
    <section style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 480 }}>
      <Heading id={titleId} as='h3' size={4} fontWeight={600}>Issues</Heading>
      <Tabs defaultValue='open' size='sm'>
        <TabsList aria-labelledby={titleId}>
          <TabsTab value='open'>Open</TabsTab>
          <TabsTab value='closed'>Closed</TabsTab>
        </TabsList>
        <Text size={2} style={{ display: 'block', marginBlockEnd: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>Updated 5 minutes ago</Text>
        <TabsPanel value='open'>
          <Text size={3}>3 open issues, the oldest from 12 November.</Text>
        </TabsPanel>
        <TabsPanel value='closed'>
          <Text size={3}>41 issues closed this month.</Text>
        </TabsPanel>
      </Tabs>
    </section>
  );
}
