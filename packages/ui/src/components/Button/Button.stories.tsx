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
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary']
    },
    appearance: {
      control: 'radio',
      options: ['fill', 'ghost', 'outline', 'transparent']
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  }
};

export const PrimaryAsLink: Story = {
  render() {
    return <Button asChild><a href='https://github.com/adara-cs/ui-kit-web'>Github</a></Button>
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
    children: 'Кнопка',
    variant: 'secondary',
  },
};

export const SecondaryAsLink: Story = {
  render() {
    return <Button variant='secondary' asChild><a href='https://github.com/adara-cs/ui-kit-web'>Github</a></Button>
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