import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCardContent } from './CheckboxCardContent.tsx';
import { CheckboxCardTitle } from '../CheckboxCardTitle';
import { CheckboxCardDescription } from '../CheckboxCardDescription';

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardContent',
  component: CheckboxCardContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CheckboxCardContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <CheckboxCardTitle key={0}>Hello</CheckboxCardTitle>,
      <CheckboxCardDescription key={1}>I'm a card!</CheckboxCardDescription>
    ],
  }
}