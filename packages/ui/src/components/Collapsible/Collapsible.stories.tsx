import type { Meta, StoryObj } from '@storybook/react';

import { Collapsible } from './Collapsible.tsx';
import { Text } from '../Text';
import { CollapsibleTrigger, CollapsibleContent } from './components';
import { Button } from '../Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Collapsible> = {
  title: 'UI-Core/Collapsible/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'padded'
  },
  args: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(props) {
    return (
      <Collapsible {...props}>
        <CollapsibleTrigger asChild>
          <Button appearance='transparent'>Collapse</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>Hello</Text>
        </CollapsibleContent>
      </Collapsible>
    )
  }
}