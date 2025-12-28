import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogContent } from './DialogContent';
import { Text } from '../../../Text';
import { DialogTitle } from '../DialogTitle';
import { DialogHeader } from '../DialogHeader';
import { DialogCloseButton } from '../DialogCloseButton';
import { Dialog } from '../../Dialog';
import { DialogTrigger } from '../DialogTrigger';
import { Button } from '../../../Button';
import { DialogPortal } from '../DialogPortal';
import { DialogBackdrop } from '../DialogBackdrop';

const meta = {
  title: 'Overlay/Dialog/DialogContent',
  component: DialogContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogBackdrop>
            <Story />
          </DialogBackdrop>
        </DialogPortal>
      </Dialog>
    )
  }
} satisfies Meta<typeof DialogContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <DialogHeader key={0}>
        <DialogTitle>Title</DialogTitle>
        <DialogCloseButton />
      </DialogHeader>,
      <Text key={1}>Dialog content</Text>
    ]
  }
}