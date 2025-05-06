import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControlItem } from './SegmentedControlItem.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'UI-Core/SegmentedControl/SegmentedControlItem',
  component: SegmentedControlItem,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-2323&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SegmentedControlItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>Item</Text>
  },
}