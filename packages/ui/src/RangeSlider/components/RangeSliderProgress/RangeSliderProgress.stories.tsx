import type { Meta, StoryObj } from '@storybook/react-vite';
import { RangeSliderProgress } from './RangeSliderProgress';
import { RangeSlider } from '../../RangeSlider';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof RangeSliderProgress> = {
  title: 'Form/Sliders/RangeSlider/RangeSliderProgress',
  component: RangeSliderProgress,
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
  render(props) {
    const { size, orientation, style } = props

    return (
      <RangeSlider size={size} orientation={orientation} style={orientation === 'vertical' ? { height: '400px', ...style } : { width: '400px', ...style }}>
        <RangeSliderProgress {...props} />
      </RangeSlider>
    )
  }
};