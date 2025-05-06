import type { Meta, StoryObj } from '@storybook/react';
import { AccordionItem } from './AccordionItem.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'UI-Core/Accordion/AccordionItem',
  component: AccordionItem,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-6037&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: 'default',
    triggerSlot: 'Trigger',
  },
  render({ ...props }) {
    return (
      <AccordionItem {...props}>
        <Text>Hello, World!</Text>
      </AccordionItem>
    )
  }
}