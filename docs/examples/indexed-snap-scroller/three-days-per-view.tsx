import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';

const today = new Date();
const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric' });

function ForecastDay() {
  const { index } = useIndexedSnapScrollerContext();
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);
  const temperature = 14 + Math.abs(index * 5) % 9;

  return (
    <IndexedSnapScrollerContent
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--spacing-2)',
        width: 'calc((100% - 2 * var(--spacing-4)) / 3)',
        paddingBlock: 'var(--spacing-8)',
        borderRadius: 'var(--radius-4)',
        background: index === 0 ? 'var(--fills-primary)' : 'var(--fills-secondary)',
      }}
    >
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{index === 0 ? 'Today' : dayFormat.format(day)}</Text>
      <Text size={5} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{temperature}°</Text>
    </IndexedSnapScrollerContent>
  );
}

export default function ThreeDaysPerView() {
  return (
    <IndexedSnapScroller
      defaultIndex={0}
      size={9}
      tabIndex={0}
      aria-label='Forecast'
      style={{ width: '100%', gap: 'var(--spacing-4)' }}
    >
      <ForecastDay />
    </IndexedSnapScroller>
  );
}
