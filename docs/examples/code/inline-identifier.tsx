import { Code, Text } from '@vega-ui/react';

const variables = [
  { name: 'DATABASE_URL', description: 'Postgres connection string for the primary database.' },
  { name: 'SENTRY_DSN', description: 'Error reporting endpoint. Leave empty to disable reporting.' },
  { name: 'VEGA_THEME', description: 'Forces the initial theme: light or dark.' },
];

export default function InlineIdentifier() {
  return (
    <dl style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', margin: 0 }}>
      {variables.map((variable) => (
        <div key={variable.name} style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <dt><Code size={2}>{variable.name}</Code></dt>
          <Text asChild size={2} style={{ color: 'var(--label-secondary)' }}>
            <dd style={{ margin: 0 }}>{variable.description}</dd>
          </Text>
        </div>
      ))}
    </dl>
  );
}
