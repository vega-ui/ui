import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner.tsx';

const meta = {
  title: 'UI-Core/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    size: 7
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};