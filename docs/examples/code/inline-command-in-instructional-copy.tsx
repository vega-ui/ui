import { Code, Text } from '@vega-ui/react';

export default function InlineCommandInInstructionalCopy() {
  return (
    <Text asChild size={3}>
      <p style={{ maxWidth: '60ch' }}>
        If the dev server fails to start, delete <Code>node_modules</Code>, run <Code>pnpm install</Code> and try
        again.
      </p>
    </Text>
  );
}
