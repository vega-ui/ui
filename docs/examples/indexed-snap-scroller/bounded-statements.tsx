import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';
import { useRef, useState, type CSSProperties } from 'react';

const today = new Date();
const accountOpened = new Date(2025, 0, 1);
const firstIndex = (accountOpened.getFullYear() - today.getFullYear()) * 12 + accountOpened.getMonth() - today.getMonth();
const lastIndex = 0;
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

const pageStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-2)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

function StatementPage() {
  const { index } = useIndexedSnapScrollerContext();
  const month = new Date(today.getFullYear(), today.getMonth() + index, 1);

  if (index < firstIndex) {
    return (
      <IndexedSnapScrollerContent style={pageStyle}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Statements start in {monthFormat.format(accountOpened)}.</Text>
      </IndexedSnapScrollerContent>
    );
  }

  if (index > lastIndex) {
    return (
      <IndexedSnapScrollerContent style={pageStyle}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>The next statement is issued on the 1st.</Text>
      </IndexedSnapScrollerContent>
    );
  }

  return (
    <IndexedSnapScrollerContent style={pageStyle}>
      <Text size={3} fontWeight={500}>{monthFormat.format(month)}</Text>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Statement #{index - firstIndex + 1}, PDF, 84 KB</Text>
    </IndexedSnapScrollerContent>
  );
}

export default function BoundedStatements() {
  const api = useRef<IndexedSnapScrollerApiRef>(null);
  const [current, setCurrent] = useState(lastIndex);

  const onSettle = (index: number) => {
    if (index < firstIndex) {
      requestAnimationFrame(() => api.current?.scrollToElementByKey(firstIndex));
      return;
    }

    if (index > lastIndex) {
      requestAnimationFrame(() => api.current?.scrollToElementByKey(lastIndex));
      return;
    }

    setCurrent(index);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <IndexedSnapScroller
        apiRef={api}
        defaultIndex={lastIndex}
        tabIndex={0}
        aria-label='Statements'
        onScrollSnapChange={(_, index) => onSettle(index)}
        style={{ gap: 'var(--spacing-6)' }}
      >
        <StatementPage />
      </IndexedSnapScroller>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        Showing statement {current - firstIndex + 1} of {lastIndex - firstIndex + 1}
      </Text>
    </div>
  );
}
