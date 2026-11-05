import { Heading, Text } from '@vega-ui/react';

export default function DocumentOutline() {
  return (
    <article style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: '60ch' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h1'>Getting started</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Set up your workspace in three steps.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h2'>Invite your team</Heading>
        <Text size={3}>Members get access to every public project.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h3'>Roles and permissions</Heading>
        <Text size={3}>Admins manage billing; editors can create projects.</Text>
      </div>
    </article>
  );
}
