import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPickerLayout } from './MonthPickerLayout';
import { MonthPicker } from '../../MonthPicker';
import { MonthPickerCell } from '../MonthPickerCell';

const meta: Meta<typeof MonthPickerLayout> = {
  title: 'Data/MonthPicker/MonthPickerLayout',
  component: MonthPickerLayout,
  tags: ['autodocs'],
  decorators(Story) {
    return (
      <MonthPicker style={{ width: 300 }}>
        <Story />
      </MonthPicker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <MonthPickerCell />,
  },
};
