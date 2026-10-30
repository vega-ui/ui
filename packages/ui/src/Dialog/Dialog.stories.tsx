import type { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties, useState } from 'react';
import { XIcon } from '@vega-ui/icons';

import { Dialog } from './Dialog';
import { DialogClose, DialogContent, DialogTrigger } from './components';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { Label } from '../Label';
import { TextField, TextFieldInput } from '../TextField';

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  subcomponents: {
    DialogTrigger,
    DialogContent,
    DialogClose,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1644&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The heading names the dialog through `aria-labelledby`. `DialogClose` turns your own button into a close button, and buttons in a `<form method="dialog">` close it too.',
      },
    },
  },
  args: {
    children: [
      <DialogTrigger key='trigger' asChild>
        <Button>Discard draft</Button>
      </DialogTrigger>,
      <DialogContent key='content' aria-labelledby='discard-title'>
        <Heading id='discard-title' as='h2' size={4} fontWeight={600}>Discard draft?</Heading>
        <DialogClose asChild>
          <IconButton
            aria-label='Close'
            variant='secondary'
            appearance='ghost'
            style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
          >
            <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
          </IconButton>
        </DialogClose>
        <Text size={3}>The message you started will be deleted. This can’t be undone.</Text>
        <form method='dialog' style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <Button type='submit' variant='secondary' appearance='transparent'>Cancel</Button>
          <Button type='submit'>Discard</Button>
        </form>
      </DialogContent>,
    ],
  },
};

export const Form: Story = {
  args: {
    children: [
      <DialogTrigger key='trigger' asChild>
        <Button>Rename project</Button>
      </DialogTrigger>,
      <DialogContent key='content' aria-labelledby='rename-title'>
        <Heading id='rename-title' as='h2' size={4} fontWeight={600}>Rename project</Heading>
        <form method='dialog' style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 320, marginTop: 16 }}>
          <Label htmlFor='project-name'>Name</Label>
          <TextField>
            <TextFieldInput id='project-name' name='name' defaultValue='Vega UI' required autoFocus />
          </TextField>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
            <Button type='submit' formNoValidate variant='secondary' appearance='transparent'>Cancel</Button>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>,
    ],
  },
};

export const Scrollable: Story = {
  args: {
    children: [
      <DialogTrigger key='trigger' asChild>
        <Button>Read terms</Button>
      </DialogTrigger>,
      <DialogContent key='content' aria-labelledby='terms-title' style={{ maxHeight: '70vh' }}>
        <Heading id='terms-title' as='h2' size={4} fontWeight={600}>Terms of service</Heading>
        <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440, marginTop: 16 }}>
          {Array.from({ length: 12 }, (_, index) => (
            <Text key={index} size={3}>
              {index + 1}. You keep ownership of everything you create. We store your projects only to provide the
              service, never sell them, and delete them within 30 days after you close your account.
            </Text>
          ))}
        </div>
        <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button type='submit'>Accept</Button>
        </form>
      </DialogContent>,
    ],
  },
};

export const ClosedBy: Story = {
  name: 'closedBy',
  parameters: {
    docs: {
      description: {
        story: '`any` also closes on a backdrop click, `closerequest` (the default) only on `Escape`, and `none` only from inside.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {(['any', 'closerequest', 'none'] as const).map((closedBy) => (
        <Dialog key={closedBy}>
          <DialogTrigger asChild>
            <Button>{closedBy}</Button>
          </DialogTrigger>
          <DialogContent closedBy={closedBy} aria-labelledby={`${closedBy}-title`}>
            <Heading id={`${closedBy}-title`} as='h2' size={4} fontWeight={600}>{`closedBy="${closedBy}"`}</Heading>
            <Text size={3}>Try a backdrop click and Escape.</Text>
            <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <Button type='submit'>Done</Button>
            </form>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

export const Appearance: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Not blurred</Button>
        </DialogTrigger>
        <DialogContent blurred={false} aria-labelledby='not-blurred-title'>
          <Heading id='not-blurred-title' as='h2' size={4} fontWeight={600}>Not blurred</Heading>
          <Text size={3}>The page behind is dimmed but stays sharp.</Text>
          <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <Button type='submit'>Close</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Without overlay</Button>
        </DialogTrigger>
        <DialogContent overlay={false} shadowed aria-labelledby='without-overlay-title'>
          <Heading id='without-overlay-title' as='h2' size={4} fontWeight={600}>Without overlay</Heading>
          <Text size={3}>The page behind stays visible, and the dialog is still modal.</Text>
          <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <Button type='submit'>Close</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

export const Fluid: Story = {
  args: {
    fluid: true,
    children: [
      <DialogTrigger key='trigger' asChild>
        <Button>Release notes</Button>
      </DialogTrigger>,
      <DialogContent key='content' aria-labelledby='release-title'>
        <Heading id='release-title' as='h2' size={4} fontWeight={600}>Release notes</Heading>
        <Text size={3}>A fluid dialog grows with the viewport instead of keeping a fixed width.</Text>
        <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button type='submit'>Close</Button>
        </form>
      </DialogContent>,
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button onClick={() => setOpen(true)}>Open from outside</Button>
        <Text size={2}>open: {String(open)}</Text>
        <Dialog open={open} onChangeOpen={setOpen}>
          <DialogContent aria-labelledby='controlled-title'>
            <Heading id='controlled-title' as='h2' size={4} fontWeight={600}>Controlled</Heading>
            <Text size={3}>The parent owns the open state and decides when the dialog closes.</Text>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

export const Nested: Story = {
  args: {
    children: [
      <DialogTrigger key='trigger' asChild>
        <Button>Delete workspace</Button>
      </DialogTrigger>,
      <DialogContent key='content' aria-labelledby='delete-title'>
        <Heading id='delete-title' as='h2' size={4} fontWeight={600}>Delete workspace</Heading>
        <Text size={3}>All projects, members and billing history of this workspace will be removed.</Text>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <form method='dialog'>
            <Button type='submit' variant='secondary' appearance='transparent'>Cancel</Button>
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Continue</Button>
            </DialogTrigger>
            <DialogContent aria-labelledby='confirm-title'>
              <Heading id='confirm-title' as='h2' size={4} fontWeight={600}>Are you absolutely sure?</Heading>
              <Text size={3}>This dialog opens over the first one; closing it returns you there.</Text>
              <form method='dialog' style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                <Button type='submit' variant='secondary' appearance='transparent'>Cancel</Button>
                <Button type='submit'>Delete</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>,
    ],
  },
};
