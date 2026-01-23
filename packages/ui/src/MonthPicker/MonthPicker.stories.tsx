import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';

import { MonthPicker } from './MonthPicker';
import {
  MonthPickerItem,
  MonthPickerLayout,
  MonthPickerRow,
  MonthPickerRowGroup,
} from './components';
import { createMonthPickerGrid } from './helpers';

const meta: Meta<typeof MonthPicker> = {
  title: 'Data/MonthPicker/MonthPicker',
  component: MonthPicker,
  args: {
    style: { width: 300 },
    children: <MonthPickerLayout />,
  },
  argTypes: {
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSingle: Story = {
  args: {
    selection: 'single',
  },
};

export const MultipleSelection: Story = {
  args: {
    selection: 'multiple',
  },
};

export const RangeSelection: Story = {
  args: {
    selection: 'range',
  },
};

export const RangeWithBounds: Story = {
  args: {
    selection: 'range',
    from: 2,
    to: 8,
    children: (
      <MonthPickerLayout rows={4} cols={3} start={0} />
    ),
  },
};

export const DenseXsPrimary: Story = {
  args: {
    selection: 'single',
    size: 'xs',
    variant: 'primary',
    style: { width: 260 },
    children: (
      <MonthPickerLayout rows={4} cols={3} start={0} />
    ),
  },
};

export const LargeXlSecondary: Story = {
  args: {
    selection: 'single',
    size: 'xl',
    variant: 'secondary',
    style: { width: 360 },
    children: (
      <MonthPickerLayout rows={3} cols={4} start={0} />
    ),
  },
};

const getSeasonLabel = (month: number): string => {
  if (month === 11 || month === 0 || month === 1) return 'Winter';
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  return 'Autumn';
};

export const CustomWithLabels: Story = {
  args: {
    style: { width: 420 },
    selection: 'single',
  },
  render: (props) => {
    const rows = 4;
    const cols = 3;
    const grid = createMonthPickerGrid({ start: 0, rows, cols });
    
    return (
      <MonthPicker {...props}>
        <MonthPickerRowGroup>
          {grid.map(({ row, data }) => (
            <MonthPickerRow row={row} key={row}>
              {data.map(({ col, month }) => (
                <MonthPickerItem
                  col={col}
                  value={month}
                  key={month}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: 6,
                  }}
                >
                  <span style={{ fontWeight: 500 }}>
                    {new Date(new Date().getFullYear(), month, 1).toLocaleString(
                      navigator.language,
                      { month: 'long' }
                    )}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--color-gray-accent-600)',
                      textAlign: 'center',
                    }}
                  >
                    {getSeasonLabel(month)}
                  </span>
                </MonthPickerItem>
              ))}
            </MonthPickerRow>
          ))}
        </MonthPickerRowGroup>
      </MonthPicker>
    );
  },
};

const CustomGridLayout: FC<{ start: number; rows: number; cols: number }> = ({
 start,
 rows,
 cols,
}) => (
  <>
    {createMonthPickerGrid({ start, rows, cols }).map(({ row, data }) => (
      <MonthPickerRow row={row} key={row}>
        {data.map(({ col, month }) => (
          <MonthPickerItem col={col} value={month} key={month}>
            {new Date(new Date().getFullYear(), month, 1).toLocaleString(
              navigator.language,
              { month: 'short' }
            )}
          </MonthPickerItem>
        ))}
      </MonthPickerRow>
    ))}
  </>
);

export const CustomLayout: Story = {
  args: {
    style: { width: 400 },
  },
  render: (props) => (
    <MonthPicker {...props}>
      <CustomGridLayout start={0} rows={3} cols={4} />
    </MonthPicker>
  ),
};