import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Listbox } from './Listbox';
import { ListboxGroup, ListboxOption } from './components';
import { Button } from '../Button';
import { Text } from '../Text';

const COUNTRIES = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'Iceland', 'India', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Norway', 'Peru', 'Poland', 'Portugal', 'Spain', 'Sweden', 'Turkey', 'Uruguay', 'Vietnam'];

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
    children: { control: false },
  },
  args: {
    style: { width: 280 },
  },
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An always visible choice of one option, like a native `select` with `size`. Tab into the list, move with the arrows or by typing, and select with `Enter` or `Space`. An unavailable option is skipped.',
      },
    },
  },
  args: {
    'aria-label': 'Delivery method',
    defaultValue: 'courier',
    children: [
      <ListboxOption key='pickup' value='pickup'>Pickup point</ListboxOption>,
      <ListboxOption key='courier' value='courier'>Courier</ListboxOption>,
      <ListboxOption key='drone' value='drone' disabled>Drone (not available in your area)</ListboxOption>,
      <ListboxOption key='post' value='post'>Post office</ListboxOption>,
    ],
  },
};

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With `multiple` the value is an array and `Space` or `Enter` toggles the active option. Adjacent selected options merge into one shape.',
      },
    },
  },
  args: {
    'aria-label': 'Notification channels',
    multiple: true,
    defaultValue: ['email', 'push', 'sms'],
    children: [
      <ListboxOption key='email' value='email'>Email</ListboxOption>,
      <ListboxOption key='push' value='push'>Push</ListboxOption>,
      <ListboxOption key='sms' value='sms'>SMS</ListboxOption>,
      <ListboxOption key='slack' value='slack'>Slack</ListboxOption>,
      <ListboxOption key='telegram' value='telegram'>Telegram</ListboxOption>,
    ],
  },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The value lives in your state. Here it drives a preview, and `null` clears the selection from the outside.',
      },
    },
  },
  render: function ControlledStory({ style }) {
    const [font, setFont] = useState<string | null | undefined>('Georgia, serif');

    return (
      <div style={{ display: 'grid', gap: 12, ...style }}>
        <Listbox aria-label='Font' value={font} onChangeValue={setFont}>
          <ListboxOption value='Georgia, serif'>Serif</ListboxOption>
          <ListboxOption value='system-ui, sans-serif'>Sans-serif</ListboxOption>
          <ListboxOption value='ui-monospace, monospace'>Monospace</ListboxOption>
        </Listbox>
        <p style={{ margin: 0, fontFamily: font ?? undefined }}>{font ? 'The quick brown fox' : 'No font selected'}</p>
        <Button onClick={() => setFont(null)}>Clear</Button>
      </div>
    );
  },
};

export const ControlledMultiple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A controlled `multiple` list gets the whole array in `onChangeValue`, so a summary and a reset need nothing else.',
      },
    },
  },
  render: function ControlledMultipleStory({ style }) {
    const [toppings, setToppings] = useState(['cheese']);

    return (
      <div style={{ display: 'grid', gap: 12, ...style }}>
        <Listbox aria-label='Pizza toppings' multiple value={toppings} onChangeValue={setToppings}>
          <ListboxOption value='cheese'>Extra cheese</ListboxOption>
          <ListboxOption value='mushrooms'>Mushrooms</ListboxOption>
          <ListboxOption value='olives'>Olives</ListboxOption>
          <ListboxOption value='peppers'>Peppers</ListboxOption>
        </Listbox>
        <Text size={2}>{toppings.length} selected</Text>
        <Button onClick={() => setToppings([])}>Reset</Button>
      </div>
    );
  },
};

export const Groups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Like a native `optgroup`, except the heading is yours: render it and point `aria-labelledby` of the group to it. Keyboard navigation goes through the groups as one list.',
      },
    },
  },
  args: {
    'aria-label': 'Airport',
    children: [
      <ListboxGroup key='fr' aria-labelledby='listbox-group-france'>
        <Text id='listbox-group-france' size={2} style={{ opacity: 0.7, paddingInline: 'var(--spacing-10)' }}>France</Text>
        <ListboxOption value='cdg'>Paris Charles de Gaulle</ListboxOption>
        <ListboxOption value='nce'>Nice Côte d’Azur</ListboxOption>
      </ListboxGroup>,
      <ListboxGroup key='jp' aria-labelledby='listbox-group-japan'>
        <Text id='listbox-group-japan' size={2} style={{ opacity: 0.7, paddingInline: 'var(--spacing-10)' }}>Japan</Text>
        <ListboxOption value='hnd'>Tokyo Haneda</ListboxOption>
        <ListboxOption value='kix'>Osaka Kansai</ListboxOption>
      </ListboxGroup>,
    ],
  },
};

export const RichOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An option can hold any markup. Typeahead reads the text of the content, which here starts with the role, so `label` gives it the name to match: typing `bo` finds Boris.',
      },
    },
  },
  args: {
    'aria-label': 'Assignee',
    size: 'xl',
    children: [
      <ListboxOption key='anna' value='anna' label='Anna'>
        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>Designer</span>
          <strong>Anna</strong>
        </span>
      </ListboxOption>,
      <ListboxOption key='boris' value='boris' label='Boris'>
        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>Developer</span>
          <strong>Boris</strong>
        </span>
      </ListboxOption>,
      <ListboxOption key='clara' value='clara' label='Clara'>
        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>Manager</span>
          <strong>Clara</strong>
        </span>
      </ListboxOption>,
    ],
  },
};

export const LongList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The height is plain CSS on the list. It scrolls by itself and keeps the active option in view while you move with the keyboard or type a name.',
      },
    },
  },
  args: {
    'aria-label': 'Country',
    style: { width: 280, maxHeight: 240 },
    children: COUNTRIES.map((country) => <ListboxOption key={country} value={country}>{country}</ListboxOption>),
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A disabled list keeps showing its value but leaves the tab order and ignores the pointer.',
      },
    },
  },
  args: {
    'aria-label': 'Plan',
    disabled: true,
    defaultValue: 'team',
    children: [
      <ListboxOption key='free' value='free'>Free</ListboxOption>,
      <ListboxOption key='team' value='team'>Team</ListboxOption>,
      <ListboxOption key='enterprise' value='enterprise'>Enterprise</ListboxOption>,
    ],
  },
};
