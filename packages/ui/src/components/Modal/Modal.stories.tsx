import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal.tsx';
import { Button } from '../Button';
import { Text } from '../Text';

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
    triggerSlot: (ref, props) => <Button ref={ref} {...props}>Popover</Button>,
    children: (
      <>
        <Text size={3}>Привет! Я - Popover</Text>
        <Button variant='secondary' appearance='transparent'>Согласен</Button>
      </>
    ),
    title: 'Модалка'
  },
};

export const WithoutCloseButton: Story = {
  args: {
    triggerSlot: (ref, props) => <Button ref={ref} {...props}>Popover</Button>,
    children: <Text size={3}>Привет! Я - Popover</Text>,
    title: 'Модалка',
    withClose: false,
  },
};

export const Fluid: Story = {
  args: {
    triggerSlot: (ref, props) => <Button ref={ref} {...props}>Popover</Button>,
    children: <Text size={3}>Привет! Я - Popover</Text>,
    title: 'Модалка',
    fluid: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    triggerSlot: (ref, props) => <Button ref={ref} {...props}>Popover</Button>,
    children: <Text size={3}>Привет! Я - Popover</Text>,
    withClose: false,
  },
};