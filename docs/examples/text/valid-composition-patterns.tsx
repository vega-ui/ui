import { Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Text asChild size={3}>
      <p>
        Order <Text fontWeight={700}>#4821</Text> ships on{' '}
        <Text asChild>
          <time dateTime='2026-03-14'>March 14</time>
        </Text>
        .
      </p>
    </Text>
  );
}
