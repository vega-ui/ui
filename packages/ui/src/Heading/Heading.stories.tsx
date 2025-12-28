import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1521&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {
    children: 'Заголовок'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
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