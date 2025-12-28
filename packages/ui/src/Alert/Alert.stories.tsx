import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Smile, X } from '@vega-ui/icons'
import { AlertContent, AlertIcon, AlertMain, AlertTitle } from './components';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Link } from '../Link';
import { Code } from '../Code';
import { AlertAppearance, AlertVariant } from './types';

const variants: AlertVariant[] = ['info', 'error', 'success', 'warning']
const appearances: AlertAppearance[] = ['fill', 'surface']

const meta = {
  title: 'Feedback/Alert/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-548&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['error', 'success', 'warning', 'info'],
    },
    appearance: {
      control: 'radio',
      options: ['fill', 'surface'],
    }
  },
  args: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <AlertIcon />,
      <AlertMain>
        <AlertTitle>I'm a title</AlertTitle>
        <AlertContent>I'm a content!</AlertContent>
      </AlertMain>
    ]
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'success',
    children: [
      <AlertIcon>
        <Smile />
      </AlertIcon>,
      <AlertMain>
        <AlertTitle>I'm a title</AlertTitle>
        <AlertContent>I'm a content!</AlertContent>
      </AlertMain>
    ]
  },
};

export const WithoutContent: Story = {
  args: {
    children: [
      <AlertIcon />,
      <AlertMain>
        <AlertTitle>I'm a title</AlertTitle>
      </AlertMain>
    ]
  },
};

export const WithoutIcon: Story = {
  args: {
    children: (
      <AlertMain>
        <AlertTitle>I'm a title</AlertTitle>
        <AlertContent>I'm a content!</AlertContent>
      </AlertMain>
    )
  },
};

export const WithAction: Story = {
  args: {
    children: [
      <AlertIcon />,
      <AlertMain>
        <AlertTitle>I'm a title</AlertTitle>
        <AlertContent>I'm a content!</AlertContent>
      </AlertMain>,
      <IconButton variant='secondary' size='xs'>
        <Icon><X /></Icon>
      </IconButton>
    ]
  },
};

export const WithCustomChildren: Story = {
  args: {
    children: [
      <AlertIcon />,
      <AlertMain>
        <AlertTitle>I'm a title</AlertTitle>
        <AlertContent>
          Hello, it's an <Link size={2}>example.com</Link>. Also let's print <Code size={2}>Hello, world!</Code>
        </AlertContent>
      </AlertMain>
    ]
  },
};

export const All: Story = {
  args: {},
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {variants.map((variant) => (
          appearances.map((appearance) => (
            <Alert appearance={appearance} variant={variant}>
              <AlertIcon />
              <AlertMain>
                <AlertTitle>{`I'm a ${variant}/${appearance}`}</AlertTitle>
                <AlertContent>I'm a content!</AlertContent>
              </AlertMain>
            </Alert>
          ))
        ))}
      </div>
    )
  }
};