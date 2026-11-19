import type { Meta, StoryObj } from '@storybook/react-vite';

import { PasswordField, PasswordFieldProps } from './PasswordField';
import { EyeIcon, EyeOffIcon } from '@vega-ui/icons';
import {
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
} from './components';

const meta = {
  title: 'Form/Fields/PasswordField',
  component: PasswordField,
  subcomponents: {
    PasswordFieldHiddenIcon,
    PasswordFieldInput,
    PasswordFieldShownIcon,
    PasswordFieldToggle,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4614&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    shown: { control: 'boolean' },
  },
  args: {},
  render: (args) => (
    <PasswordField {...args}>
      <PasswordFieldInput aria-label='Password' placeholder='Password' autoComplete='current-password' />
      <PasswordFieldToggle square aria-label='Show password'>
        <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
        <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
      </PasswordFieldToggle>
    </PasswordField>
  ),
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: PasswordFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { label: 'default', shown: false, disabled: false, invalid: false },
  { label: 'shown', shown: true, disabled: false, invalid: false },
  { label: 'disabled', shown: false, disabled: true, invalid: false },
  { label: 'invalid', shown: false, disabled: false, invalid: true },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => states.map((state) => (
        <PasswordField
          key={`${size}-${state.label}`}
          size={size}
          defaultShown={state.shown}
          disabled={state.disabled}
        >
          <PasswordFieldInput aria-label='Password' aria-invalid={state.invalid} defaultValue={`${size} / ${state.label}`} />
          <PasswordFieldToggle square aria-label='Show password'>
            <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
            <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
          </PasswordFieldToggle>
        </PasswordField>
      )))}
    </div>
  ),
};
