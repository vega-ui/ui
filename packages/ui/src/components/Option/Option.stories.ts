import type { Meta, StoryObj } from '@storybook/react';

import { Option } from './Option.tsx';

const meta = {
  title: 'UI-Core/Option',
  component: Option,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-1720&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Option>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    children: 'Option',
  },
};

export const Selected: Story = {
  args: {
    value: 1,
    selected: true,
    children: 'Option',
  },
};