import {
  Icon,
  IconButton,
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef } from 'react';

const today = new Date();
const monthFormat = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric' });

function MonthPage() {
  const { index } = useIndexedSnapScrollerContext();
  const month = new Date(today.getFullYear(), today.getMonth() + index, 1);

  return (
    <IndexedSnapScrollerContent
      style={{
        width: '100%',
        padding: 'var(--spacing-10)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-4)',
        background: 'var(--fills-secondary)',
      }}
    >
      <Text size={4}>{monthFormat.format(month)}</Text>
    </IndexedSnapScrollerContent>
  );
}

export default function RtlMonths() {
  const api = useRef<IndexedSnapScrollerApiRef>(null);

  return (
    <div dir='rtl' lang='ar' style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <IndexedSnapScroller
        apiRef={api}
        defaultIndex={0}
        tabIndex={0}
        aria-label='الأشهر'
        style={{ gap: 'var(--spacing-6)' }}
      >
        <MonthPage />
      </IndexedSnapScroller>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='الشهر السابق' variant='secondary' appearance='ghost' onClick={() => api.current?.prev()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
        <IconButton aria-label='الشهر التالي' variant='secondary' appearance='ghost' onClick={() => api.current?.next()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
      </div>
    </div>
  );
}
