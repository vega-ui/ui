import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Link> = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Это просто ссылка'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://github.com/adara-cs/ui-kit-web'
  },
};