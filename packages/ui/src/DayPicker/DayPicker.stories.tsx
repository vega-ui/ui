import { ChangeEvent, FC, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPicker } from './DayPicker';
import {
  DayPickerItem,
  DayPickerLayout,
  DayPickerRow,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
} from './components';
import { createDayPickerGrid } from './helpers';
import { TextField, TextFieldInput } from '../TextField';
import { useIndexedSnapScrollerContext } from '../IndexedSnapScroller';
import { Heading } from '../Heading';
import { getCurrentDate, getNextDate } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPicker> = {
  title: 'Data/DayPicker/DayPicker',
  component: DayPicker,
  args: {
    children: <DayPickerLayout />
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    }
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const MultipleSelection: Story = {
  args: {
    selection: 'multiple'
  },
};

export const MultipleSelected: Story = {
  args: {
    selection: 'multiple',
    selected: [getNextDate(getCurrentDate(), -2).getTime(), getCurrentDate().getTime(), getNextDate(getCurrentDate(), 2).getTime()],
  },
};

export const RangeSelection: Story = {
  args: {
    selection: 'range'
  },
};

export const RangeSelected: Story = {
  args: {
    selection: 'range',
    selected: [getNextDate(getCurrentDate(), -2).getTime(), getCurrentDate().getTime(), getNextDate(getCurrentDate(), 2).getTime()],
  },
};

export const DefaultSingleSelected: Story = {
  args: {
    defaultSelected: getCurrentDate().getTime()
  },
};

export const DefaultMultipleSelected: Story = {
  args: {
    selection: 'multiple',
    defaultSelected: [getNextDate(getCurrentDate(), -2).getTime(), getCurrentDate().getTime(), getNextDate(getCurrentDate(), 2).getTime()],
  },
};

export const DefaultRangeSelected: Story = {
  args: {
    selection: 'range',
    defaultSelected: [getNextDate(getCurrentDate(), -2).getTime(), getCurrentDate().getTime(), getNextDate(getCurrentDate(), 2).getTime()],
  },
};

export const Swipable: Story = {
  args: {
    children: (
      <DayPickerScroller>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout />
        </DayPickerScrollerContent>
      </DayPickerScroller>
    )
  },
};

export const SwipableWithReference: Story = {
  args: {
    children: (
      <DayPickerScroller referenceDate={new Date(2000, 0, 1)}>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout />
        </DayPickerScrollerContent>
      </DayPickerScroller>
    )
  },
};

export const SwipableControlled: Story = {
  render(props) {
    const current = getCurrentDate()
    
    const [year, setYear] = useState(current.getFullYear())
    const [month, setMonth] = useState(current.getMonth())
    
    const formatDateToYYYYMMDD = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    const [date, setDate] = useState(formatDateToYYYYMMDD(current))
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setDate(e.currentTarget.value)
      
      const d = new Date(e.currentTarget.value)
      setYear(d.getFullYear())
      setMonth(d.getMonth())
    }
    const onChangePeriod = (year: number, month: number) => {
      setYear(year)
      setMonth(month)
      
      const d = new Date(date)
      d.setMonth(month)
      d.setFullYear(year)
      
      const formatted = formatDateToYYYYMMDD(d)
      if (formatted.length !== 10) return
      setDate(formatted)
    }

    return (
      <div>
        <TextField>
          <TextFieldInput type='date' value={date} onChange={onChange} />
        </TextField>
        <Heading size={2} as='h3' style={{ marginBlock: 12 }}>
          Year: {year}, Month: {month + 1}
        </Heading>
        <DayPicker year={isNaN(year) ? undefined : year} month={isNaN(month) ? undefined : month} {...props}>
          <DayPickerScroller onChangePeriod={onChangePeriod}>
            <DayPickerScrollerContent>
              <DayPickerScrollerLayout />
            </DayPickerScrollerContent>
          </DayPickerScroller>
        </DayPicker>
      </div>
    )
  }
}

export const Custom: Story = {
  args: {
    children: (
      <>
        {createDayPickerGrid({ year: 2025, month: 10, offset: 0 }).map(({ row, data }) => (
          <DayPickerRow row={row} key={row}>
            {data.map(({ col, day }) => (
              <DayPickerItem col={col} value={day} key={day}>
                {day}
              </DayPickerItem>
            ))}
          </DayPickerRow>
        ))}
      </>
    )
  },
};

const CustomSwipableDayPickerRows: FC = () => {
  const { index } = useIndexedSnapScrollerContext()
  
  return (
    <>
      {createDayPickerGrid({ offset: index }).map(({ row, data }) => (
        <DayPickerRow row={row} key={row}>
          {data.map(({ col, year, inCurrentMonth, month, day }) => (
            <DayPickerItem
              col={col}
              value={day ? new Date(year, month, day).getTime() : undefined}
              excluded={!inCurrentMonth}
              disabled={!inCurrentMonth}
              key={day}
            >
              {day}
            </DayPickerItem>
          ))}
        </DayPickerRow>
      ))}
    </>
  )
}

export const CustomSwipable: Story = {
  args: {
    children: (
      <DayPickerScroller>
        <DayPickerScrollerContent>
          <CustomSwipableDayPickerRows />
        </DayPickerScrollerContent>
      </DayPickerScroller>
    )
  },
};