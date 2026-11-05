import {
  Button,
  Icon,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { ChevronDown } from '@vega-ui/icons';
import { useState } from 'react';

const triggerFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function MonthFilterInAPopover() {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState('2026-10-01');

  const pick = (next: string) => {
    setMonth(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost' aria-label={`Statement month, ${triggerFormat.format(new Date(month))}`}>
          {triggerFormat.format(new Date(month))}
          <Icon size='sm'><ChevronDown /></Icon>
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Choose a statement month'>
        <MonthPicker
          aria-label='Statement month, 2026'
          locale='en-US'
          year='2026-01-01'
          to='2026-10-01'
          selected={month}
          onSelectCell={pick}
        >
          <MonthPickerLayout cols={4} format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      </PopoverContent>
    </Popover>
  );
}
