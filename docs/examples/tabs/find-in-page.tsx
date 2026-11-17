import { Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function FindInPage() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Press Ctrl+F or ⌘F and search for “rollback window”: the browser finds it in a hidden tab and shows that tab.
      </Text>
      <Tabs defaultValue='builds'>
        <TabsList aria-label='Release notes'>
          <TabsTab value='builds'>Builds</TabsTab>
          <TabsTab value='deploys'>Deploys</TabsTab>
        </TabsList>
        <TabsPanel value='builds'>
          <Text size={3}>Builds now cache dependencies between branches.</Text>
        </TabsPanel>
        <TabsPanel value='deploys'>
          <Text size={3}>Every deploy keeps a 30-minute rollback window.</Text>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
