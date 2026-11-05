import { Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Text asChild size={3}>
      <p style={{ maxWidth: '60ch' }}>
        Your trial ends in 5 days. Add a payment method to keep your projects, history and integrations.
      </p>
    </Text>
  );
}
