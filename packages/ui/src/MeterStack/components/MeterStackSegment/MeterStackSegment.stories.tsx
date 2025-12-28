import type { Meta, StoryObj } from '@storybook/react-vite';

import { CSSProperties } from 'react';
import { MeterStackSegment } from './MeterStackSegment';
import { MeterStack } from '../../MeterStack';
 
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MeterStackSegment> = {
  title: 'Feedback/MeterStack/MeterStackSegment',
  component: MeterStackSegment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: .15,
    style: { '--meter-item-color': 'var(--color-blue-accent-500)' } as CSSProperties
  },
  render(props) {
    return (
      <MeterStack style={{ width: '150px' }} value={1}>
        <MeterStackSegment {...props} />
      </MeterStack>
    )
  }
};