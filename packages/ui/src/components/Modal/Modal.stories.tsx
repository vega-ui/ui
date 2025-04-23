import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal.tsx';
import { Button } from '../Button';
import { Text } from '../Text';
import { ModalHeader, ModalTrigger } from './components';
import { ModalContent } from './components/ModalContent';

const meta = {
  title: 'UI-Core/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <ModalTrigger asChild>
          <Button>Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <Text size={3}>Привет! Я - Modal</Text>
          <Button variant='secondary' appearance='transparent'>Согласен</Button>
        </ModalContent>
      </>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <ModalTrigger asChild>
          <Button>Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader title='Hello' />
          <Text size={3}>Привет! Я - Modal</Text>
          <Button variant='secondary' appearance='transparent'>Согласен</Button>
        </ModalContent>
      </>
    ),
  },
};

export const Fluid: Story = {
  args: {
    children: (
      <>
        <ModalTrigger asChild>
          <Button>Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <Text size={3}>Привет! Я - Modal</Text>
          <Button variant='secondary' appearance='transparent'>Согласен</Button>
        </ModalContent>
      </>
    ),
  },
};