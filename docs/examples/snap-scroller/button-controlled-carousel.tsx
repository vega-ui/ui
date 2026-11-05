import {
  Icon,
  IconButton,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef, useState, type CSSProperties } from 'react';

const products = [
  { name: 'Trail runner 2', price: '$129' },
  { name: 'Merino crew socks', price: '$18' },
  { name: 'Packable rain shell', price: '$149' },
  { name: 'Insulated bottle, 750 ml', price: '$34' },
  { name: 'Running belt', price: '$22' },
];

const cardStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-2)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function ButtonControlledCarousel() {
  const api = useRef<SnapScrollerApiRef>(null);
  const [current, setCurrent] = useState(0);
  const isFirst = current === 0;
  const isLast = current === products.length - 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <IconButton
        aria-label='Previous product'
        variant='secondary'
        appearance='ghost'
        disabled={isFirst}
        onClick={() => api.current?.prev()}
      >
        <Icon><ChevronLeft /></Icon>
      </IconButton>
      <SnapScroller
        apiRef={api}
        tabIndex={0}
        aria-label='Recently viewed'
        onScrollSnapChange={(_, index) => setCurrent(index)}
        style={{ flex: 1, minWidth: 0, gap: 'var(--spacing-6)' }}
      >
        {products.map((product, index) => (
          <SnapScrollerContent key={product.name} index={index} style={cardStyle}>
            <Text size={3} fontWeight={500}>{product.name}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{product.price}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <IconButton
        aria-label='Next product'
        variant='secondary'
        appearance='ghost'
        disabled={isLast}
        onClick={() => api.current?.next()}
      >
        <Icon><ChevronRight /></Icon>
      </IconButton>
    </div>
  );
}
