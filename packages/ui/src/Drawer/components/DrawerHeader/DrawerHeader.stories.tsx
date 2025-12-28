import type { Meta, StoryObj } from '@storybook/react-vite';
import { DrawerHeader } from './DrawerHeader';
import { DrawerTitle } from '../DrawerTitle';
import { DrawerCloseButton } from '../DrawerCloseButton';

const meta = {
  title: 'Overlay/Drawer/DrawerHeader',
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
    children: [
      <DrawerTitle key={0}>Drawer title</DrawerTitle>,
      <DrawerCloseButton key={1} />
    ],
    style: {
      minWidth: '300px'
    }
  },
}