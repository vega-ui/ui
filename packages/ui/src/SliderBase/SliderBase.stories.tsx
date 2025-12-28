import type { Meta, StoryObj } from '@storybook/react-vite';

import { SliderBase, SliderBaseProps } from './SliderBase';
import { SliderBaseHiddenInput, SliderBaseProgress, SliderBaseThumb } from './components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SliderBase> = {
  title: 'Form/Sliders/SliderBase/SliderBase',
  component: SliderBase,
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
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 20,
  },
  render(props: SliderBaseProps) {
    const { value, orientation, style = {} } = props

    return (
      <SliderBase {...props} style={orientation === 'vertical' ? { height: '400px', ...style } : { width: '400px', ...style }}>
        <SliderBaseProgress orientation={props.orientation} value={value} />
        <SliderBaseThumb orientation={props.orientation} value={value}>
          <SliderBaseHiddenInput value={value} name='default' />
        </SliderBaseThumb>
      </SliderBase>
    )
  }
};