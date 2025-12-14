import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionIcon } from './AccordionIcon.tsx';
import { Plus } from '@vega-ui/icons';

const meta = {
  title: 'Actions/Accordion/AccordionIcon',
  component: AccordionIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AccordionIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}

export const CustomIcon: Story = {
  args: {
    children: <Plus />
  },
}