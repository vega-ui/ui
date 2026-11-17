import { Badge, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function IssueCounts() {
  return (
    <Tabs defaultValue='open' style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Issues'>
        <TabsTab value='open'>Open <Badge size='xs' variant='info' appearance='ghost'>12</Badge></TabsTab>
        <TabsTab value='review'>In review <Badge size='xs' variant='warning' appearance='ghost'>3</Badge></TabsTab>
        <TabsTab value='closed'>Closed</TabsTab>
      </TabsList>
      <TabsPanel value='open'>
        <Text size={3}>12 issues need an owner.</Text>
      </TabsPanel>
      <TabsPanel value='review'>
        <Text size={3}>3 pull requests wait for a review.</Text>
      </TabsPanel>
      <TabsPanel value='closed'>
        <Text size={3}>Closed issues from the last 30 days.</Text>
      </TabsPanel>
    </Tabs>
  );
}
