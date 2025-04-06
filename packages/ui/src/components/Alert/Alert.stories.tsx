import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertProps } from './Alert.tsx';
import { IconButton } from '../IconButton';
import { Link } from '../Link';
import { Code } from '../Code';

const variants: AlertProps['variant'][] = ['info', 'error', 'success', 'warning']

const meta = {
  title: 'UI-Core/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: 'I\'m a title',
    children: 'I\'m a content!',
  },
};

export const Variants: Story = {
  args: {
    title: ''
  },
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {variants.map((variant) => (
          <Alert title={`I'm a ${variant} variant`} variant={variant}>Just a content</Alert>
        ))}
      </div>
    )
  }
};

export const WithoutContent: Story = {
  args: {
    title: 'I\'m a title',
  },
};

export const WithoutIcon: Story = {
  args: {
    icon: false,
    title: 'I\'m a title',
    children: 'I\'m a content!',
  },
};

export const WithAction: Story = {
  args: {
    title: 'I\'m a title',
    children: 'I\'m a content!',
    endSlot: (
      <IconButton size='small' name='close' iconSize='sm' appearance='transparent' />
    )
  },
};

export const WithCustomChildren: Story = {
  args: {
    title: 'I\'m a title',
    children: (
      <>
        Hello, it's an <Link size={2}>example.com</Link>. Also let's print <Code size={2}>Hello, world!</Code>
      </>
    ),
  },
};