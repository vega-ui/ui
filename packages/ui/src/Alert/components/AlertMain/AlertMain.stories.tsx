import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertMain } from './AlertMain';
import { AlertTitle } from '../AlertTitle';
import { AlertContent } from '../AlertContent';
import { Alert } from '../../Alert';
import { AlertIcon } from '../AlertIcon';

const meta = {
  title: 'Feedback/Alert/AlertMain',
  component: AlertMain,
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
        <Story />
      </Alert>
    )
  }
} satisfies Meta<typeof AlertMain>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <AlertTitle>I'm a title</AlertTitle>,
      <AlertContent>I'm a content!</AlertContent>
    ]
  }
}