import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertContent } from './AlertContent.tsx';
import { Alert } from '../../Alert.tsx';
import { AlertMain } from '../AlertMain';
import { AlertTitle } from '../AlertTitle';
import { AlertIcon } from '../AlertIcon';

const meta = {
  title: 'Feedback/Alert/AlertContent',
  component: AlertContent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Alert>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Title</AlertTitle>
          <Story />
        </AlertMain>
      </Alert>
    )
  }
} satisfies Meta<typeof AlertContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Hello!'
  }
}