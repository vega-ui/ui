import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipArrow } from './TooltipArrow';
import { Button } from '../../../Button';
import { TooltipContent } from '../TooltipContent';
import { Tooltip } from '../../Tooltip.tsx';
import { TooltipTrigger } from '../TooltipTrigger';

const meta = {
  title: 'Overlay/Tooltip/TooltipArrow',
  component: TooltipArrow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Open</Button>
        </TooltipTrigger>
        <TooltipContent>
          <Story />
          Tooltip content
        </TooltipContent>
      </Tooltip>
    )
  }
} satisfies Meta<typeof TooltipArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}