import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneCountry } from '@vega-ui/i18n';

import { PhoneField, PhoneFieldProps } from './PhoneField';
import { ChevronDownIcon } from '@vega-ui/icons';
import {
  PhoneFieldSelect,
  PhoneFieldInput,
} from './components';
import {
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '../Select';

const countries: PhoneCountry[] = ['US', 'RU', 'FR', 'GB', 'DE', 'JP', 'BR', 'IN'];

const meta = {
  title: 'Form/Fields/PhoneField',
  component: PhoneField,
  subcomponents: {
    PhoneFieldSelect,
    SelectHiddenSelect,
    SelectCombobox,
    SelectValue,
    SelectIcon,
    SelectListbox,
    SelectOption,
    PhoneFieldInput,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    country: { control: 'select', options: countries },
    strictMask: { control: 'boolean' },
  },
  args: {
    country: 'RU',
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
  { label: 'default', inputDisabled: false, selectDisabled: false, invalid: false },
  { label: 'disabled', inputDisabled: true, selectDisabled: true, invalid: false },
  { label: 'invalid', inputDisabled: false, selectDisabled: false, invalid: true },
  { label: 'select disabled', inputDisabled: false, selectDisabled: true, invalid: false },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => states.map((state) => (
        <PhoneField key={`${size}-${state.label}`} size={size} defaultCountry='RU'>
          <PhoneFieldSelect disabled={state.selectDisabled}>
            <SelectHiddenSelect />
            <SelectCombobox aria-label='Country'>
              <SelectValue />
              <SelectIcon><ChevronDownIcon /></SelectIcon>
            </SelectCombobox>
            <SelectListbox>
              <SelectOption value='RU'>RU</SelectOption>
              <SelectOption value='US'>US</SelectOption>
              <SelectOption value='FR'>FR</SelectOption>
            </SelectListbox>
          </PhoneFieldSelect>
          <PhoneFieldInput
            aria-label='Phone number'
            aria-invalid={state.invalid}
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
      {countries.map((country) => (
        <PhoneField key={country} country={country}>
          <PhoneFieldInput aria-label={`Phone number, ${country}`} placeholder={country} autoComplete='tel' />
        </PhoneField>
      ))}
    </div>
  ),
};
