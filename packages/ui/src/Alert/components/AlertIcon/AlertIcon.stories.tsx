import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertIcon } from './AlertIcon.tsx';
import { Smile } from '@vega-ui/icons';
import { Alert } from '../../Alert.tsx';
import { AlertContent } from '../AlertContent';
import { AlertMain } from '../AlertMain';
import { AlertTitle } from '../AlertTitle';

const meta = {
  title: 'Feedback/Alert/AlertIcon',
  component: AlertIcon,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Alert>
        <Story />
        <AlertMain>
          <AlertTitle>Title</AlertTitle>
          <AlertContent>Content</AlertContent>
        </AlertMain>
      </Alert>
    )
  }
} satisfies Meta<typeof AlertIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {}
}

export const CustomIcon: Story = {
  args: {
    children: (
      <Smile />
    )
  }
}