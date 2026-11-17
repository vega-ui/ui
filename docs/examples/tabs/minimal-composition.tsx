import { Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Tabs defaultValue='overview' style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Project'>
        <TabsTab value='overview'>Overview</TabsTab>
        <TabsTab value='activity'>Activity</TabsTab>
        <TabsTab value='settings'>Settings</TabsTab>
      </TabsList>
      <TabsPanel value='overview'>
        <Text size={3}>Spring release: 12 of 18 launch tasks are done.</Text>
      </TabsPanel>
      <TabsPanel value='activity'>
        <Text size={3}>Mira moved “Pricing page” to review two hours ago.</Text>
      </TabsPanel>
      <TabsPanel value='settings'>
        <Text size={3}>The project is visible to everyone in the workspace.</Text>
      </TabsPanel>
    </Tabs>
  );
}
