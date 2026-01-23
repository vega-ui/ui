import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChangeEvent, FC, useState } from 'react';

import { YearPicker } from './YearPicker';
import {
  YearPickerItem,
  YearPickerLayout,
  YearPickerRow, YearPickerRowGroup,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from './components';
import { createYearPickerGrid, getIndexByYear } from './helpers';
import { useIndexedSnapScrollerContext } from '../IndexedSnapScroller';
import { Separator } from '../Separator';
import { NumberField, NumberFieldDecrementButton, NumberFieldIncrementButton, NumberFieldInput } from '../NumberField';
import { getCurrentDate } from '@vega-ui/utils';
import { useYearPickerScrollerContext } from './contexts';

const meta: Meta<typeof YearPicker> = {
  title: 'Data/YearPicker/YearPicker',
  component: YearPicker,
  args: {
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

export const SingleSelection: Story = {
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

export const From: Story = {
  args: {
    from: 2030,
    defaultActive: 2030,
  },
};

export const To: Story = {
  args: {
    to: 2030,
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
    children: (
      <YearPickerLayout rows={3} cols={4} start={currentYear - 4} />
    ),
  },
};

export const CustomWithLabels: Story = {
  args: {
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
  render: (props) => (
    <YearPicker {...props}>
      <CustomGridLayout start={currentYear - 12} rows={5} cols={5} />
    </YearPicker>
  ),
};

export const Swipable: Story = {
  args: {
    selection: 'range',
  },
  render: (props) => (
    <YearPicker {...props}>
      <YearPickerScroller>
        <YearPickerScrollerContent>
          <YearPickerScrollerLayout />
        </YearPickerScrollerContent>
      </YearPickerScroller>
    </YearPicker>
  ),
};

export const SwipableControlled: Story = {
  args: {
    selection: 'single',
  },
  render: (props) => {
    const [year, setYear] = useState(getCurrentDate().getFullYear())
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const year = Number(e.currentTarget.value.replace(/\s/i, ''))
      if (isNaN(year)) return
      setYear(year)
    }
    
    return (
      <div>
        <NumberField>
          <NumberFieldDecrementButton />
          <NumberFieldInput min={0} onChange={onChange} />
          <NumberFieldIncrementButton />
        </NumberField>
        <Separator style={{ marginBlock: 12 }} />
        <YearPicker year={year} {...props}>
          <YearPickerScroller>
            <YearPickerScrollerContent>
              <YearPickerScrollerLayout rows={4} cols={3} />
            </YearPickerScrollerContent>
          </YearPickerScroller>
        </YearPicker>
      </div>
    )
  },
};

const CustomSwipableYearPickerRows: FC = () => {
  const { index } = useIndexedSnapScrollerContext();
  const { referenceYear } = useYearPickerScrollerContext()
  
  return (
    <>
      {createYearPickerGrid({ start: referenceYear, rows: 10, cols: 4, offset: index }).map(
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

/**
 * SwipableControlledCustomLayout
 *
 * Demonstrates a fully controlled `YearPicker` configuration with
 * a custom, non-standard year layout and swipe-based navigation.
 *
 * In this example, the year grid does not follow the default layout
 * (e.g. 3×4 = 12 years per page). Instead, it renders a custom layout
 * of 4×10 = 40 years per page.
 *
 * Because the number and structure of years per page differs from the
 * default implementation (and may even vary between pages), the
 * `YearPickerScroller` cannot infer how a calendar year maps to a
 * scroller index on its own.
 *
 * To resolve this, a custom `getIndexByYear` function is explicitly
 * provided. This function maps a calendar year to the corresponding
 * scroller page index relative to the `referenceYear`.
 *
 * ### Key points
 *
 * - The `YearPicker` is **controlled** via the `year` prop.
 * - The year value is updated through an external `NumberField`.
 * - A **custom swipeable year layout** (`CustomSwipableYearPickerRows`)
 *   is rendered inside `YearPickerScrollerContent`.
 * - A custom `getIndexByYear` implementation is required whenever:
 *   - the year grid size is non-standard (e.g. 4×10 = 40),
 *   - the number of years per page differs from the default,
 *   - or the grouping of years is variable or non-contiguous.
 *
 * ### `getIndexByYear`
 *
 * The `getIndexByYear` function is responsible for answering the question:
 *
 * > “On which scroller page does this year belong?”
 *
 * It receives:
 * - `referenceYear` — the logical origin of the timeline
 * - `year` — the calendar year to resolve
 *
 * It must return the scroller page index that contains the given year.
 *
 * ```ts
 * (referenceYear: number, year: number) => number
 * ```
 *
 * The function can be:
 * - **implemented inline**, as shown in this example, or
 * - **imported from a shared helper**, such as the built-in
 *   `getIndexByYear` utility, when the layout follows a predictable rule
 *   (e.g. fixed-size pages).
 *
 * ### Notes
 *
 * - When using the default year layout (3×4 = 12 years),
 *   providing `getIndexByYear` is optional.
 * - For any custom or variable layout, `getIndexByYear` becomes mandatory
 *   to keep the scroller, layout, and controlled `year` state in sync.
 *
 * This pattern ensures that `YearPickerScroller` remains layout-agnostic
 * while still supporting fully customized year grids.
 */
export const SwipableControlledCustomLayout: Story = {
  args: {
    selection: 'range',
  },
  render: (props) => {
    const [year, setYear] = useState(getCurrentDate().getFullYear())
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const year = Number(e.currentTarget.value.replace(/\s/i, ''))
      if (isNaN(year)) return
      setYear(year)
    }
    
    return (
      <div>
        <NumberField>
          <NumberFieldDecrementButton />
          <NumberFieldInput min={0} onChange={onChange} />
          <NumberFieldIncrementButton />
        </NumberField>
        <Separator style={{ marginBlock: 12 }} />
        <YearPicker year={year} {...props}>
          <YearPickerScroller getIndexByYear={(referenceYear, year) => getIndexByYear(referenceYear, year, 40)}>
            <YearPickerScrollerContent>
              <CustomSwipableYearPickerRows />
            </YearPickerScrollerContent>
          </YearPickerScroller>
        </YearPicker>
      </div>
    )
  },
};
