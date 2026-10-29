import type { Meta, StoryObj } from '@storybook/react-vite';
import { PopoverBackdrop } from './PopoverBackdrop';
import { Popover } from '../../Popover';
import { PopoverTrigger } from '../PopoverTrigger';
import { PopoverContent } from '../PopoverContent';
import { Button } from '../../../Button';
import { Text } from '../../../Text';

const meta = {
  title: 'Overlay/Popover/PopoverBackdrop',
  component: PopoverBackdrop,
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
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Open popover</Button>
          </PopoverTrigger>
          <Story />
          <PopoverContent>
            <Text>The backdrop dims the page behind the popover.</Text>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
} satisfies Meta<typeof PopoverBackdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}