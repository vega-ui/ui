import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';
import { MonthPickerCell } from './MonthPickerCell';
import { MonthPicker } from '../../MonthPicker';
import { MonthPickerLayout } from '../MonthPickerLayout';
import { useMonthPickerCellContext } from '../../contexts';

const meta: Meta<typeof MonthPickerCell> = {
  title: 'Data/MonthPicker/MonthPickerCell',
  component: MonthPickerCell,
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
      <MonthPicker style={{ width: 300 }}>
        <MonthPickerLayout>
          <Story />
        </MonthPickerLayout>
      </MonthPicker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The cell takes its month, column and label from the layout it is placed in.
 */
export const Default: Story = {
  args: {},
};

const NumberedMonth: FC = () => {
  const { label, fields } = useMonthPickerCellContext();

  return (
    <MonthPickerCell style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBlock: 6 }}>
      <span>{label}</span>
      <span style={{ fontSize: 12, color: 'var(--color-gray-accent-600)' }}>{fields?.month}</span>
    </MonthPickerCell>
  );
};

/**
 * Children replace the label. Read the month with
 * `useMonthPickerCellContext()` to build custom content; here every month
 * also shows its number.
 */
export const CustomContent: Story = {
  render: () => <NumberedMonth />,
};
