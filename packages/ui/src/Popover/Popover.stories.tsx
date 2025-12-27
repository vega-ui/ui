import type { Meta, StoryObj } from '@storybook/react-vite';

import { Popover } from './Popover';
import { Button } from '../Button';
import { Text } from '../Text';
import { PopoverBackdrop, PopoverContent, PopoverTrigger } from './components';
import { useState } from 'react';
import { TextField, TextFieldInput } from '../TextField';
import { Separator } from '../Separator';
import { Heading } from '../Heading';

const meta = {
  title: 'Overlay/Popover/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1686&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const contentSx = {
  maxWidth: 300,
};

const actionsListSx = {
  display: 'grid',
  gap: 6,
};

export const Default: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Popover</Button>
        </PopoverTrigger>
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Hi! I’m a Popover
          </Heading>
          <Text asChild size={2}>
            <p>Quick actions and small content next to the trigger.</p>
          </Text>
          <Button variant='secondary' appearance='transparent' onClick={(e) => console.log(e)}>
            OK
          </Button>
        </PopoverContent>
      </>
    ),
  },
};

export const WithBackdrop: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Popover</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Popover with Backdrop
          </Heading>
          <Text asChild size={2}>
            <p>Clicking outside the content should close it.</p>
          </Text>
          <Button variant='secondary' appearance='transparent' onClick={(e) => console.log(e)}>
            Got it
          </Button>
        </PopoverContent>
      </>
    ),
  },
};

export const HelpTooltip: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='transparent'>
            What is this?
          </Button>
        </PopoverTrigger>
        <PopoverContent style={contentSx}>
          <Text size={2}>Popover works well for small contextual hints near a UI element.</Text>
        </PopoverContent>
      </>
    ),
  },
};

export const ConfirmAction: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Delete</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Delete the file?
          </Heading>
          <Text asChild size={2}>
            <p>This action can’t be undone.</p>
          </Text>
          <Separator style={{ marginBlock: 12 }} />
          <Button onClick={() => console.log('confirm delete')}>Delete</Button>
        </PopoverContent>
      </>
    ),
  },
};

export const QuickActions: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary'>Actions</Button>
        </PopoverTrigger>
        <PopoverContent style={contentSx}>
          <Text size={3}>Quick actions</Text>
          <div style={actionsListSx}>
            <Button appearance='transparent' variant='secondary' onClick={() => console.log('rename')}>
              Rename
            </Button>
            <Button appearance='transparent' variant='secondary' onClick={() => console.log('duplicate')}>
              Duplicate
            </Button>
            <Button appearance='transparent' variant='secondary' onClick={() => console.log('share')}>
              Share
            </Button>
          </div>
        </PopoverContent>
      </>
    ),
  },
};

export const UserMenu: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='transparent'>
            Profile
          </Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent>
          <div style={{ display: 'grid', gap: 2 }}>
            <Text size={3}>Name</Text>
            <Text size={2}>example@example.com</Text>
          </div>
          <Separator style={{ marginBlock: 12 }} />
          <div>
            <Button fullWidth appearance='transparent' variant='secondary' onClick={() => console.log('settings')}>
              Settings
            </Button>
            <Button fullWidth appearance='transparent' variant='secondary' onClick={() => console.log('billing')}>
              Billing
            </Button>
            <Button fullWidth appearance='transparent' variant='secondary' onClick={() => console.log('logout')}>
              Log out
            </Button>
          </div>
        </PopoverContent>
      </>
    ),
  },
};

export const InlineForm: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Rename</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Rename
          </Heading>
          <Text asChild size={2}>
            <p>Enter a new name and save it.</p>
          </Text>
          <TextField style={{ marginBlock: 12 }}>
            <TextFieldInput placeholder='Document' />
          </TextField>
          <Button size='sm' onClick={() => console.log('save rename')}>
            Save
          </Button>
        </PopoverContent>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary'>Rules</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Notes
          </Heading>
          <Text asChild size={2}>
            <p>
              Popover is best for short content. If you need long text, lists, or complex forms, you probably want a
              Dialog / Drawer instead.
            </p>
          </Text>
          <Separator style={{ marginBlock: 12 }} />
          <Text size={2}>
            • Close on outside click <br />
            • Escape to close <br />
            • Logical tab order
          </Text>
          <Button variant='secondary' appearance='transparent' onClick={() => console.log('ok')}>
            OK
          </Button>
        </PopoverContent>
      </>
    ),
  },
};

export const NestedPopover: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary'>Open menu</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Menu
          </Heading>
          <Text asChild size={2}>
            <p>There’s another popover inside.</p>
          </Text>
          
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Popover>
              <PopoverTrigger asChild>
                <Button appearance='transparent' variant='secondary'>
                  More…
                </Button>
              </PopoverTrigger>
              <PopoverContent style={contentSx}>
                <Text size={3}>Nested</Text>
                <div style={actionsListSx}>
                  <Button appearance='transparent' variant='secondary' onClick={() => console.log('nested action 1')}>
                    Action 1
                  </Button>
                  <Button appearance='transparent' variant='secondary' onClick={() => console.log('nested action 2')}>
                    Action 2
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button onClick={() => console.log('primary action')}>Primary</Button>
          </div>
        </PopoverContent>
      </>
    ),
  },
};

export const ControlledExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='secondary' onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Open'} Popover
          </Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Controlled
          </Heading>
          <Text asChild size={2}>
            <p>State is controlled externally via open/onOpenChange.</p>
          </Text>
          <Separator style={{ marginBlock: 12 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button variant='secondary' appearance='transparent' onClick={() => setOpen(false)}>
              Done
            </Button>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
