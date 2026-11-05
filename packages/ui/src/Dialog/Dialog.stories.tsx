import type { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties } from 'react';
import { XIcon } from '@vega-ui/icons';

import { Dialog, DialogProps } from './Dialog';
import { DialogClose, DialogContent, DialogContentProps, DialogTrigger } from './components';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { subcomponentArgs } from '../../../../.storybook/subcomponentArgs';

type DialogStoryProps = DialogProps & Pick<DialogContentProps, 'closedBy' | 'blurred' | 'overlay' | 'shadowed'>;

const content = subcomponentArgs(DialogContent, ['closedBy', 'blurred', 'overlay', 'shadowed']);

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
    fluid: { control: 'boolean' },
    ...content.argTypes,
  },
  args: {
    fluid: false,
    closedBy: 'closerequest',
    blurred: true,
    overlay: true,
    shadowed: true,
  },
} satisfies Meta<DialogStoryProps>;

export default meta;
type Story = StoryObj<DialogStoryProps>;

export const Playground: Story = {
  render: (args) => {
    const [contentProps, dialogProps] = content.split(args);

    return (
      <Dialog {...dialogProps}>
        <DialogTrigger asChild>
          <Button>Discard draft</Button>
        </DialogTrigger>
        <DialogContent {...contentProps} aria-labelledby='discard-title'>
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
        </DialogContent>
      </Dialog>
    );
  },
};

export const Scrollable: Story = {
  render: (args) => {
    const [contentProps, dialogProps] = content.split(args);

    return (
      <Dialog {...dialogProps}>
        <DialogTrigger asChild>
          <Button>Read terms</Button>
        </DialogTrigger>
        <DialogContent {...contentProps} aria-labelledby='terms-title' style={{ maxHeight: '70vh' }}>
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
        </DialogContent>
      </Dialog>
    );
  },
};
