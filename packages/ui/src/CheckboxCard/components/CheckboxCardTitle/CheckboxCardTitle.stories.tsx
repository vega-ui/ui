import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCardTitle } from './CheckboxCardTitle';

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardTitle',
  component: CheckboxCardTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CheckboxCardTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Hello!'
  }
}