import type { Meta, StoryObj } from '@storybook/react';

import { Option } from './Option.tsx';

const meta = {
  title: 'UI/Option',
  component: Option,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Option>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    children: 'Опция',
  },
};