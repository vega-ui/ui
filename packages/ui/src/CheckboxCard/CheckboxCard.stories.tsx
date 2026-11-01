import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { Diff, Rocket } from '@vega-ui/icons';
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
  title: 'Form/Selectors/CheckboxCard',
  component: CheckboxCard,
  subcomponents: {
    CheckboxCardContent,
    CheckboxCardTitle,
    CheckboxCardDescription,
    CheckboxCardControl,
    CheckboxCardControlInput,
    CheckboxCardControlIndicator,
    CheckboxCardControlIndeterminateIcon,
    CheckboxCardControlCheckedIcon,
  },
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

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: '`variant` on the card also styles its control.',
      },
    },
  },
  args: {
    variant: 'secondary',
    children: parts({ defaultChecked: true }),
  },
};

export const DisabledStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A disabled control keeps showing its checked or indeterminate state.',
      },
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <CheckboxCard {...props}>{parts({ defaultChecked: true, disabled: true })}</CheckboxCard>
      <CheckboxCard {...props}>{parts({ indeterminate: true, disabled: true })}</CheckboxCard>
    </div>
  ),
};

export const CustomIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Children of `CheckboxCardControlCheckedIcon` and `CheckboxCardControlIndeterminateIcon` replace the default icon of that state.',
      },
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <CheckboxCard {...props}>
        <CheckboxCardContent>
          <CheckboxCardTitle>Launch</CheckboxCardTitle>
          <CheckboxCardDescription>Publish the release right after the build</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput defaultChecked />
          <CheckboxCardControlIndicator>
            <CheckboxCardControlCheckedIcon>
              <Rocket />
            </CheckboxCardControlCheckedIcon>
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxCardControlIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard {...props}>
        <CheckboxCardContent>
          <CheckboxCardTitle>Compare</CheckboxCardTitle>
          <CheckboxCardDescription>Only some of the files have a diff</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput indeterminate />
          <CheckboxCardControlIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon>
              <Diff />
            </CheckboxCardControlIndeterminateIcon>
          </CheckboxCardControlIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  ),
};
