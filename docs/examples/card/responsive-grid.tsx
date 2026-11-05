import { Button, Card, Heading, Text } from '@vega-ui/react';

const integrations = [
  { id: 'slack', name: 'Slack', description: 'Post deployment and incident updates to channels.' },
  { id: 'github', name: 'GitHub', description: 'Link pull requests to releases and show build status on every commit, including drafts and forks.' },
  { id: 'pagerduty', name: 'PagerDuty Incident Response Orchestration', description: 'Page the on-call engineer.' },
];

export default function ResponsiveGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 'var(--spacing-6)', width: '100%' }}>
      {integrations.map((integration) => (
        <Card key={integration.id} size='sm' aria-labelledby={`integration-${integration.id}`} style={{ gap: 'var(--spacing-4)' }}>
          <Heading id={`integration-${integration.id}`} as='h3' size={3} fontWeight={600}>{integration.name}</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>{integration.description}</Text>
          <Button size='sm' variant='secondary' appearance='ghost' aria-describedby={`integration-${integration.id}`} style={{ marginBlockStart: 'auto' }}>
            Connect
          </Button>
        </Card>
      ))}
    </div>
  );
}
