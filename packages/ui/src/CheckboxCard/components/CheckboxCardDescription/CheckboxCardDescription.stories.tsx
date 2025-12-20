import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCardDescription } from './CheckboxCardDescription';

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardDescription',
  component: CheckboxCardDescription,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CheckboxCardDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'I\'m a card!'
  }
}