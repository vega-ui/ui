import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select, SelectProps } from './Select';
import {
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  SelectValueProps,
} from './components';
import { SelectSize, SelectVariant } from './types';
import { subcomponentArgs } from '../../../../.storybook/subcomponentArgs';

type SelectStoryProps = SelectProps & Pick<SelectValueProps, 'placeholder'>;

const COUNTRIES = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'Iceland', 'India', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Norway', 'Peru', 'Poland', 'Portugal', 'Spain', 'Sweden', 'Turkey', 'Uruguay', 'Vietnam'];

const value = subcomponentArgs(SelectValue, ['placeholder']);

const meta = {
  title: 'Form/Selectors/Select',
  component: Select,
  subcomponents: {
    SelectCombobox,
    SelectListbox,
    SelectOption,
    SelectIcon,
    SelectHiddenSelect,
    SelectValue,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2262&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: { control: 'radio', options: ['field', 'inline'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    typeahead: { control: 'boolean' },
    children: { control: false },
    ...value.argTypes,
  },
  args: {
    style: { width: 280 },
    placeholder: 'Choose delivery',
  },
} satisfies Meta<SelectStoryProps>;

export default meta;
type Story = StoryObj<SelectStoryProps>;

const variants: SelectVariant[] = ['field', 'inline'];
const states = ['default', 'disabled', 'readOnly'] as const;
const sizes: SelectSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const rows = variants.flatMap((variant) => states.map((state) => ({ variant, state })));

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A compact choice of one option. The focus stays on the trigger: open with `Enter`, `Space` or the arrows, move with the arrows or by typing, and select with `Enter`, `Space` or `Tab`. An unavailable option is skipped. Name the trigger with a label or `aria-label`.',
      },
    },
  },
  render: (args) => {
    const [valueProps, selectProps] = value.split(args);

    return (
      <Select {...selectProps}>
        <SelectCombobox aria-label='Delivery method'>
          <SelectValue {...valueProps} />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='pickup'>Pickup point</SelectOption>
          <SelectOption value='courier'>Courier</SelectOption>
          <SelectOption value='drone' disabled>Drone (not available in your area)</SelectOption>
          <SelectOption value='post'>Post office</SelectOption>
        </SelectListbox>
      </Select>
    );
  },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, 160px)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => (
        <Select
          key={`${row.variant}-${row.state}-${size}`}
          variant={row.variant}
          size={size}
          disabled={row.state === 'disabled'}
          readOnly={row.state === 'readOnly'}
          defaultValue='courier'
        >
          <SelectCombobox aria-label={`${row.variant} / ${row.state} / ${size}`}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='pickup'>Pickup point</SelectOption>
            <SelectOption value='courier'>Courier</SelectOption>
          </SelectListbox>
        </Select>
      )))}
    </div>
  ),
};

export const LongList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The list scrolls and keeps the active option in view. It opens on the selected option, and typing `sw` jumps to Sweden, even while the list is closed.',
      },
    },
  },
  args: {
    defaultValue: 'Japan',
    placeholder: 'Choose a country',
  },
  render: (args) => {
    const [valueProps, selectProps] = value.split(args);

    return (
      <Select {...selectProps}>
        <SelectCombobox aria-label='Country'>
          <SelectValue {...valueProps} />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          {COUNTRIES.map((country) => <SelectOption key={country} value={country}>{country}</SelectOption>)}
        </SelectListbox>
      </Select>
    );
  },
};
