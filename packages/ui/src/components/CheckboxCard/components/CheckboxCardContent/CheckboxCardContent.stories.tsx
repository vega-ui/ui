import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxCardContent } from './CheckboxCardContent.tsx';
import { Button } from '../../../Button';
import { CheckboxCard } from '../../CheckboxCard.tsx';

const meta = {
  title: 'UI-Core/CheckboxCard/CheckboxCardContent',
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
    title: 'Hello',
    description: 'I\'m a card!'
  }
}

export const WithChildren: Story = {
  args: {
    title: 'Hello',
    description: 'I\'m a card!',
    children: <Button style={{ marginTop: '24px' }}>I see!</Button>
  }
}

export const InsideCard: Story = {
  args: {
    title: 'Hello',
    description: 'I\'m a card!'
  },
  render(props) {
    return (
      <CheckboxCard>
        <CheckboxCardContent {...props} />
      </CheckboxCard>
    )
  }
}