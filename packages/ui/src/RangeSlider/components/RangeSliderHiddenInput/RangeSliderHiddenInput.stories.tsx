import type { Meta, StoryObj } from '@storybook/react-vite';
import { RangeSliderHiddenInput } from './RangeSliderHiddenInput';
import { RangeSlider } from '../../RangeSlider';
import { RangeSliderThumb } from '../RangeSliderThumb';
import { RangeSliderProgress } from '../RangeSliderProgress';
import { Button } from '../../../Button';
import { FormEvent } from 'react';

const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  const formData = new FormData(e.currentTarget)
  const object: Record<string, unknown> = {};
  formData.forEach((value, key) => object[key] = value);
  alert(JSON.stringify(object))
}

const meta = {
  title: 'Form/Sliders/RangeSlider/RangeSliderHiddenInput',
  component: RangeSliderHiddenInput,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2323&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story, ctx) {
    const step = ctx.parameters?.step === 'any' ? 'any' : 1
    return (
      <form onSubmit={onSubmit}>
        <RangeSlider step={step} style={{ width: 300 }}>
          <RangeSliderProgress />
          <RangeSliderThumb index={0}>
            <Story args={{ ...ctx.args, name: 'from' }} />
          </RangeSliderThumb>
          <RangeSliderThumb index={1}>
            <Story args={{ ...ctx.args, name: 'to' }} />
          </RangeSliderThumb>
        </RangeSlider>
        <Button type='submit'>Submit</Button>
      </form>
    )
  }
} satisfies Meta<typeof RangeSliderHiddenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {}
}

export const AnyStep: Story = {
  parameters: {
    step: 'any'
  }
}