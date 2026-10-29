import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { CheckboxCard } from './CheckboxCard';
import {
  CheckboxCardContent, CheckboxCardControl, CheckboxCardControlCheckedIcon,
  CheckboxCardControlInput,
  CheckboxCardControlIndeterminateIcon, CheckboxCardControlIndicator, CheckboxCardDescription, CheckboxCardTitle
} from './components';

const parts = (input: ComponentProps<typeof CheckboxCardControlInput> = {}) => [
  <CheckboxCardContent key={0}>
    <CheckboxCardTitle>What is Lorem Ipsum?</CheckboxCardTitle>
    <CheckboxCardDescription>Lorem Ipsum is simply dummy text of the printing and typesetting industry</CheckboxCardDescription>
  </CheckboxCardContent>,
  <CheckboxCardControl key={1}>
    <CheckboxCardControlInput {...input} />
    <CheckboxCardControlIndicator>
      <CheckboxCardControlCheckedIcon />
      <CheckboxCardControlIndeterminateIcon />
    </CheckboxCardControlIndicator>
  </CheckboxCardControl>
]

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCard',
  component: CheckboxCard,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1159&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    }
  },
  args: {
    children: parts(),
  },
} satisfies Meta<typeof CheckboxCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    children: parts({ defaultChecked: true }),
  },
};

export const Indeterminate: Story = {
  args: {
    children: parts({ indeterminate: true }),
  },
};

export const Disabled: Story = {
  args: {
    children: parts({ disabled: true }),
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};