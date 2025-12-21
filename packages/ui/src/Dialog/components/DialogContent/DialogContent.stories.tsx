import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogContent } from './DialogContent.tsx';
import { Text } from '../../../Text';
import { Dialog } from '../../Dialog.tsx';
import { DialogTrigger } from '../DialogTrigger';
import { Button } from '../../../Button';

const meta = {
  title: 'Overlay/Dialog/DialogContent',
  component: DialogContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DialogContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>Dialog content</Text>
  },
  render(props) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent {...props} />
      </Dialog>
    )
  }
}