import type { Meta, StoryObj } from '@storybook/react';

import { FlagIcon } from './FlagIcon.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FlagIcon> = {
  title: 'UI-Core/FlagIcon',
  component: FlagIcon,
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'RU'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Size: Story = {
  args: {
    size: 'large'
  },
};

export const Height: Story = {
  args: {
    height: 64
  },
};
