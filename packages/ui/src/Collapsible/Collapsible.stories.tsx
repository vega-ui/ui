import type { Meta, StoryObj } from '@storybook/react-vite';

import { Collapsible } from './Collapsible';
import { Text } from '../Text';
import { CollapsibleTrigger, CollapsibleContent } from './components';
import { Button } from '../Button';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Collapsible> = {
  title: 'Actions/Collapsible',
  component: Collapsible,
  subcomponents: {
    CollapsibleContent,
    CollapsibleTrigger,
  },
  parameters: {
    layout: 'padded'
  },
  args: {
    onChangeHidden: console.log
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <CollapsibleTrigger key={0} asChild>
        <Button appearance='transparent'>Collapse</Button>
      </CollapsibleTrigger>,
      <CollapsibleContent key={1}>
        <Text>Hello</Text>
      </CollapsibleContent>
    ]
  }
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With `open` and `onChangeOpen` you own the state: here the content starts expanded and the trigger label follows it.',
      },
    },
  },
  render: (props) => {
    const [open, setOpen] = useState(true);

    return (
      <Collapsible {...props} open={open} onChangeOpen={setOpen}>
        <CollapsibleTrigger asChild>
          <Button appearance='transparent'>{open ? 'Hide details' : 'Show details'}</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>Delivery takes three to five business days.</Text>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
