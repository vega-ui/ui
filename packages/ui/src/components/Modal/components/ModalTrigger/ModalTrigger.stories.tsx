import type { Meta, StoryObj } from '@storybook/react';
import { ModalTrigger } from './ModalTrigger.tsx';
import { Text } from '../../../Text';
import { Button } from '../../../Button';
import { Modal } from '../../Modal.tsx';
import { ModalContent } from '../ModalContent';

const meta = {
  title: 'UI-Core/Modal/ModalTrigger',
  component: ModalTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(props) {
    return (
      <Modal>
        <ModalTrigger {...props} asChild>
          <Button>Open</Button>
        </ModalTrigger>
        <ModalContent>
          <Text>Modal content</Text>
        </ModalContent>
      </Modal>
    )
  }
}