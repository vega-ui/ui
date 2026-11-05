import type { Meta, StoryObj } from '@storybook/react-vite';

import { CSSProperties } from 'react';
import { MeterStack, MeterStackProps } from './MeterStack';
import { MeterStackSegment } from './components';

const meta = {
  title: 'Feedback/MeterStack',
  component: MeterStack,
  subcomponents: {
    MeterStackSegment,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2273-5914&t=RUt89rPgQMrw8K8U-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    max: {
      control: 'number',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  args: {
    value: 0.75,
    style: { width: 400 },
    children: [
      <MeterStackSegment key={0} aria-label='Photos' value={0.15} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-100)' } as CSSProperties} />,
      <MeterStackSegment key={1} aria-label='Videos' value={0.35} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-300)' } as CSSProperties} />,
      <MeterStackSegment key={2} aria-label='Documents' value={0.2} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-500)' } as CSSProperties} />,
      <MeterStackSegment key={3} aria-label='Other' value={0.05} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-700)' } as CSSProperties} />,
    ],
  },
} satisfies Meta<typeof MeterStack>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: MeterStackProps['size'][] = ['sm', 'md', 'lg'];

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sizes.map((size) => (
        <MeterStack key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Edge: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <MeterStack {...args} value={1.4}>
        <MeterStackSegment aria-label='Used' value={0.8} />
        <MeterStackSegment aria-label='Overage' value={0.6} style={{ '--meter-stack-segment-color': 'var(--color-error)' } as CSSProperties} />
      </MeterStack>
      <MeterStack {...args} value={0.03}>
        <MeterStackSegment aria-label='System' value={0.001} />
        <MeterStackSegment aria-label='Cache' value={0.005} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-300)' } as CSSProperties} />
        <MeterStackSegment aria-label='Logs' value={0.024} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-700)' } as CSSProperties} />
      </MeterStack>
    </div>
  ),
};
