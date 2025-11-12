import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaginationFirstTrigger } from './PaginationFirstTrigger.tsx';
import { Tooltip } from '../../../Tooltip';
import { TooltipContent, TooltipTrigger } from '../../../Tooltip';
 
const meta = {
  title: 'Navigation/Pagination/PaginationFirstTrigger',
  component: PaginationFirstTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    size: 'md',
  },
} satisfies Meta<typeof PaginationFirstTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithTooltip: Story = {
  render(props) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <PaginationFirstTrigger {...props} />
        </TooltipTrigger>
        <TooltipContent>Go to the first page</TooltipContent>
      </Tooltip>
    )
  }
}