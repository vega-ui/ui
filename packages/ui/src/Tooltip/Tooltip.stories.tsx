import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BoldIcon, InfoIcon, ItalicIcon, LinkIcon, Redo2Icon, UnderlineIcon, Undo2Icon } from '@vega-ui/icons';

import { Tooltip } from './Tooltip';
import { TooltipArrow, TooltipContent, TooltipTrigger } from './components';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Label } from '../Label';
import { TextField, TextFieldInput } from '../TextField';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';
import { Heading } from '../Heading';

const TOOLS = [
  { label: 'Undo', shortcut: '⌘Z', icon: <Undo2Icon /> },
  { label: 'Redo', shortcut: '⇧⌘Z', icon: <Redo2Icon /> },
  { label: 'Bold', shortcut: '⌘B', icon: <BoldIcon /> },
  { label: 'Italic', shortcut: '⌘I', icon: <ItalicIcon /> },
  { label: 'Underline', shortcut: '⌘U', icon: <UnderlineIcon /> },
  { label: 'Insert link', shortcut: '⌘K', icon: <LinkIcon /> },
];

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  subcomponents: {
    TooltipTrigger,
    TooltipContent,
    TooltipArrow,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1763&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
  args: {
    delayOpen: 500,
    delayClose: 0,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [
      <TooltipTrigger key='trigger' asChild>
        <Button variant='secondary'>Save draft</Button>
      </TooltipTrigger>,
      <TooltipContent key='content'>
        <TooltipArrow />
        <Text size={2}>Drafts are saved automatically every minute</Text>
      </TooltipContent>,
    ],
  },
};

export const IconButtons: Story = {
  name: 'Icon buttons',
  parameters: {
    docs: {
      description: {
        story: 'The tooltip repeats the button’s accessible name; the icon itself stays silent.',
      },
    },
  },
  args: {
    children: [
      <TooltipTrigger key='trigger' asChild>
        <IconButton aria-label='More information' appearance='transparent'>
          <Icon><InfoIcon /></Icon>
        </IconButton>
      </TooltipTrigger>,
      <TooltipContent key='content'>
        <TooltipArrow />
        <Text size={2}>More information</Text>
      </TooltipContent>,
    ],
  },
};

export const Toolbar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Once one tooltip has shown, moving to a neighbour shows its tooltip at once, without the delay.',
      },
    },
  },
  render: (args) => (
    <div role='toolbar' aria-label='Formatting' style={{ display: 'flex', gap: 4 }}>
      {TOOLS.map(({ label, shortcut, icon }) => (
        <Tooltip key={label} {...args}>
          <TooltipTrigger asChild>
            <IconButton aria-label={label} appearance='transparent' variant='secondary'>
              <Icon>{icon}</Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>{`${label} ${shortcut}`}</Text>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Tooltip open={open} onChangeOpen={setOpen}>
          <TooltipTrigger asChild>
            <Button>Publish</Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>Visible to everyone with the link</Text>
          </TooltipContent>
        </Tooltip>
        <Button variant='secondary' onClick={() => setOpen(!open)}>Toggle hint</Button>
        <Text size={2}>open: {String(open)}</Text>
      </div>
    );
  },
};

export const InsideDialog: Story = {
  name: 'Inside a dialog',
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Invite member</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='invite-title'>
        <Heading id='invite-title' as='h2' size={4} fontWeight={600}>Invite member</Heading>
        <form method='dialog' style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Label htmlFor='invite-email'>Email</Label>
            <Tooltip {...args}>
              <TooltipTrigger asChild>
                <IconButton aria-label='Who can be invited' appearance='transparent' size='sm'>
                  <Icon><InfoIcon /></Icon>
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <Text size={2}>Only addresses from your organization’s domain</Text>
              </TooltipContent>
            </Tooltip>
          </div>
          <TextField>
            <TextFieldInput id='invite-email' type='email' placeholder='name@company.com' required />
          </TextField>
          <Button type='submit'>Send invite</Button>
        </form>
      </DialogContent>
    </Dialog>
  ),
};
