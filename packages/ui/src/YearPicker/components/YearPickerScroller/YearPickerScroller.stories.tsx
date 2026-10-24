import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerScroller } from './YearPickerScroller';
import { YearPickerScrollerContent } from '../YearPickerScrollerContent';
import { YearPickerScrollerLayout } from '../YearPickerScrollerLayout';
import { YearPickerCell } from '../YearPickerCell';

const meta: Meta<typeof YearPickerScroller> = {
  title: 'Data/YearPicker/YearPickerScroller',
  component: YearPickerScroller,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <YearPickerScrollerContent>
        <YearPickerScrollerLayout>
          <YearPickerCell />
        </YearPickerScrollerLayout>
      </YearPickerScrollerContent>
    ),
  },
};

export const WithDefaultYear: Story = {
  args: {
    defaultYear: '2000-01-01',
    children: (
      <YearPickerScrollerContent>
        <YearPickerScrollerLayout>
          <YearPickerCell />
        </YearPickerScrollerLayout>
      </YearPickerScrollerContent>
    ),
  },
};
