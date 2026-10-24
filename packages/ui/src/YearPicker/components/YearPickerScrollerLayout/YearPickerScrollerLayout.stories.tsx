import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerScrollerLayout } from './YearPickerScrollerLayout';
import { YearPicker } from '../../YearPicker';
import { YearPickerScroller } from '../YearPickerScroller';
import { YearPickerScrollerContent } from '../YearPickerScrollerContent';
import { YearPickerCell } from '../YearPickerCell';

const meta: Meta<typeof YearPickerScrollerLayout> = {
  title: 'Data/YearPicker/YearPickerScrollerLayout',
  component: YearPickerScrollerLayout,
  tags: ['autodocs'],
  decorators(Story) {
    return (
      <YearPicker>
        <YearPickerScroller>
          <YearPickerScrollerContent>
            <Story />
          </YearPickerScrollerContent>
        </YearPickerScroller>
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
