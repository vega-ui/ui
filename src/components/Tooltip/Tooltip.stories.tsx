import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip.tsx';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Modal } from '../Modal';
import { TextField } from '../TextField';

const meta = {
  title: 'UI/Tooltip',
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
    triggerSlot: (ref, props) => <Button ref={ref} {...props}>Popover</Button>,
    children: 'Привет! Я - Tooltip'
  },
};

export const WithIconButton: Story = {
  args: {
    triggerSlot: (ref, props) => <IconButton ref={ref} {...props} name='support' />,
    children: 'Помощь'
  },
};

export const WithIcon: Story = {
  args: {
    triggerSlot: (ref, props) => <Icon ref={ref} {...props} name='info' />,
    children: 'Здесь просто текст Tooltip'
  },
};

export const InsideModal: Story = {
  args: {
    triggerSlot: (ref, props) => <Icon ref={ref} {...props} name='info' />,
    children: 'Здесь просто текст Tooltip'
  },
  render(props) {
    return (
      <Modal title='Модалка' triggerSlot={(ref, props) => <Button ref={ref} {...props}>Открыть</Button>}>
        <TextField endSlot={<Tooltip triggerSlot={(ref, props) => <Icon ref={ref} {...props} name='info' />} {...props} />} />
      </Modal>
    )
  }
};