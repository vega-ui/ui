import type { Meta, StoryObj } from '@storybook/react';
import { PopoverContent } from './PopoverContent.tsx';
import { Text } from '../../../Text';
import { Button } from '../../../Button';
import { PopoverTrigger } from '../PopoverTrigger';
import { Popover } from '../../Popover.tsx';

const meta = {
  title: 'UI-Core/Popover/PopoverContent',
  component: PopoverContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>Popover content</Text>
  },
  render(props) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent {...props} />
      </Popover>
    )
  }
}