import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogPortal } from './DialogPortal';
import { Dialog } from '../../Dialog';
import { DialogTrigger } from '../DialogTrigger';
import { Button } from '../../../Button';
import { DialogContent } from '../DialogContent';
import { DialogBackdrop } from '../DialogBackdrop';
import { DialogHeader } from '../DialogHeader';
import { DialogTitle } from '../DialogTitle';
import { DialogCloseButton } from '../DialogCloseButton';
import { Text } from '../../../Text';

const meta = {
  title: 'Overlay/Dialog/DialogPortal',
  component: DialogPortal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: [
      <DialogBackdrop>
        <DialogContent key={1}>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <Text style={{ maxWidth: 300 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </Text>
        </DialogContent>
      </DialogBackdrop>
    ]
  },
  decorators(Story) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <Story />
      </Dialog>
    )
  }
} satisfies Meta<typeof DialogPortal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}