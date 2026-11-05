import {
  Button,
  HelperText,
  Icon,
  IconButton,
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef, useState, type FormEvent } from 'react';

const today = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const daysSinceMonday = (today.getDay() + 6) % 7;
const weekdayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const fullDateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

function toIsoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

interface WeekPageProps {
  selected: string
  onSelect(value: string): void
}

function WeekPage({ selected, onSelect }: WeekPageProps) {
  const { index } = useIndexedSnapScrollerContext();
  const days = Array.from({ length: 7 }, (_, day) => (
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceMonday + index * 7 + day)
  ));

  return (
    <IndexedSnapScrollerContent
      style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 'var(--spacing-2)', width: '100%' }}
    >
      {days.map((day) => {
        const value = toIsoDate(day);
        const isSelected = value === selected;
        const isUnavailable = day < todayStart || day.getDay() === 0;

        return (
          <div key={value} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-2)' }}>
            <Text size={1} aria-hidden style={{ color: 'var(--label-secondary)' }}>{weekdayFormat.format(day)}</Text>
            <Button
              type='button'
              size='sm'
              variant={isSelected ? 'primary' : 'secondary'}
              appearance={isSelected ? 'fill' : 'ghost'}
              aria-label={fullDateFormat.format(day)}
              aria-pressed={isSelected}
              disabled={isUnavailable}
              onClick={() => onSelect(value)}
              style={{ width: '100%', paddingInline: 0, fontVariantNumeric: 'tabular-nums' }}
            >
              {day.getDate()}
            </Button>
          </div>
        );
      })}
    </IndexedSnapScrollerContent>
  );
}

export default function WeekStripForm() {
  const api = useRef<IndexedSnapScrollerApiRef>(null);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const select = (value: string) => {
    setSelected(value);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const deliveryDate = data.get('deliveryDate');

    if (!deliveryDate) {
      setError('Choose a delivery day. Sundays are not available.');
      return;
    }

    setResult(`Delivery booked for ${deliveryDate}.`);
  };

  const onReset = () => {
    setSelected('');
    setError('');
    setResult('');
    api.current?.setIndexTo(0);
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text id='delivery-day-label' size={3} fontWeight={500} style={{ flex: 1 }}>Delivery day</Text>
        <IconButton aria-label='Previous week' variant='secondary' appearance='ghost' onClick={() => api.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <IconButton aria-label='Next week' variant='secondary' appearance='ghost' onClick={() => api.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <div
        role='group'
        aria-labelledby='delivery-day-label'
        aria-describedby={error ? 'delivery-day-error' : undefined}
      >
        <IndexedSnapScroller apiRef={api} defaultIndex={0} style={{ gap: 'var(--spacing-6)' }}>
          <WeekPage selected={selected} onSelect={select} />
        </IndexedSnapScroller>
      </div>
      <input type='hidden' name='deliveryDate' value={selected} />
      {error && <HelperText id='delivery-day-error' error>{error}</HelperText>}
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Book delivery</Button>
        </div>
        {result && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{result}</Text>}
      </div>
    </form>
  );
}
