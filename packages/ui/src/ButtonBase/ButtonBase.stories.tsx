import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ButtonBase } from './ButtonBase';

const meta = {
  title: 'Actions/ButtonBase',
  component: ButtonBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    appearance: {
      control: 'radio',
      options: ['fill', 'outline', 'ghost', 'transparent'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof ButtonBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
