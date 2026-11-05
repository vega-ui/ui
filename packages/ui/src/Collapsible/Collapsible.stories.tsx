import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Collapsible } from './Collapsible';
import { Text } from '../Text';
import { CollapsibleTrigger, CollapsibleContent } from './components';
import { Button } from '../Button';

const meta = {
  title: 'Actions/Collapsible',
  component: Collapsible,
  subcomponents: {
    CollapsibleContent,
    CollapsibleTrigger,
  },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
    },
  },
  args: {
    onChangeOpen: fn(),
    onChangeHidden: fn(),
    children: [
      <CollapsibleTrigger key='trigger' asChild>
        <Button appearance='transparent'>Collapse</Button>
      </CollapsibleTrigger>,
      <CollapsibleContent key='content'>
        <Text>Hello</Text>
      </CollapsibleContent>,
    ],
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
