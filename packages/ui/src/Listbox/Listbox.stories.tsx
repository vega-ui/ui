import type { Meta, StoryObj } from '@storybook/react-vite';
import { Listbox } from './Listbox';
import { ListboxGroup, ListboxOption } from './components';
import { OptionSize } from '../Option';
import { Text } from '../Text';

const REGIONS = [
  { id: 'americas', name: 'Americas', countries: ['Argentina', 'Brazil', 'Canada', 'Chile', 'Mexico', 'Peru', 'Uruguay'] },
  { id: 'europe', name: 'Europe', countries: ['Austria', 'Belgium', 'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Iceland', 'Ireland', 'Italy', 'Norway', 'Poland', 'Portugal', 'Spain', 'Sweden'] },
  { id: 'asia', name: 'Asia and Oceania', countries: ['Australia', 'China', 'India', 'Japan', 'Turkey', 'Vietnam'] },
  { id: 'africa', name: 'Africa', countries: ['Egypt', 'Kenya'] },
];

const meta = {
  title: 'Form/Selectors/Listbox',
  component: Listbox,
  subcomponents: { ListboxOption, ListboxGroup },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    typeahead: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    'aria-label': 'Delivery method',
    style: { width: 280 },
    children: [
      <ListboxOption key='pickup' value='pickup'>Pickup point</ListboxOption>,
      <ListboxOption key='courier' value='courier'>Courier</ListboxOption>,
      <ListboxOption key='drone' value='drone' disabled>Drone (not available in your area)</ListboxOption>,
      <ListboxOption key='post' value='post'>Post office</ListboxOption>,
    ],
  },
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const states = ['single', 'multiple', 'disabled'] as const;
const sizes: OptionSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An always visible choice of one option, like a native `select` with `size`. Tab into the list, move with the arrows or by typing, and select with `Enter` or `Space`. An unavailable option is skipped. With `multiple` the value is an array and `Space` or `Enter` toggles the active option.',
      },
    },
  },
  render: (args) => <Listbox key={args.multiple ? 'multiple' : 'single'} {...args} />,
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, 180px)`, gap: 12, alignItems: 'start' }}>
      {states.map((state) => sizes.map((size) => (
        <Listbox
          key={`${state}-${size}`}
          aria-label={`${state} / ${size}`}
          size={size}
          multiple={state === 'multiple'}
          disabled={state === 'disabled'}
          defaultValue={state === 'multiple' ? ['email', 'push'] : 'email'}
        >
          <ListboxOption value='email'>Email</ListboxOption>
          <ListboxOption value='push'>Push</ListboxOption>
          <ListboxOption value='sms'>SMS</ListboxOption>
          <ListboxOption value='slack' disabled>Slack</ListboxOption>
        </Listbox>
      )))}
    </div>
  ),
};

export const LongList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The height is plain CSS on the list. It scrolls by itself and keeps the active option in view while you move with the keyboard or type a name; keyboard navigation goes through the groups as one list.',
      },
    },
  },
  args: {
    'aria-label': 'Country',
    style: { width: 280, maxHeight: 240 },
    children: REGIONS.map((region) => (
      <ListboxGroup key={region.id} aria-labelledby={`listbox-region-${region.id}`}>
        <Text id={`listbox-region-${region.id}`} size={2} style={{ opacity: 0.7, paddingInline: 'var(--spacing-10)' }}>{region.name}</Text>
        {region.countries.map((country) => <ListboxOption key={country} value={country}>{country}</ListboxOption>)}
      </ListboxGroup>
    )),
  },
};
