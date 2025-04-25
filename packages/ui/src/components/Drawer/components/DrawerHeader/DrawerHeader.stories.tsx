import type { Meta, StoryObj } from '@storybook/react';
import { DrawerHeader } from './DrawerHeader.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'UI-Core/Drawer/DrawerHeader',
  component: DrawerHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DrawerHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Drawer',
    children: <Text>Drawer content</Text>,
    style: {
      minWidth: '200px'
    }
  },
}