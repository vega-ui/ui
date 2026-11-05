import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './Link';

const meta = {
  title: 'Typography/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-6085&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
  },
  args: {
    children: 'Example link',
    href: '#',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
