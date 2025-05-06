import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertProps } from './Alert.tsx';
import { IconButton } from '../IconButton';
import { Link } from '../Link';
import { Code } from '../Code';
import { CloseIcon } from '@vega-ui/icons';

const variants: AlertProps['variant'][] = ['info', 'error', 'success', 'warning']

const meta = {
  title: 'UI-Core/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-548&t=2RYEGgF9z3n5SpP5-4',
    },
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
    title: 'I\'m a title',
    children: 'I\'m a content!',
  },
};

export const WithAction: Story = {
  args: {
    title: 'I\'m a title',
    children: 'I\'m a content!',
    endSlot: (
      <IconButton size='small' iconSize='sm' appearance='transparent'>
        <CloseIcon />
      </IconButton>
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