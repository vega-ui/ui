import type { Meta, StoryObj } from '@storybook/react';
import { TooltipTrigger } from './TooltipTrigger.tsx';
import { Button } from '../../../Button';
import { TooltipContent } from '../TooltipContent';
import { Tooltip } from '../../Tooltip.tsx';

const meta = {
  title: 'UI-Core/Tooltip/TooltipTrigger',
  component: TooltipTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TooltipTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(props) {
    return (
      <Tooltip>
        <TooltipTrigger {...props} asChild>
          <Button>Open</Button>
        </TooltipTrigger>
        <TooltipContent>
          Tooltip content
        </TooltipContent>
      </Tooltip>
    )
  }
}