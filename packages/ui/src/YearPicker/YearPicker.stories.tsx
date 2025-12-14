import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';

import { YearPicker } from './YearPicker.tsx';
import {
  YearPickerItem,
  YearPickerLayout,
  YearPickerRow, YearPickerRowGroup,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from './components';
import { createYearPickerGrid } from './helpers';
import { useYearPickerScrollerContext } from './hooks';

const meta: Meta<typeof YearPicker> = {
  title: 'Data/Pickers/YearPicker/YearPicker',
  component: YearPicker,
  args: {
    style: { width: 300 },
    children: <YearPickerLayout />,
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

const currentYear = new Date().getFullYear();

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
    from: currentYear - 2,
    to: currentYear + 2,
    children: (
      <YearPickerLayout rows={4} cols={3} start={currentYear - 6} />
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
      <YearPickerLayout rows={5} cols={4} start={currentYear - 10} />
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
      <YearPickerLayout rows={3} cols={4} start={currentYear - 4} />
    ),
  },
};

export const CustomWithLabels: Story = {
  args: {
    style: { width: 420 },
    selection: 'single',
  },
  render: (props) => {
    const labels = [
      'Year of the Tiger',
      'Year of the Rabbit',
      'Year of the Dragon',
      'Year of the Snake',
      'Year of the Horse',
      'Year of the Goat',
    ];
    
    const getLabel = (year: number) =>
      labels[Math.abs(year) % labels.length];
    
    const start = 2025;
    const rows = 4;
    const cols = 3;
    const grid = createYearPickerGrid({ start, rows, cols, offset: 0 });
    
    return (
      <YearPicker {...props}>
        <YearPickerRowGroup>
          {grid.map(({ row, data }) => (
            <YearPickerRow row={row} key={row}>
              {data.map(({ col, year }) => (
                <YearPickerItem
                  col={col}
                  value={year}
                  key={year}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: 6,
                  }}
                >
                  <span style={{ fontWeight: 500 }}>
                    {year}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--color-gray-accent-600)',
                      textAlign: 'center',
                    }}
                  >
                    {getLabel(year)}
                  </span>
                </YearPickerItem>
              ))}
            </YearPickerRow>
          ))}
        </YearPickerRowGroup>
      </YearPicker>
    );
  },
};

const CustomGridLayout: FC<{ start: number; rows: number; cols: number }> = ({
 start,
 rows,
 cols,
}) => (
  <>
    {createYearPickerGrid({ start, rows, cols, offset: 0 }).map(({ row, data }) => (
      <YearPickerRow row={row} key={row}>
        {data.map(({ col, year }) => (
          <YearPickerItem col={col} value={year} key={year}>
            {year}
          </YearPickerItem>
        ))}
      </YearPickerRow>
    ))}
  </>
);

export const CustomLayout: Story = {
  args: {
    style: { width: 400 },
  },
  render: (props) => (
    <YearPicker {...props}>
      <CustomGridLayout start={currentYear - 12} rows={5} cols={5} />
    </YearPicker>
  ),
};

export const Swipable: Story = {
  args: {
    selection: 'range',
    style: { width: 320 },
  },
  render: (props) => (
    <YearPicker {...props}>
      <YearPickerScroller>
        <YearPickerScrollerContent>
          <YearPickerScrollerLayout rows={4} cols={3} start={currentYear} />
        </YearPickerScrollerContent>
      </YearPickerScroller>
    </YearPicker>
  ),
};

const CustomSwipableYearPickerRows: FC = () => {
  const { index } = useYearPickerScrollerContext();
  
  return (
    <>
      {createYearPickerGrid({ start: currentYear, rows: 4, cols: 3, offset: index }).map(
        ({ row, data }) => (
          <YearPickerRow row={row} key={row}>
            {data.map(({ col, year }) => (
              <YearPickerItem
                col={col}
                value={year}
                key={year}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span>{year}</span>
              </YearPickerItem>
            ))}
          </YearPickerRow>
        )
      )}
    </>
  );
};

export const SwipableCustomLayout: Story = {
  args: {
    selection: 'range',
    style: { width: 360 },
  },
  render: (props) => (
    <YearPicker {...props}>
      <YearPickerScroller>
        <YearPickerScrollerContent>
          <CustomSwipableYearPickerRows />
        </YearPickerScrollerContent>
      </YearPickerScroller>
    </YearPicker>
  ),
};
