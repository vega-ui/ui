import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './Icon.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Icon> = {
  title: 'UI-Core/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'support',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Size: Story = {
  args: {
    size: 'lg'
  },
};

export const Height: Story = {
  args: {
    height: 64
  },
};
