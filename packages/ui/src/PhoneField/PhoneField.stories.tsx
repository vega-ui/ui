import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountryCode } from 'libphonenumber-js';

import { PhoneField, PhoneFieldProps } from './PhoneField';
import {
  PhoneFieldSelect,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectValue,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldInput,
} from './components';

const codes: CountryCode[] = ['US', 'RU', 'FR', 'GB', 'DE', 'JP', 'BR', 'IN'];

const meta = {
  title: 'Form/Fields/PhoneField',
  component: PhoneField,
  subcomponents: {
    PhoneFieldSelect,
    PhoneFieldSelectHiddenSelect,
    PhoneFieldSelectCombobox,
    PhoneFieldSelectValue,
    PhoneFieldSelectIcon,
    PhoneFieldSelectListbox,
    PhoneFieldSelectOption,
    PhoneFieldInput,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    code: { control: 'select', options: codes },
    strictMask: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    code: 'RU',
  },
  render: (args) => (
    <PhoneField {...args}>
      <PhoneFieldInput aria-label='Phone number' autoComplete='tel' />
    </PhoneField>
  ),
} satisfies Meta<typeof PhoneField>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: PhoneFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { label: 'default', inputDisabled: false, selectDisabled: false, error: false },
  { label: 'disabled', inputDisabled: true, selectDisabled: true, error: false },
  { label: 'error', inputDisabled: false, selectDisabled: false, error: true },
  { label: 'select disabled', inputDisabled: false, selectDisabled: true, error: false },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => states.map((state) => (
        <PhoneField key={`${size}-${state.label}`} size={size} defaultCode='RU' error={state.error}>
          <PhoneFieldSelect disabled={state.selectDisabled}>
            <PhoneFieldSelectHiddenSelect />
            <PhoneFieldSelectCombobox aria-label='Country'>
              <PhoneFieldSelectValue />
              <PhoneFieldSelectIcon />
            </PhoneFieldSelectCombobox>
            <PhoneFieldSelectListbox>
              <PhoneFieldSelectOption value='RU'>RU</PhoneFieldSelectOption>
              <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
              <PhoneFieldSelectOption value='FR'>FR</PhoneFieldSelectOption>
            </PhoneFieldSelectListbox>
          </PhoneFieldSelect>
          <PhoneFieldInput
            aria-label='Phone number'
            disabled={state.inputDisabled}
            placeholder={`${size} / ${state.label}`}
            autoComplete='tel'
          />
        </PhoneField>
      )))}
    </div>
  ),
};

export const CountryMasks: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: 12, alignItems: 'center' }}>
      {codes.map((code) => (
        <PhoneField key={code} code={code}>
          <PhoneFieldInput aria-label={`Phone number, ${code}`} placeholder={code} autoComplete='tel' />
        </PhoneField>
      ))}
    </div>
  ),
};
