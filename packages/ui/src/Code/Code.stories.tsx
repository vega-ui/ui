import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code } from './Code';
import { TextSize } from '../Text';

const sizes: TextSize[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const meta = {
  title: 'Typography/Code',
  component: Code,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1572&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
  },
  args: {
    children: 'sudo apt-get update',
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
      {sizes.map((size) => (
        <Code key={size} size={size}>{`sudo apt-get update / ${size}`}</Code>
      ))}
    </div>
  ),
};

export const LongPath: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Code>/Users/someone/projects/very-long-repository-name/packages/ui/src/components/DeeplyNestedComponent/index.tsx</Code>
    </div>
  ),
};
