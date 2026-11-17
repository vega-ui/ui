import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Combobox, ComboboxProps } from './Combobox';
import { ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger } from './components';
import { ComboboxSize } from './types';
import { ListboxOption } from '../Listbox';
import { TextField } from '../TextField';

const COUNTRIES = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'Iceland', 'India', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Norway', 'Peru', 'Poland', 'Portugal', 'Spain', 'Sweden', 'Turkey', 'Uruguay', 'Vietnam'];

const meta = {
  title: 'Form/Selectors/Combobox',
  component: Combobox,
  subcomponents: {
    ComboboxInput,
    ComboboxTrigger,
    ComboboxIcon,
    ComboboxListbox,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    autocomplete: { control: 'radio', options: ['list', 'none', 'both', 'inline'] },
    children: { control: false },
  },
  args: {
    style: { width: 280 },
  },
} satisfies Meta<ComboboxProps>;

export default meta;
type Story = StoryObj<ComboboxProps>;

const states = ['default', 'disabled', 'readOnly', 'invalid'] as const;
const sizes: ComboboxSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typing opens the list, which the app filters itself, and the trigger opens it without typing. With `autocomplete` set to `both`, typing completes the text with the first matching option. The focus stays in the input: move with `ArrowDown` and `ArrowUp`, pick with `Enter` or a click, close with `Escape`, and press `Escape` again to clear the text. Name the input with a label or `aria-label`.',
      },
    },
  },
  render: function Render(args) {
    const [text, setText] = useState('');
    const [query, setQuery] = useState('');
    const matches = COUNTRIES.filter((country) => country.toLowerCase().startsWith(query.trim().toLowerCase()));

    return (
      <Combobox {...args}>
        <TextField size={args.size}>
          <ComboboxInput
            aria-label='Country'
            placeholder='Start typing a country'
            value={text}
            onChange={(event) => {
              const { value, selectionStart, selectionEnd } = event.target;
              setText(value);
              setQuery(selectionEnd === value.length ? value.slice(0, selectionStart ?? undefined) : value);
            }}
          />
          <ComboboxTrigger aria-label='Show countries'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Countries'>
          {matches.map((country) => <ListboxOption key={country} value={country}>{country}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
    );
  },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, 160px)`, gap: 12, alignItems: 'center' }}>
      {states.map((state) => sizes.map((size) => (
        <Combobox
          key={`${state}-${size}`}
          size={size}
          disabled={state === 'disabled'}
          readOnly={state === 'readOnly'}
          defaultValue='Peru'
        >
          <TextField size={size}>
            <ComboboxInput aria-label={`${state} / ${size}`} defaultValue='Peru' aria-invalid={state === 'invalid'} />
            <ComboboxTrigger aria-label='Show options'>
              <ComboboxIcon />
            </ComboboxTrigger>
          </TextField>
          <ComboboxListbox>
            <ListboxOption value='Peru'>Peru</ListboxOption>
            <ListboxOption value='Poland'>Poland</ListboxOption>
          </ComboboxListbox>
        </Combobox>
      )))}
    </div>
  ),
};
