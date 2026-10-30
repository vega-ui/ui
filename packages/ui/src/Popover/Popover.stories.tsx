import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Placement } from '@floating-ui/react';

import { Popover } from './Popover';
import { PopoverContent, PopoverTrigger } from './components';
import { Button } from '../Button';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { Label } from '../Label';
import { TextField, TextFieldInput } from '../TextField';

const PLACEMENTS: Placement[] = [
  'top-start', 'top', 'top-end',
  'left', 'right',
  'bottom-start', 'bottom', 'bottom-end',
];

const meta = {
  title: 'Overlay/Popover',
  component: Popover,
  subcomponents: {
    PopoverTrigger,
    PopoverContent,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1686&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
  },
  args: {
    placement: 'bottom',
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [
      <PopoverTrigger key='trigger' asChild>
        <Button>Share</Button>
      </PopoverTrigger>,
      <PopoverContent key='content'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 260 }}>
          <Heading size={5} fontWeight={600} as='h3'>Share project</Heading>
          <Text size={2}>Anyone with the link can view this project.</Text>
          <Button onClick={() => navigator.clipboard?.writeText(location.href)}>Copy link</Button>
        </div>
      </PopoverContent>,
    ],
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 8 }}>
      {PLACEMENTS.map((placement) => (
        <Popover key={placement} placement={placement}>
          <PopoverTrigger asChild>
            <Button variant='secondary'>{placement}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Text size={2}>{`Grows out of the side facing ${placement}.`}</Text>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const Menu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A controlled popover closes itself when an item is chosen.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover placement='bottom-start' open={open} onChangeOpen={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='secondary'>Ada Lovelace</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ display: 'grid', gap: 4, minWidth: 180 }}>
            {['Profile', 'Settings', 'Sign out'].map((item) => (
              <Button key={item} appearance='transparent' variant='secondary' onClick={() => setOpen(false)}>
                {item}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const Form: Story = {
  args: {
    role: 'dialog',
    placement: 'bottom-start',
    children: [
      <PopoverTrigger key='trigger' asChild>
        <Button>Add link</Button>
      </PopoverTrigger>,
      <PopoverContent key='content'>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 260 }}
          onSubmit={(event) => event.preventDefault()}
        >
          <Label htmlFor='link-url'>URL</Label>
          <TextField>
            <TextFieldInput id='link-url' type='url' placeholder='https://' required />
          </TextField>
          <Button type='submit'>Insert</Button>
        </form>
      </PopoverContent>,
    ],
  },
};

export const Confirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover role='dialog' open={open} onChangeOpen={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='secondary'>Archive</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 260 }}>
            <Text size={2}>Archive this project? You can restore it later.</Text>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button appearance='transparent' variant='secondary' onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Archive</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const Nested: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popovers stack: `Escape` or an outside click closes the inner one first.',
      },
    },
  },
  args: {
    placement: 'bottom-start',
    children: [
      <PopoverTrigger key='trigger' asChild>
        <Button variant='secondary'>Filters</Button>
      </PopoverTrigger>,
      <PopoverContent key='content'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 260 }}>
          <Text size={2}>Status: open, in review</Text>
          <Popover placement='right-start'>
            <PopoverTrigger asChild>
              <Button appearance='transparent' variant='secondary'>More filters…</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Text size={2}>Assignee, labels, milestone</Text>
            </PopoverContent>
          </Popover>
        </div>
      </PopoverContent>,
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Popover open={open} onChangeOpen={setOpen}>
          <PopoverTrigger asChild>
            <Button>Notifications</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Text size={2}>You’re all caught up.</Text>
          </PopoverContent>
        </Popover>
        <Text size={2}>open: {String(open)}</Text>
      </div>
    );
  },
};
