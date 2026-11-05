import { Code, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Text asChild size={3}>
      <p>
        Run <Code>pnpm dev</Code> and open <Code>localhost:3000</Code> in your browser.
      </p>
    </Text>
  );
}
