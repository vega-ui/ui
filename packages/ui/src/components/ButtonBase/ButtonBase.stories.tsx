import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ButtonBase } from './ButtonBase.tsx';

const meta = {
  title: 'UI-Core/ButtonBase',
  component: ButtonBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof ButtonBase>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'I\'m a button!',
  },
};

export const AsChild: Story = {
  render(props) {
    return (
      <ButtonBase {...props} asChild>
        <a href='#'>I'm a link!</a>
      </ButtonBase>
    );
  }
};