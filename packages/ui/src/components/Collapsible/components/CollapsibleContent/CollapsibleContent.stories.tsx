import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleContent } from './CollapsibleContent.tsx';
import { Text } from '../../../Text';
import { Collapsible } from '../../Collapsible.tsx';

const meta = {
  title: 'UI-Core/Collapsible/CollapsibleContent',
  component: CollapsibleContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CollapsibleContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>Hidden content</Text>
  },
  render(props) {
    return (
      <Collapsible open>
        <CollapsibleContent {...props} />
      </Collapsible>
    )
  }
}