import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogTrigger } from './DialogTrigger.tsx';
import { Button } from '../../../Button';
import { Dialog } from '../../Dialog.tsx';

const meta = {
  title: 'Overlay/Dialog/DialogTrigger',
  component: DialogTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DialogTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(props) {
    return (
      <Dialog>
        <DialogTrigger {...props} asChild>
          <Button>Open</Button>
        </DialogTrigger>
      </Dialog>
    )
  }
}