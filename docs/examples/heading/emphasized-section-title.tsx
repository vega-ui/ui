import { Heading } from '@vega-ui/react';

export default function EmphasizedSectionTitle() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      <Heading as='h3' size={6} fontWeight={400}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={500}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={700}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={900}>Access control</Heading>
    </div>
  );
}
