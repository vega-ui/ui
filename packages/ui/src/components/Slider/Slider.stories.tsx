import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from './Slider.tsx';
import { SliderProgress, SliderThumb } from './components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Slider> = {
  title: 'Form/Sliders/Slider/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4344&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    style: { width: '400px' },
    children: [
      <SliderProgress />,
      <SliderThumb />
    ]
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    style: { height: '400px' }
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};