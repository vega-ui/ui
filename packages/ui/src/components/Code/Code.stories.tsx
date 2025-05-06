import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code.tsx';
import { Text } from '../Text';

const meta = {
  title: 'UI-Core/Code',
  component: Code,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-1572&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'sudo apt-get update',
  },
};

export const WithText: Story = {
  args: {
    size: 3,
    children: 'sudo apt-get update',
  },
  render(props) {
    return (
      <Text size={props.size}>
        Updating the package database requires superuser privileges <Code {...props} />
      </Text>
    )
  }
};