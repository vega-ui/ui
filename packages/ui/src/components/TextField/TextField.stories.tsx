import type { Meta, StoryObj } from '@storybook/react';

import { TextField, TextFieldProps } from './TextField.tsx';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { CloudIcon } from '@vega-ui/icons';

const sizes: TextFieldProps['size'][] = ['small', 'medium', 'large']

const meta = {
  title: 'UI-Core/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1782&t=2RYEGgF9z3n5SpP5-11',
    },
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

export const Sizes: Story = {
  render(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sizes.map((size) => <TextField size={size} {...props} />)}
      </div>
    )
  }
};

export const WithStartSlot: Story = {
  render(props) {
    return <TextField {...props} placeholder='Домен' startSlot={<Icon size='xs'><CloudIcon /></Icon>} />
  }
}

export const WithEndSlot: Story = {
  render(props) {
    return <TextField {...props} placeholder='Домен' endSlot={<IconButton variant='primary' appearance='transparent' size='small' aria-label='Отправить'><CloudIcon /></IconButton>} />
  }
}