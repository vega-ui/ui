import { Code, Text } from '@vega-ui/react';

export default function MixedProseAndCode() {
  return (
    <Text asChild size={3}>
      <p style={{ maxWidth: '60ch' }}>
        The form sends the selected plan as <Code>plan_id</Code>. Read it on the server with{' '}
        <Code>formData.get('plan_id')</Code>; an empty value means the user kept the free tier.
      </p>
    </Text>
  );
}
