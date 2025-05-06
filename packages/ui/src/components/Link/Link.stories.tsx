import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Link> = {
  title: 'UI-Core/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-6085&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {
    children: 'Just a link'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#'
  }
};