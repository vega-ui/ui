import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CheckboxCard } from './CheckboxCard.tsx';
import { CheckboxCardContent } from './components';

const meta = {
  title: 'UI/CheckboxCard',
  component: CheckboxCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof CheckboxCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <CheckboxCardContent title='Быстрый старт' description='Описание карточки' />
    ),
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    children: (
      <CheckboxCardContent title='Быстрый старт' description='Описание карточки' />
    ),
  },
};

export const WithLongDesc: Story = {
  args: {
    children: (
      <CheckboxCardContent title='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' description='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' />
    ),
  },
};

export const WithLongTitle: Story = {
  args: {
    children: (
      <CheckboxCardContent title='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' description='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' />
    ),
  },
};
