import { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPicker } from './DayPicker.tsx';
import {
  DayPickerItem,
  DayPickerLayout,
  DayPickerRow,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout
} from './components';
import { createDayPickerGrid } from './helpers';
import { useDayPickerScrollerContext } from './hooks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPicker> = {
  title: 'Data/Pickers/DayPicker/DayPicker',
  component: DayPicker,
  args: {
    style: { width: 300 },
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

export const RangeSelection: Story = {
  args: {
    selection: 'range'
  },
};

export const Custom: Story = {
  args: {
    style: { width: 500 },
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

export const Swipable: Story = {
  args: {
    style: { width: 300 },
    children: (
      <DayPickerScroller>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout />
        </DayPickerScrollerContent>
      </DayPickerScroller>
    )
  },
};

const CustomSwipableDayPickerRows: FC = () => {
  const { index } = useDayPickerScrollerContext()
  
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
    style: { width: 500 },
    children: (
      <DayPickerScroller>
        <DayPickerScrollerContent>
          <CustomSwipableDayPickerRows />
        </DayPickerScrollerContent>
      </DayPickerScroller>
    )
  },
};