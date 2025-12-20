import type { Meta, StoryObj } from '@storybook/react-vite';
import { DrawerTitle } from './DrawerTitle';

const meta = {
  title: 'Overlay/Drawer/DrawerTitle',
  component: DrawerTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: 'Title'
  },
} satisfies Meta<typeof DrawerTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}