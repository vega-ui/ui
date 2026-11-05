import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from '@vega-ui/react';

const lines = [
  { label: 'Team plan · 8 seats × $12', amount: '$96.00' },
  { label: 'Extra storage · 200 GB', amount: '$20.00' },
  { label: 'Annual discount −10%', amount: '−$11.60' },
  { label: 'VAT 19%', amount: '$19.84' },
];

export default function PriceBreakdown() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total due today</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$124.24</Text>
      </div>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Price breakdown</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--spacing-4) var(--spacing-8)' }}>
            {lines.map((line) => (
              <div key={line.label} style={{ display: 'contents' }}>
                <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{line.label}</Text></dt>
                <dd style={{ margin: 0, textAlign: 'end' }}><Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{line.amount}</Text></dd>
              </div>
            ))}
          </dl>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
