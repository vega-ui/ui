import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerScrollerLayout } from './DayPickerScrollerLayout';
import { DayPicker } from '../../DayPicker';
import { DayPickerScroller } from '../DayPickerScroller';
import { DayPickerScrollerContent } from '../DayPickerScrollerContent';
import { DayPickerCell } from '../DayPickerCell';

const meta: Meta<typeof DayPickerScrollerLayout> = {
  title: 'Data/DayPicker/DayPickerScrollerLayout',
  component: DayPickerScrollerLayout,
  tags: ['autodocs'],
  decorators(Story) {
    return (
      <DayPicker>
        <DayPickerScroller>
          <DayPickerScrollerContent>
            <Story />
          </DayPickerScrollerContent>
        </DayPickerScroller>
      </DayPicker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <DayPickerCell />,
  },
};
