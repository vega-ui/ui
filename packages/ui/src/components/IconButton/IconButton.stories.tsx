import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './IconButton.tsx';

const meta = {
  title: 'UI-Core/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'globe'
  }
};

export const PrimaryAsLink: Story = {
  render() {
    return <IconButton name='support' asChild><a href='https://github.com/adara-cs/ui-kit-web' /></IconButton>
  }
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
  render() {
    return <IconButton variant='secondary' name='support' asChild><a href='https://github.com/adara-cs/ui-kit-web' /></IconButton>
  }
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