import { useState } from 'react';
import { Button, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

const steps = [
  { value: 'shipping', label: 'Shipping', text: 'Deliver to 14 Harbour Street, Lisbon, by courier in 2–3 days.' },
  { value: 'payment', label: 'Payment', text: 'Pay with the Visa card ending in 4242.' },
  { value: 'review', label: 'Review', text: 'Two items, €148.00 including VAT and delivery.' },
];

export default function ControlledSteps() {
  const [step, setStep] = useState('shipping');
  const position = steps.findIndex((item) => item.value === step);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 480 }}>
      <Tabs value={step} onChangeValue={setStep}>
        <TabsList aria-label='Checkout'>
          {steps.map((item) => <TabsTab key={item.value} value={item.value}>{item.label}</TabsTab>)}
        </TabsList>
        {steps.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <Text size={3}>{item.text}</Text>
          </TabsPanel>
        ))}
      </Tabs>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Step {position + 1} of {steps.length}</Text>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button size='sm' variant='secondary' appearance='ghost' disabled={position === 0} onClick={() => setStep(steps[position - 1].value)}>Back</Button>
          <Button size='sm' disabled={position === steps.length - 1} onClick={() => setStep(steps[position + 1].value)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
