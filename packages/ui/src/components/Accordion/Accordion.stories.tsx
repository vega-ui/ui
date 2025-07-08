import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion.tsx';
import { Text } from '../Text';
import { AccordionItem } from './components';
import { AccordionTrigger } from './components/AccordionTrigger';
import { AccordionContent } from './components/AccordionContent';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Accordion> = {
  title: 'Actions/Accordion/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-521&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    }
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
        <AccordionItem key='1' value='1'>
          <AccordionTrigger>
            Hello
          </AccordionTrigger>
          <AccordionContent>
            <Text>Just a content</Text>
          </AccordionContent>
        </AccordionItem>,
        <AccordionItem key='2' value='2'>
          <AccordionTrigger>
            Hello
          </AccordionTrigger>
          <AccordionContent>
            <Text>Just a content</Text>
          </AccordionContent>
        </AccordionItem>,
        <AccordionItem key='3' value='3'>
          <AccordionTrigger>
            Hello
          </AccordionTrigger>
          <AccordionContent>
            <Text>Just a content</Text>
          </AccordionContent>
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
        <AccordionItem key='1' value='1'>
          <AccordionTrigger>
            Hello
          </AccordionTrigger>
          <AccordionContent>
            <Text>Just a content</Text>
          </AccordionContent>
        </AccordionItem>,
        <AccordionItem key='2' value='2'>
          <AccordionTrigger>
            Hello
          </AccordionTrigger>
          <AccordionContent>
            <Text>Just a content</Text>
          </AccordionContent>
        </AccordionItem>,
        <AccordionItem key='3' value='3'>
          <AccordionTrigger>
            Hello
          </AccordionTrigger>
          <AccordionContent>
            <Text>Just a content</Text>
          </AccordionContent>
        </AccordionItem>
      ]
    )
  },
};