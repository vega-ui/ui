import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { IconButton } from './IconButton.tsx';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'globe'
  }
};

export const PrimaryAsLink: Story = {
  args: {
    name: 'globe',
    as: 'a',
    href: 'https://github.com/adara-cs/ui-kit-web'
  },
};

export const PrimaryAsLinkDisabled: Story = {
  args: {
    name: 'globe',
    as: 'a',
    'aria-disabled': true,
    href: 'https://github.com/adara-cs/ui-kit-web',
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
    name: 'globe',
    variant: 'secondary',
  },
};

export const SecondaryAsLink: Story = {
  args: {
    variant: 'secondary',
    name: 'globe',
    as: 'a',
    href: 'https://github.com/adara-cs/ui-kit-web'
  },
};

export const SecondaryAsLinkDisabled: Story = {
  args: {
    variant: 'secondary',
    name: 'globe',
    as: 'a',
    'aria-disabled': true,
    href: 'https://github.com/adara-cs/ui-kit-web',
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
    name: 'globe',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    name: 'globe',
    size: 'medium',
  },
};


export const Large: Story = {
  args: {
    name: 'globe',
    size: 'large',
  },
};