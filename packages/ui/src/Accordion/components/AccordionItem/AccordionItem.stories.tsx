import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionItem } from './AccordionItem';
import { Text } from '../../../Text';
import { AccordionTrigger } from '../AccordionTrigger';
import { AccordionContent } from '../AccordionContent';
import { Accordion } from '../../Accordion';
import { AccordionHeader } from '../AccordionHeader';
import { AccordionIcon } from '../AccordionIcon';

const meta = {
  title: 'Actions/Accordion/AccordionItem',
  component: AccordionItem,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-6037&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: (
      <>
        <AccordionHeader>
          <AccordionTrigger>
            <Text>Open</Text>
            <AccordionIcon />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Hello, World!</Text>
        </AccordionContent>
      </>
    )
  },
  decorators(Story) {
    return (
      <Accordion>
        <Story />
      </Accordion>
    )
  }
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: 'default'
  }
}