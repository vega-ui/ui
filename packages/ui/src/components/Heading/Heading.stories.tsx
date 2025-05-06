import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './Heading.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Heading> = {
  title: 'UI-Core/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-1521&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {
    children: 'Заголовок'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Each: Story = {
  args: {},
  render() {
    const types = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
    return (
      <>
        {types.map((type) => (
          <Heading as={type}>Заголовок</Heading>
        ))}
      </>
    )
  }
};