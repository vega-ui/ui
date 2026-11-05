import { Link, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Text size={3} style={{ width: '100%' }}>
      Exports include every invoice from the selected period. Read how we calculate{' '}
      <Link href='/docs/billing/taxes'>VAT for EU customers</Link>{' '}
      before sharing the file with your accountant.
    </Text>
  );
}
