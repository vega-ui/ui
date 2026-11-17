import { useId } from 'react';
import { HelperText, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function PlanLimitedTab() {
  const reasonId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Tabs defaultValue='members'>
        <TabsList aria-label='Workspace'>
          <TabsTab value='members'>Members</TabsTab>
          <TabsTab value='roles'>Roles</TabsTab>
          <TabsTab value='audit' disabled aria-describedby={reasonId}>Audit log</TabsTab>
        </TabsList>
        <TabsPanel value='members'>
          <Text size={3}>8 members, 2 pending invitations.</Text>
        </TabsPanel>
        <TabsPanel value='roles'>
          <Text size={3}>Admins manage billing; members create projects.</Text>
        </TabsPanel>
        <TabsPanel value='audit'>
          <Text size={3}>Sign-ins and permission changes for the last 12 months.</Text>
        </TabsPanel>
      </Tabs>
      <HelperText id={reasonId}>The audit log is available on the Business plan.</HelperText>
    </div>
  );
}
