import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerScrollerContent } from './YearPickerScrollerContent';
import { YearPicker } from '../../YearPicker';
import { YearPickerScroller } from '../YearPickerScroller';
import { YearPickerScrollerLayout } from '../YearPickerScrollerLayout';
import { YearPickerCell } from '../YearPickerCell';

const meta: Meta<typeof YearPickerScrollerContent> = {
  title: 'Data/YearPicker/YearPickerScrollerContent',
  component: YearPickerScrollerContent,
  tags: ['autodocs'],
  decorators(Story) {
    return (
      <YearPicker>
        <YearPickerScroller>
          <Story />
        </YearPickerScroller>
      </YearPicker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <YearPickerScrollerLayout>
        <YearPickerCell />
      </YearPickerScrollerLayout>
    ),
  },
};
