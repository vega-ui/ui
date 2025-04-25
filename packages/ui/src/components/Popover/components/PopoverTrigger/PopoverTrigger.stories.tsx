import type { Meta, StoryObj } from '@storybook/react';
import { PopoverTrigger } from './PopoverTrigger.tsx';
import { Text } from '../../../Text';
import { Button } from '../../../Button';
import { PopoverContent } from '../PopoverContent';
import { Popover } from '../../Popover.tsx';

const meta = {
  title: 'UI-Core/Popover/PopoverTrigger',
  component: PopoverTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PopoverTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(props) {
    return (
      <Popover>
        <PopoverTrigger {...props} asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Modal content</Text>
        </PopoverContent>
      </Popover>
    )
  }
}