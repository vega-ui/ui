import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridPickerItem } from './DataGridPickerItem';
import { Text } from '../../../Text'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridPickerItem> = {
  title: 'Data/DataGridPicker/DataGridPickerItem',
  component: DataGridPickerItem,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    }
  }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Text size={2}>1</Text>,
    asChild: false,
  },
};