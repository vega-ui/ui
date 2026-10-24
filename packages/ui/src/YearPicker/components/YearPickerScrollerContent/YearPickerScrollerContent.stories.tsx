import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerScrollerContent } from './YearPickerScrollerContent';
import { YearPickerScrollerLayout } from '../YearPickerScrollerLayout';
import { YearPickerCell } from '../YearPickerCell';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof YearPickerScrollerContent> = {
  title: 'Data/YearPicker/YearPickerScrollerContent',
  component: YearPickerScrollerContent,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <YearPickerScrollerLayout>
        <YearPickerCell />
      </YearPickerScrollerLayout>
    )
  },
};