import {
  Button,
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';
import { useState } from 'react';

const currentYear = new Date().getFullYear();
const monthNames = Array.from({ length: 12 }, (_, month) => (
  new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(2000, month, 1))
));

interface Selection {
  year: number
  month: number
}

interface YearPageProps {
  selected: Selection
  onSelect(value: Selection): void
}

function YearPage({ selected, onSelect }: YearPageProps) {
  const { index } = useIndexedSnapScrollerContext();
  const year = currentYear + index;

  return (
    <IndexedSnapScrollerContent
      role='group'
      aria-label={String(year)}
      style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}
    >
      <Text size={3} fontWeight={500} style={{ paddingInlineStart: 'var(--spacing-2)' }}>{year}</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 'var(--spacing-2)' }}>
        {monthNames.map((name, month) => {
          const isSelected = selected.year === year && selected.month === month;

          return (
            <Button
              key={name}
              size='sm'
              variant={isSelected ? 'primary' : 'secondary'}
              appearance={isSelected ? 'fill' : 'ghost'}
              aria-pressed={isSelected}
              onClick={() => onSelect({ year, month })}
              style={{ width: '100%', paddingInline: 0 }}
            >
              {name}
            </Button>
          );
        })}
      </div>
    </IndexedSnapScrollerContent>
  );
}

export default function MonthPickerInPopover() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Selection>({ year: currentYear, month: new Date().getMonth() });

  const select = (value: Selection) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>
          Billing month: {monthNames[selected.month]} {selected.year}
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Choose billing month' style={{ width: 260, padding: 'var(--spacing-6)', boxSizing: 'border-box' }}>
        <IndexedSnapScroller
          defaultIndex={selected.year - currentYear}
          tabIndex={0}
          aria-label='Years'
          style={{ gap: 'var(--spacing-6)' }}
        >
          <YearPage selected={selected} onSelect={select} />
        </IndexedSnapScroller>
      </PopoverContent>
    </Popover>
  );
}
