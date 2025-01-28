import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


import { Button } from './Button.tsx';

const meta = {
  title: 'UI-Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Кнопка',
  },
};

export const PrimaryAsLink: Story = {
  args: {
    as: 'a',
    href: 'https://github.com/adara-cs/ui-kit-web',
    children: 'GitHub',
  },
};

export const PrimaryAsLinkDisabled: Story = {
  args: {
    as: 'a',
    'aria-disabled': 'true',
    href: 'https://github.com/adara-cs/ui-kit-web',
    children: 'GitHub',
  },
};

export const PrimaryOutline: Story = {
  args: {
    ...Primary.args,
    appearance: 'outline'
  },
};

export const PrimaryGhost: Story = {
  args: {
    ...Primary.args,
    appearance: 'ghost'
  },
};

export const PrimaryTransparent: Story = {
  args: {
    ...Primary.args,
    appearance: 'transparent'
  },
};

export const Secondary: Story = {
  args: {
    children: 'Кнопка',
    variant: 'secondary',
  },
};

export const SecondaryAsLink: Story = {
  args: {
    variant: 'secondary',
    as: 'a',
    href: 'https://github.com/adara-cs/ui-kit-web',
    children: 'GitHub',
  },
};

export const SecondaryOutline: Story = {
  args: {
    ...Secondary.args,
    appearance: 'outline'
  },
};

export const SecondaryGhost: Story = {
  args: {
    ...Secondary.args,
    appearance: 'ghost'
  },
};

export const SecondaryTransparent: Story = {
  args: {
    ...Secondary.args,
    appearance: 'transparent'
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Кнопка',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Кнопка',
  },
};


export const Large: Story = {
  args: {
    size: 'large',
    children: 'Кнопка',
  },
};