import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion.tsx';
import { Text } from '../Text';
import { AccordionItem } from './components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Accordion> = {
  title: 'UI-Core/Accordion/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-521&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      [
        <AccordionItem value='1' triggerSlot='Услуги'>
          <Text>Hello</Text>
        </AccordionItem>,
        <AccordionItem value='2' triggerSlot='Услуги'>
          <Text>Hello</Text>
        </AccordionItem>,
        <AccordionItem value='3' triggerSlot='Услуги'>
          <Text>Hello</Text>
        </AccordionItem>
      ]
    )
  },
};

export const Multiple: Story = {
  args: {
    ...Default.args,
    multiple: true,
  },
};

export const DefaultOpened: Story = {
  args: {
    defaultOpened: ['1'],
    children: (
      [
        <AccordionItem value='1' triggerSlot='Услуги'>
          <Text>Hello</Text>
        </AccordionItem>,
        <AccordionItem value='2' triggerSlot='Услуги'>
          <Text>Hello</Text>
        </AccordionItem>,
        <AccordionItem value='3' triggerSlot='Услуги'>
          <Text>Hello</Text>
        </AccordionItem>
      ]
    )
  },
};