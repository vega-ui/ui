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

const headlines = [
  'افتتاح فرع جديد في دبي',
  'تحديث تطبيق الهاتف متاح الآن',
  'ساعات عمل خاصة خلال العيد',
  'برنامج الولاء يضيف مزايا جديدة',
];

const slideStyle: CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function RtlNavigation() {
  const api = useRef<SnapScrollerApiRef>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div dir='rtl' lang='ar' style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <SnapScroller
        apiRef={api}
        tabIndex={0}
        aria-label='الأخبار'
        onScrollSnapChange={(_, index) => setCurrent(index)}
        style={{ gap: 'var(--spacing-6)' }}
      >
        {headlines.map((headline, index) => (
          <SnapScrollerContent key={headline} index={index} style={slideStyle}>
            <Text size={3}>{headline}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton
          aria-label='السابق'
          variant='secondary'
          appearance='ghost'
          disabled={current === 0}
          onClick={() => api.current?.prev()}
        >
          <Icon><ChevronRight /></Icon>
        </IconButton>
        <Text size={2} dir='ltr' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{current + 1} / {headlines.length}</Text>
        <IconButton
          aria-label='التالي'
          variant='secondary'
          appearance='ghost'
          disabled={current === headlines.length - 1}
          onClick={() => api.current?.next()}
        >
          <Icon><ChevronLeft /></Icon>
        </IconButton>
      </div>
    </div>
  );
}
