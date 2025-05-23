import type { Meta, StoryObj } from '@storybook/react';

import { SliderProgress, SliderProgressProps } from './SliderProgress.tsx';
import { Slider } from '../../Slider.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SliderProgress> = {
  title: 'Form/Sliders/Slider/SliderProgress',
  component: SliderProgress,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4344&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(props: SliderProgressProps) {
    const { size, orientation, style } = props

    return (
      <Slider size={size} orientation={orientation} style={orientation === 'vertical' ? { height: '400px', ...style } : { width: '400px', ...style }}>
        <SliderProgress {...props} />
      </Slider>
    )
  }
};