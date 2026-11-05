import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';

const today = new Date();
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

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
      {monthFormat.format(month)}
    </IndexedSnapScrollerContent>
  );
}

export default function MinimalComposition() {
  return (
    <IndexedSnapScroller
      defaultIndex={0}
      tabIndex={0}
      aria-label='Months'
      style={{ width: '100%', gap: 'var(--spacing-6)' }}
    >
      <MonthPage />
    </IndexedSnapScroller>
  );
}
