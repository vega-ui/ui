import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion } from './Accordion.tsx';
import { Text } from '../Text';
import { AccordionTrigger, AccordionContent, AccordionItem, AccordionHeader, AccordionIcon } from './components';
import { ArrowDown } from '@vega-ui/icons';

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
      options: ['sm', 'md', 'lg'],
    }
  },
  args: {
    children: [
      <AccordionItem key='1' value='1'>
        <AccordionHeader>
          <AccordionTrigger>
            Hello
            <AccordionIcon />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Just a content</Text>
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key='2' value='2'>
        <AccordionHeader>
          <AccordionTrigger>
            Hello
            <AccordionIcon />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Just a content</Text>
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key='3' value='3'>
        <AccordionHeader>
          <AccordionTrigger>
            Hello
            <AccordionIcon />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Just a content</Text>
        </AccordionContent>
      </AccordionItem>
    ]
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

export const DefaultOpened: Story = {
  args: {
    defaultOpened: ['1'],
  },
};

export const WithCustomIcon: Story = {
  args: {
    children: [
      <AccordionItem key='1' value='1'>
        <AccordionHeader>
          <AccordionTrigger>
            Hello
            <AccordionIcon>
              <ArrowDown />
            </AccordionIcon>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Just a content</Text>
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key='2' value='2'>
        <AccordionHeader>
          <AccordionTrigger>
            Hello
            <AccordionIcon>
              <ArrowDown />
            </AccordionIcon>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Just a content</Text>
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key='3' value='3'>
        <AccordionHeader>
          <AccordionTrigger>
            Hello
            <AccordionIcon>
              <ArrowDown />
            </AccordionIcon>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Just a content</Text>
        </AccordionContent>
      </AccordionItem>
    ]
  },
};