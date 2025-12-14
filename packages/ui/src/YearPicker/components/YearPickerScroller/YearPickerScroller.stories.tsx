import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerScroller } from './YearPickerScroller.tsx';
import { YearPickerScrollerContent } from '../YearPickerScrollerContent';
import { YearPickerScrollerLayout } from '../YearPickerScrollerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof YearPickerScroller> = {
  title: 'Data/Pickers/YearPicker/YearPickerScroller',
  component: YearPickerScroller,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <YearPickerScrollerContent>
        <YearPickerScrollerLayout />
      </YearPickerScrollerContent>
    )
  },
};