import type { Meta, StoryObj } from '@storybook/react-vite';

import { BoldIcon } from '@vega-ui/icons';
import { Icon } from '../Icon';
import { Toggle } from './Toggle';

const meta = {
  title: 'Actions/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    children: 'Preview',
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const states = [
  { state: 'released', defaultPressed: false, disabled: false },
  { state: 'pressed', defaultPressed: true, disabled: false },
  { state: 'disabled', defaultPressed: false, disabled: true },
  { state: 'pressed and disabled', defaultPressed: true, disabled: true },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length * 2}, auto)`, gap: 16, alignItems: 'center' }}>
      {states.flatMap((row) => sizes.flatMap((size) => [
        <Toggle key={`${row.state}-${size}`} size={size} defaultPressed={row.defaultPressed} disabled={row.disabled}>Preview</Toggle>,
        <Toggle key={`${row.state}-${size}-icon`} square size={size} aria-label={`Bold, ${row.state}, ${size}`} defaultPressed={row.defaultPressed} disabled={row.disabled}>
          <Icon><BoldIcon /></Icon>
        </Toggle>,
      ]))}
    </div>
  ),
};
