import type { Meta, StoryObj } from '@storybook/react-vite';
import { SliderHiddenInput } from './SliderHiddenInput.tsx';
import { Slider } from '../../Slider';
import { SliderThumb } from '../SliderThumb';
import { SliderProgress } from '../SliderProgress';
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
  title: 'Form/Sliders/Slider/SliderHiddenInput',
  component: SliderHiddenInput,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2323&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    name: 'slider'
  },
  decorators(Story, ctx) {
    const step = ctx.parameters?.step === 'any' ? 'any' : 1
    return (
      <form onSubmit={onSubmit}>
        <Slider step={step} style={{ width: 300 }}>
          <SliderProgress />
          <SliderThumb>
            <Story />
          </SliderThumb>
        </Slider>
        <Button type='submit'>Submit</Button>
      </form>
    )
  }
} satisfies Meta<typeof SliderHiddenInput>;

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