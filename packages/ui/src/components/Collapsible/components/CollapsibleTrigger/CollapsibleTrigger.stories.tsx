import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleTrigger } from './CollapsibleTrigger.tsx';
import { Button } from '../../../Button';

const meta = {
  title: 'UI-Core/Collapsible/CollapsibleTrigger',
  component: CollapsibleTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CollapsibleTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    asChild: true,
    children: <Button style={{ width: '200px' }}>Show</Button>
  }
}