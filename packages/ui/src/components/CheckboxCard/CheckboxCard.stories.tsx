import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxCard } from './CheckboxCard.tsx';
import { CheckboxCardContent } from './components';

const meta = {
  title: 'UI-Core/CheckboxCard/CheckboxCard',
  component: CheckboxCard,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-1159&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckboxCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <CheckboxCardContent title='Быстрый старт' description='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' />
    ),
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: (
      <CheckboxCardContent title='Быстрый старт' description='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' />
    ),
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    children: (
      <CheckboxCardContent title='Быстрый старт' description='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' />
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <CheckboxCardContent title='Быстрый старт' description='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' />
    ),
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    children: (
      <CheckboxCardContent title='Быстрый старт' description='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне' />
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
