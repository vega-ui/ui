import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip.tsx';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Modal, ModalContent, ModalTrigger } from '../Modal';
import { TextField } from '../TextField';
import { TooltipContent, TooltipTrigger } from './components';

const meta = {
  title: 'UI-Core/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <Button>Tooltip!</Button>
        </TooltipTrigger>
        <TooltipContent>
          Hello! I'm a tooltip
        </TooltipContent>
      </>
    )
  },
};

export const WithIconButton: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <IconButton name='support' />
        </TooltipTrigger>
        <TooltipContent>
          Support
        </TooltipContent>
      </>
    )
  },
};

export const InsideModal: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <IconButton name='info' />
        </TooltipTrigger>
        <TooltipContent>
          Info
        </TooltipContent>
      </>
    )
  },
  render(props) {
    return (
      <Modal>
        <ModalTrigger asChild>
          <Button>Open</Button>
        </ModalTrigger>
        <ModalContent>
          <TextField
            endSlot={
              <Tooltip {...props}>
                <TooltipTrigger asChild>
                  <IconButton appearance='transparent' name='info' />
                </TooltipTrigger>
                <TooltipContent>
                  Info
                </TooltipContent>
              </Tooltip>
            }
          />
        </ModalContent>
      </Modal>
    )
  }
};