import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion } from './Accordion';
import { Text } from '../Text';
import { AccordionTrigger, AccordionContent, AccordionItem, AccordionHeader, AccordionIcon } from './components';
import { Separator } from '../Separator';
import { AccordionSize } from './types';

const values = ['1', '2', '3'];
const sizes: AccordionSize[] = ['sm', 'md', 'lg'];

const items = values.map((value, index) => (
  <AccordionItem key={value} value={value}>
    <AccordionHeader>
      <AccordionTrigger>
        {`Section ${value}`}
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      <Text>Just a content</Text>
    </AccordionContent>
    {index < values.length - 1 && <Separator />}
  </AccordionItem>
));

const meta = {
  title: 'Actions/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    AccordionHeader,
    AccordionIcon,
  },
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-521&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    multiple: {
      control: 'boolean',
    },
    defaultOpened: {
      control: 'object',
    },
  },
  args: {
    children: items,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {sizes.map((size) => (
        <Accordion key={size} size={size} defaultOpened={['1']}>
          {items}
        </Accordion>
      ))}
    </div>
  ),
};
