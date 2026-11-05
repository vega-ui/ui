import type { Meta, StoryObj } from '@storybook/react-vite';

import { VisuallyHidden } from './VisuallyHidden';
import { Text } from '../Text';

const meta = {
  title: 'Utils/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'This text is only announced by screen readers',
  },
  render: (args) => (
    <div>
      <Text>The text below is visually hidden:</Text>
      <VisuallyHidden {...args} />
    </div>
  ),
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
