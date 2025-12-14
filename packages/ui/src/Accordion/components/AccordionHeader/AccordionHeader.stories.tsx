import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionHeader } from './AccordionHeader.tsx';
import { AccordionTrigger } from '../AccordionTrigger';

const meta = {
  title: 'Actions/Accordion/AccordionHeader',
  component: AccordionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AccordionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <AccordionTrigger>
        Open
      </AccordionTrigger>
    )
  },
}