import { Code, Heading, Text } from '@vega-ui/react';

export default function InlineCodeToken() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <Text size={2}>
        Default size inside small text: <Code>workspace_slug</Code>
      </Text>
      <Text size={2}>
        Matched to the text: <Code size={2}>workspace_slug</Code>
      </Text>
      <Heading as='h3' size={6}>
        The <Code size={6}>useListbox</Code> hook
      </Heading>
    </div>
  );
}
