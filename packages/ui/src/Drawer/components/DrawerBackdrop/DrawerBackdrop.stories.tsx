import type { Meta, StoryObj } from '@storybook/react-vite';
import { DrawerBackdrop } from './DrawerBackdrop';

const meta = {
  title: 'Overlay/Drawer/DrawerBackdrop',
  component: DrawerBackdrop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    lockScroll: false,
  },
  decorators(Story) {
    return (
      <div style={{ width: 1000, height: 300 }}>
        <Story />
      </div>
    )
  }
} satisfies Meta<typeof DrawerBackdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}