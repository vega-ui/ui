import type { Meta, StoryObj } from '@storybook/react';
import { ModalContent } from './ModalContent.tsx';
import { Text } from '../../../Text';
import { Modal } from '../../Modal.tsx';
import { ModalTrigger } from '../ModalTrigger';
import { Button } from '../../../Button';

const meta = {
  title: 'UI-Core/Modal/ModalContent',
  component: ModalContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>Modal content</Text>
  },
  render(props) {
    return (
      <Modal>
        <ModalTrigger asChild>
          <Button>Open</Button>
        </ModalTrigger>
        <ModalContent {...props} />
      </Modal>
    )
  }
}