import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField.tsx';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

const meta = {
  title: 'UI/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: 'Hello',
  },
};

export const WithStartSlot: Story = {
  render(props) {
    return <TextField {...props} placeholder='Домен' startSlot={<Icon name='cloud' size='mini' />} />
  }
}

export const WithEndSlot: Story = {
  render(props) {
    return <TextField {...props} placeholder='Домен' endSlot={<IconButton name='cloud' variant='primary' appearance='transparent' size='small' aria-label='Отправить' />} />
  }
}