import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerScrollerContent } from './DayPickerScrollerContent';
import { DayPicker } from '../../DayPicker';
import { DayPickerScroller } from '../DayPickerScroller';
import { DayPickerScrollerLayout } from '../DayPickerScrollerLayout';
import { DayPickerCell } from '../DayPickerCell';

const meta: Meta<typeof DayPickerScrollerContent> = {
  title: 'Data/DayPicker/DayPickerScrollerContent',
  component: DayPickerScrollerContent,
  tags: ['autodocs'],
  decorators(Story) {
    return (
      <DayPicker>
        <DayPickerScroller>
          <Story />
        </DayPickerScroller>
      </DayPicker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <DayPickerScrollerLayout>
        <DayPickerCell />
      </DayPickerScrollerLayout>
    ),
  },
};
