import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerLayout } from './DayPickerLayout';
import { DayPicker } from '../../DayPicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPickerLayout> = {
  title: 'Data/DayPicker/DayPickerLayout',
  component: DayPickerLayout,
  tags: ['autodocs'],
  decorators(Story) {
    return (
      <DayPicker size='xs'>
        <Story />
      </DayPicker>
    )
  }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};