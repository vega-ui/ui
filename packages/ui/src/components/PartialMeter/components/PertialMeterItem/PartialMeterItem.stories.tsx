import type { Meta, StoryObj } from '@storybook/react';

import { CSSProperties } from 'react';
import { PartialMeterItem } from './PertialMeterItem.tsx';
import { PartialMeter } from '../../PartialMeter.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PartialMeterItem> = {
  title: 'UI-Core/PartialMeter/PartialMeterItem',
  component: PartialMeterItem,
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
    style: { '--meter-item-color': 'var(--color-blue-accent-500)'} as CSSProperties
  },
  render(props) {
    return (
      <PartialMeter style={{ width: '150px' }} value={1}>
        <PartialMeterItem {...props} />
      </PartialMeter>
    )
  }
};