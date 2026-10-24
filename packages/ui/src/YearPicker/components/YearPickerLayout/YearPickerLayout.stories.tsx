import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerLayout } from './YearPickerLayout';
import { YearPicker } from '../../YearPicker';
import { YearPickerCell } from '../YearPickerCell';

const meta: Meta<typeof YearPickerLayout> = {
  title: 'Data/YearPicker/YearPickerLayout',
  component: YearPickerLayout,
  tags: ['autodocs'],
  decorators(Story) {
    return (
      <YearPicker>
        <Story />
      </YearPicker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <YearPickerCell />,
  },
};
