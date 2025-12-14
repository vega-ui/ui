import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTitle } from './AlertTitle.tsx';
import { Alert } from '../../Alert.tsx';
import { AlertContent } from '../AlertContent';
import { AlertMain } from '../AlertMain';
import { AlertIcon } from '../AlertIcon';

const meta = {
  title: 'Feedback/Alert/AlertTitle',
  component: AlertTitle,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Alert>
        <AlertIcon />
        <AlertMain>
          <Story />
          <AlertContent>
            Content
          </AlertContent>
        </AlertMain>
      </Alert>
    )
  }
} satisfies Meta<typeof AlertTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'I\'m a title'
  }
}