
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableFoot } from './TableFoot';
import { Text } from '../../../Text';

const meta = {
  title: 'Data/Table/TableFoot',
  component: TableFoot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableFoot>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>TableFoot content</Text>
  },
}