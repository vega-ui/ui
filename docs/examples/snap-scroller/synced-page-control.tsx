import {
  Heading,
  PageControl,
  PageControlItem,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { useRef, useState, type CSSProperties } from 'react';

const plans = [
  { name: 'Starter', price: '$0', detail: 'Up to 3 projects and 1 GB of storage.' },
  { name: 'Team', price: '$24', detail: 'Unlimited projects, 100 GB of storage and shared workspaces.' },
  { name: 'Business', price: '$79', detail: 'SSO, audit log and priority support.' },
];

const slideStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function SyncedPageControl() {
  const api = useRef<SnapScrollerApiRef>(null);
  const [active, setActive] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <SnapScroller
        apiRef={api}
        tabIndex={0}
        aria-label='Plans'
        onScrollSnapChange={(_, index) => setActive(index)}
        style={{ width: '100%', gap: 'var(--spacing-6)' }}
      >
        {plans.map((plan, index) => (
          <SnapScrollerContent key={plan.name} index={index} style={slideStyle}>
            <Heading as='h3' size={5}>{plan.name}</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{plan.detail}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <PageControl
        active={active}
        aria-label='Choose a plan'
        onChangeActive={(index) => api.current?.scrollToElementByKey(index)}
      >
        {plans.map((plan, index) => (
          <PageControlItem key={plan.name} index={index} aria-label={plan.name} />
        ))}
      </PageControl>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {plans[active].name}: {plans[active].price} per month
      </Text>
    </div>
  );
}
