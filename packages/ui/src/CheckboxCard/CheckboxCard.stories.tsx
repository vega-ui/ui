import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCard } from './CheckboxCard.tsx';
import {
  CheckboxCardContent, CheckboxCardControl, CheckboxCardControlCheckedIcon,
  CheckboxCardControlHiddenInput,
  CheckboxCardControlIndeterminateIcon, CheckboxCardControlIndicator, CheckboxCardDescription, CheckboxCardTitle
} from './components';

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
    children: [
      <CheckboxCardContent key={0}>
        <CheckboxCardTitle>What is Lorem Ipsum?</CheckboxCardTitle>
        <CheckboxCardDescription>Lorem Ipsum is simply dummy text of the printing and typesetting industry</CheckboxCardDescription>
      </CheckboxCardContent>,
      <CheckboxCardControl key={1}>
        <CheckboxCardControlHiddenInput />
        <CheckboxCardControlIndicator>
          <CheckboxCardControlCheckedIcon />
          <CheckboxCardControlIndeterminateIcon />
        </CheckboxCardControlIndicator>
      </CheckboxCardControl>
    ],
  },
} satisfies Meta<typeof CheckboxCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};