import type { Meta, StoryObj } from '@storybook/react-vite';

import { FlagIcon } from './FlagIcon.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FlagIcon> = {
  title: 'Display/FlagIcon',
  component: FlagIcon,
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'RU'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
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
