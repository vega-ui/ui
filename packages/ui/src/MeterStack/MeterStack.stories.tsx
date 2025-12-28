import type { Meta, StoryObj } from '@storybook/react-vite';

import { MeterStack } from './MeterStack';
import { MeterStackSegment } from './components';
import { CSSProperties } from 'react';
 
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MeterStack> = {
  title: 'Feedback/MeterStack/MeterStack',
  component: MeterStack,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2273-5914&t=RUt89rPgQMrw8K8U-11',
    },
  },
  args: {
    style: { width: 400 }
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <MeterStackSegment value={.15} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-100)' } as CSSProperties} />,
      <MeterStackSegment value={.35} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-300)' } as CSSProperties} />,
      <MeterStackSegment value={.2} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-500)' } as CSSProperties} />,
      <MeterStackSegment value={.05} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-700)' } as CSSProperties} />
    ]
  },
};