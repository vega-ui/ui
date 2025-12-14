import type { Meta, StoryObj } from '@storybook/react-vite';

import { RangeSlider } from './RangeSlider.tsx';
import { RangeSliderProgress, RangeSliderThumb } from './components';
import { Text } from '../Text';
import { useId, useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof RangeSlider> = {
  title: 'Form/Sliders/RangeSlider/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4344&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {
    style: { width: 400 },
    children: [
      <RangeSliderProgress />,
      <RangeSliderThumb index={0} />,
      <RangeSliderThumb index={1} />
    ]
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabels: Story = {
  args: {},
  render(props) {
    const [value, setValue] = useState<[number, number]>([30, 70])

    const aId = useId()
    const bId = useId()

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Text asChild><label htmlFor={aId}>{value?.[0]}</label></Text>
          <Text asChild><label htmlFor={bId}>{value?.[1]}</label></Text>
        </div>
        <RangeSlider {...props} value={value} onChange={(_, value) => setValue(value)}>
          <RangeSliderProgress />
          <RangeSliderThumb id={aId} index={0} />
          <RangeSliderThumb id={bId} index={1} />
        </RangeSlider>
      </div>
    )
  }
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    style: { height: 200 },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};