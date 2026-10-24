import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';
import { DayPickerCell } from './DayPickerCell';
import { DayPicker } from '../../DayPicker';
import { DayPickerLayout } from '../DayPickerLayout';
import { useDayPickerCellContext } from '../../contexts';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';

const meta: Meta<typeof DayPickerCell> = {
  title: 'Data/DayPicker/DayPickerCell',
  component: DayPickerCell,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  decorators(Story) {
    return (
      <DayPicker>
        <DayPickerLayout>
          <Story />
        </DayPickerLayout>
      </DayPicker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The cell takes its day, column and label from the layout it is placed in.
 */
export const Default: Story = {
  args: {},
};

const today = formatISODate(getCurrentDate());

const MarkedDay: FC = () => {
  const { label, date } = useDayPickerCellContext();

  if (date !== today) return <DayPickerCell />;

  return (
    <DayPickerCell style={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 'min-content', paddingBlock: 4 }}>
      <span>{label}</span>
      <span style={{ fontSize: 10 }}>today</span>
    </DayPickerCell>
  );
};

/**
 * Children replace the label. Read the day with `useDayPickerCellContext()`
 * to build custom content; here today is marked.
 */
export const CustomContent: Story = {
  render: () => <MarkedDay />,
};
