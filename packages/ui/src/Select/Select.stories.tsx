import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { Globe, Lock, Rocket, Users } from '@vega-ui/icons';

import { Select } from './Select';
import {
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from './components';
import { Button } from '../Button';
import { Code } from '../Code';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../Dialog';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { Text } from '../Text';
import { TextField, TextFieldInput } from '../TextField';

const COUNTRIES = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'Iceland', 'India', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Norway', 'Peru', 'Poland', 'Portugal', 'Spain', 'Sweden', 'Turkey', 'Uruguay', 'Vietnam'];

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
    children: { control: false },
  },
  args: {
    style: { width: 280 },
    children: [
      <SelectCombobox key='combobox' aria-label='Delivery method'>
        <SelectValue placeholder='Choose delivery' />
        <SelectIcon />
      </SelectCombobox>,
      <SelectListbox key='listbox'>
        <SelectOption value='pickup'>Pickup point</SelectOption>
        <SelectOption value='courier'>Courier</SelectOption>
        <SelectOption value='drone' disabled>Drone (not available in your area)</SelectOption>
        <SelectOption value='post'>Post office</SelectOption>
      </SelectListbox>,
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A compact choice of one option. The focus stays on the trigger: open with `Enter`, `Space` or the arrows, move with the arrows or by typing, and select with `Enter`, `Space` or `Tab`. An unavailable option is skipped. Name the trigger with a label or `aria-label`.',
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '`size` sets the trigger and its options together, to match the fields next to it.',
      },
    },
  },
  render: ({ style }) => (
    <div style={{ display: 'grid', gap: 12, ...style }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Select key={size} size={size} defaultValue='courier'>
          <SelectCombobox aria-label={`Delivery method, size ${size}`}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='pickup'>Pickup point</SelectOption>
            <SelectOption value='courier'>Courier</SelectOption>
          </SelectListbox>
        </Select>
      ))}
    </div>
  ),
};

export const InForm: Story = {
  parameters: {
    docs: {
      description: {
        story: '`SelectHiddenSelect` submits the value under its `name`, and a `Label` names the trigger through `htmlFor`. Submit the form to see what it sends.',
      },
    },
  },
  render: function InFormStory({ style }) {
    const [submitted, setSubmitted] = useState<string>();

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitted(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
    };

    return (
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, ...style }}>
        <Label htmlFor='select-form-country'>Country</Label>
        <Select defaultValue='France'>
          <SelectHiddenSelect name='country' />
          <SelectCombobox id='select-form-country'>
            <SelectValue placeholder='Choose a country' />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='France'>France</SelectOption>
            <SelectOption value='Germany'>Germany</SelectOption>
            <SelectOption value='Japan'>Japan</SelectOption>
          </SelectListbox>
        </Select>
        <Button type='submit'>Save</Button>
        {submitted && <Code>{submitted}</Code>}
      </form>
    );
  },
};

export const Clearable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The value lives in your state, and `null` clears it and brings the placeholder back. `undefined` would make the select uncontrolled instead.',
      },
    },
  },
  render: function ClearableStory({ style }) {
    const [priority, setPriority] = useState<string | number | null | undefined>('medium');

    return (
      <div style={{ display: 'grid', gap: 12, ...style }}>
        <Select value={priority} onChangeValue={setPriority}>
          <SelectCombobox aria-label='Priority'>
            <SelectValue placeholder='No priority' />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='low'>Low</SelectOption>
            <SelectOption value='medium'>Medium</SelectOption>
            <SelectOption value='high'>High</SelectOption>
          </SelectListbox>
        </Select>
        <Button variant='secondary' disabled={priority === null} onClick={() => setPriority(null)}>Clear priority</Button>
      </div>
    );
  },
};

export const ControlledOpen: Story = {
  parameters: {
    docs: {
      description: {
        story: '`open` and `onChangeOpen` let something else open the list, here a shortcut button that also moves the focus to the trigger, so the keyboard keeps working. The select still reports its own closing.',
      },
    },
  },
  render: function ControlledOpenStory({ style }) {
    const [open, setOpen] = useState(false);
    const comboboxRef = useRef<HTMLButtonElement>(null);

    const onClick = () => {
      comboboxRef.current?.focus();
      setOpen(true);
    };

    return (
      <div style={{ display: 'grid', gap: 12, ...style }}>
        <Button variant='secondary' onClick={onClick}>Change language</Button>
        <Select open={open} onChangeOpen={setOpen} defaultValue='en'>
          <SelectCombobox ref={comboboxRef} aria-label='Language'>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='en'>English</SelectOption>
            <SelectOption value='fr'>French</SelectOption>
            <SelectOption value='ja'>Japanese</SelectOption>
          </SelectListbox>
        </Select>
      </div>
    );
  },
};

export const CustomIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Children of `SelectIcon` replace the default chevron.',
      },
    },
  },
  args: {
    defaultValue: 'en',
    children: [
      <SelectCombobox key='combobox' aria-label='Language'>
        <SelectValue />
        <SelectIcon>
          <Globe />
        </SelectIcon>
      </SelectCombobox>,
      <SelectListbox key='listbox'>
        <SelectOption value='en'>English</SelectOption>
        <SelectOption value='fr'>French</SelectOption>
        <SelectOption value='ja'>Japanese</SelectOption>
      </SelectListbox>,
    ],
  },
};

export const CustomValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Without children `SelectValue` copies the selected option on the client. Children replace that copy: here the options are long and the trigger stays short. Use them for server rendering too, and the placeholder still shows while nothing is selected.',
      },
    },
  },
  render: function CustomValueStory({ style }) {
    const [currency, setCurrency] = useState<string | number | null | undefined>('EUR');

    return (
      <Select style={style} value={currency} onChangeValue={setCurrency}>
        <SelectCombobox aria-label='Currency'>
          <SelectValue placeholder='Choose a currency'>{currency}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='USD'>United States dollar (USD)</SelectOption>
          <SelectOption value='EUR'>Euro (EUR)</SelectOption>
          <SelectOption value='JPY'>Japanese yen (JPY)</SelectOption>
        </SelectListbox>
      </Select>
    );
  },
};

export const RichOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An option can hold any markup, and the trigger shows a copy of it. Typeahead reads the text of the content, so `label` gives it the name to match: typing `te` finds Team.',
      },
    },
  },
  args: {
    defaultValue: 'team',
    children: [
      <SelectCombobox key='combobox' aria-label='Plan'>
        <SelectValue style={{ gap: 12 }} placeholder='Choose a plan' />
        <SelectIcon />
      </SelectCombobox>,
      <SelectListbox key='listbox'>
        <SelectOption style={{ gap: 12 }} value='starter' label='Starter'>
          <Icon size='sm'><Rocket /></Icon>
          Starter, for one person
        </SelectOption>
        <SelectOption style={{ gap: 12 }} value='team' label='Team'>
          <Icon size='sm'><Users /></Icon>
          Team, up to 20 people
        </SelectOption>
        <SelectOption style={{ gap: 12 }} value='enterprise' label='Enterprise' disabled>
          <Icon size='sm'><Lock /></Icon>
          Enterprise, contact sales
        </SelectOption>
      </SelectListbox>,
    ],
  },
};

export const InlineVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: '`variant="inline"` drops the field look, so the select reads as a part of a sentence.',
      },
    },
  },
  args: {
    variant: 'inline',
    defaultValue: 'weekly',
    style: undefined,
    children: [
      <div key='sentence' style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Text size={3}>Email me</Text>
        <SelectCombobox aria-label='Email frequency' style={{ width: 'auto' }}>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <Text size={3}>about updates.</Text>
      </div>,
      <SelectListbox key='listbox'>
        <SelectOption value='daily'>daily</SelectOption>
        <SelectOption value='weekly'>weekly</SelectOption>
        <SelectOption value='monthly'>monthly</SelectOption>
      </SelectListbox>,
    ],
  },
};

export const DisabledAndReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: '`disabled` leaves the tab order and the form submission. `readOnly` stays focusable and still submits its value, but the list does not open.',
      },
    },
  },
  render: ({ style }) => (
    <div style={{ display: 'grid', gap: 12, ...style }}>
      <Select disabled defaultValue='team'>
        <SelectCombobox aria-label='Plan, disabled'>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='team'>Team (managed by your admin)</SelectOption>
        </SelectListbox>
      </Select>
      <Select readOnly defaultValue='team'>
        <SelectCombobox aria-label='Plan, read-only'>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='team'>Team (active until December)</SelectOption>
        </SelectListbox>
      </Select>
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
    children: [
      <SelectCombobox key='combobox' aria-label='Country'>
        <SelectValue placeholder='Choose a country' />
        <SelectIcon />
      </SelectCombobox>,
      <SelectListbox key='listbox'>
        {COUNTRIES.map((country) => <SelectOption key={country} value={country}>{country}</SelectOption>)}
      </SelectListbox>,
    ],
  },
};

export const InDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The list renders in the top layer, so the dialog does not clip it, and the first `Escape` closes only the list.',
      },
    },
  },
  render: function InDialogStory() {
    const [template, setTemplate] = useState<string | number | null | undefined>();

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>New document</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby='select-dialog-title'>
          <div style={{ display: 'grid', gap: 12 }}>
            <Heading id='select-dialog-title' as='h2' size={4} fontWeight={600}>New document</Heading>
            <Select value={template} onChangeValue={setTemplate}>
              <SelectCombobox aria-label='Template'>
                <SelectValue placeholder='Choose a template' />
                <SelectIcon />
              </SelectCombobox>
              <SelectListbox>
                <SelectOption value='blank'>Blank</SelectOption>
                <SelectOption value='report'>Report</SelectOption>
                <SelectOption value='letter'>Letter</SelectOption>
              </SelectListbox>
            </Select>
            <DialogClose asChild>
              <Button disabled={!template}>Create</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
};

export const WithFilterSearch: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A form field inside the list can take the focus, so you can filter the options yourself. This is for pointer use: from the field the keyboard cannot reach the options, and a field inside `role="listbox"` breaks ARIA. Turn `typeahead` off here.',
      },
    },
  },
  render: function WithFilterSearchStory({ style }) {
    const [country, setCountry] = useState<string | number | null | undefined>(null);
    const [search, setSearch] = useState('');

    const filtered = COUNTRIES.filter((name) => name.toLowerCase().includes(search.toLowerCase()));

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.currentTarget.value);
    };

    const onChangeOpen = (open: boolean) => {
      if (!open) setSearch('');
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      event.stopPropagation();
    };

    return (
      <Select style={style} typeahead={false} value={country} onChangeValue={setCountry} onChangeOpen={onChangeOpen}>
        <SelectCombobox aria-label='Country'>
          <SelectValue placeholder='Choose a country'>{country}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <TextField style={{ flexShrink: 0 }}>
            <TextFieldInput aria-label='Search countries' placeholder='Search' value={search} onChange={onSearch} onKeyDown={onKeyDown} />
          </TextField>
          {filtered.map((name) => <SelectOption key={name} value={name}>{name}</SelectOption>)}
        </SelectListbox>
      </Select>
    );
  },
};
