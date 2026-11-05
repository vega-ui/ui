import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider, SliderProps } from './Slider';
import { SliderRange, SliderThumb, SliderThumbIndicator, SliderThumbInput, SliderTrack } from './components';

type SliderStoryProps = Omit<SliderProps, 'value' | 'defaultValue' | 'onChangeValue'>;

const meta: Meta<SliderStoryProps> = {
  title: 'Form/Selectors/Slider',
  component: Slider,
  subcomponents: {
    SliderTrack,
    SliderRange,
    SliderThumb,
    SliderThumbInput,
    SliderThumbIndicator,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4344&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    disabled: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
  args: {
    style: { width: '400px' },
    children: [
      <SliderTrack key='track'>
        <SliderRange />
      </SliderTrack>,
      <SliderThumb key='thumb'>
        <SliderThumbInput aria-label='Value' />
        <SliderThumbIndicator />
      </SliderThumb>,
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: SliderProps['size'][] = ['sm', 'md', 'lg'];
const variants: SliderProps['variant'][] = ['primary', 'secondary'];
const orientations: SliderProps['orientation'][] = ['horizontal', 'vertical'];
const rows = orientations.flatMap((orientation) => variants.flatMap((variant) => [false, true].map((disabled) => ({ orientation, variant, disabled }))));

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 32, alignItems: 'center', justifyItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => {
        const name = `${row.orientation} / ${row.variant}${row.disabled ? ' / disabled' : ''} / ${size}`;
        const style = row.orientation === 'vertical' ? { height: 160 } : { width: 200 };

        return (
          <Slider key={name} {...row} size={size} defaultValue={[30, 70]} style={style}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0}>
              <SliderThumbInput aria-label={`${name} from`} />
              <SliderThumbIndicator />
            </SliderThumb>
            <SliderThumb index={1}>
              <SliderThumbInput aria-label={`${name} to`} />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        );
      }))}
    </div>
  ),
};
