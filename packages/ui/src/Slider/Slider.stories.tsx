import { CSSProperties, FormEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider, SliderProps } from './Slider';
import { SliderRange, SliderThumb, SliderThumbIndicator, SliderThumbInput, SliderTrack } from './components';
import { Text } from '../Text';
import { Button } from '../Button';

type SliderStoryProps = Omit<SliderProps, 'value' | 'defaultValue' | 'onChangeValue'>;

const meta: Meta<SliderStoryProps> = {
  title: 'Form/Slider',
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
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    style: { width: '400px' },
    name: 'default',
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
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const column: CSSProperties = { display: 'grid', gap: 12, width: 400 };
const row: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' };
const secondary: CSSProperties = { color: 'var(--label-secondary)' };

export const Default: Story = {
  args: {},
};

export const WithValueLabel: Story = {
  render: (args) => {
    const [volume, setVolume] = useState(40);

    return (
      <div style={{ ...column, paddingTop: 32 }}>
        <Slider {...args} value={volume} onChangeValue={setVolume}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput aria-label='Volume' />
            <SliderThumbIndicator>
              <Text
                size={1}
                fontWeight={600}
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 6px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '2px 6px',
                  borderRadius: 6,
                  color: 'white',
                  background: 'var(--color-primary-500)',
                }}
              >
                {volume}
              </Text>
            </SliderThumbIndicator>
          </SliderThumb>
        </Slider>
      </div>
    );
  },
};

export const PriceRange: Story = {
  render: (args) => {
    const [price, setPrice] = useState([250, 750]);
    const [from, to] = price;
    const format = (price: number) => `$${price.toLocaleString('en-US')}`;

    return (
      <div style={column}>
        <div style={row}>
          <Text fontWeight={600}>Price</Text>
          <Text size={2} style={secondary}>{format(from)} – {format(to)}</Text>
        </div>
        <Slider
          {...args}
          min={0}
          max={1000}
          step={10}
          minStepsBetweenThumbs={10}
          value={price}
          onChangeValue={setPrice}
          style={{ width: '100%' }}
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0}>
            <SliderThumbInput aria-label='Minimum price' aria-valuetext={format(from)} />
            <SliderThumbIndicator />
          </SliderThumb>
          <SliderThumb index={1}>
            <SliderThumbInput aria-label='Maximum price' aria-valuetext={format(to)} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <div style={row}>
          <Text size={1} style={secondary}>{format(0)}</Text>
          <Text size={1} style={secondary}>{format(1000)}</Text>
        </div>
      </div>
    );
  },
};

export const MultipleThumbs: Story = {
  render: (args) => {
    const [stops, setStops] = useState([10, 50, 90]);
    const colors = ['#ff5f6d', '#ffc371', '#47cf73'];
    const gradient = `linear-gradient(to right, ${stops.map((stop, index) => `${colors[index]} ${stop}%`).join(', ')})`;

    return (
      <div style={column}>
        <div style={{ height: 80, borderRadius: 12, background: gradient }} />
        <Slider {...args} minStepsBetweenThumbs={5} value={stops} onChangeValue={setStops} style={{ width: '100%' }}>
          <SliderTrack style={{ background: gradient }} />
          {stops.map((stop, index) => (
            <SliderThumb
              key={index}
              index={index}
              style={{ '--slider-thumb-border-color': colors[index], '--slider-thumb-border-color-hover': colors[index], '--slider-thumb-border-color-active': colors[index] } as CSSProperties}
            >
              <SliderThumbInput aria-label={`Color stop ${index + 1}`} aria-valuetext={`${stop}%`} />
              <SliderThumbIndicator />
            </SliderThumb>
          ))}
        </Slider>
        <div style={row}>
          {stops.map((stop, index) => (
            <Text key={index} size={2} style={secondary}>Stop {index + 1}: {stop}%</Text>
          ))}
        </div>
      </div>
    );
  },
};

export const Steps: Story = {
  render: (args) => {
    const plans = ['1 GB', '5 GB', '20 GB', '100 GB', '1 TB'];
    const [plan, setPlan] = useState(2);
    const last = plans.length - 1;

    return (
      <div style={column}>
        <div style={row}>
          <Text fontWeight={600}>Storage</Text>
          <Text size={2} style={secondary}>{plans[plan]}</Text>
        </div>
        <Slider {...args} min={0} max={last} step={1} value={plan} onChangeValue={setPlan} style={{ width: '100%' }}>
          <SliderTrack>
            <SliderRange />
            {plans.slice(1, -1).map((mark, index) => (
              <span
                key={mark}
                style={{
                  position: 'absolute',
                  top: '50%',
                  insetInlineStart: `${(index + 1) / last * 100}%`,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: index + 1 <= plan ? 'white' : 'var(--label-tertiary)',
                }}
              />
            ))}
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput aria-label='Storage' aria-valuetext={plans[plan]} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <div style={{ position: 'relative', height: 20 }}>
          {plans.map((mark, index) => (
            <Text
              key={mark}
              size={1}
              style={{
                ...secondary,
                position: 'absolute',
                insetInlineStart: `${index / last * 100}%`,
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
              }}
            >
              {mark}
            </Text>
          ))}
        </div>
      </div>
    );
  },
};

export const AnyStep: Story = {
  render: (args) => {
    const [opacity, setOpacity] = useState(35);

    return (
      <div style={column}>
        <div style={row}>
          <Text fontWeight={600}>Opacity</Text>
          <Text size={2} style={secondary}>{opacity.toFixed(1)}%</Text>
        </div>
        <Slider {...args} step='any' value={opacity} onChangeValue={setOpacity} style={{ width: '100%' }}>
          <SliderTrack>
            <SliderRange style={{ opacity: opacity / 100 }} />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput aria-label='Opacity' aria-valuetext={`${opacity.toFixed(1)}%`} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
      </div>
    );
  },
};

export const WithMarkers: Story = {
  render: (args) => {
    const markers = [0, 25, 50, 75, 100];
    const [zoom, setZoom] = useState(40);

    return (
      <div style={column}>
        <div style={row}>
          <Text fontWeight={600}>Zoom</Text>
          <Text size={2} style={secondary}>{zoom}%</Text>
        </div>
        <datalist id='markers'>
          {markers.map((marker) => (
            <option key={marker} value={marker} />
          ))}
        </datalist>
        <Slider {...args} value={zoom} onChangeValue={setZoom} style={{ width: '100%' }}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput list='markers' aria-label='Zoom' />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <div style={{ position: 'relative', height: 28 }}>
          {markers.map((marker) => (
            <div
              key={marker}
              style={{
                position: 'absolute',
                insetInlineStart: `${marker}%`,
                display: 'grid',
                justifyItems: 'center',
                gap: 4,
                transform: 'translateX(-50%)',
              }}
            >
              <span style={{ width: 1, height: 6, background: 'var(--label-tertiary)' }} />
              <Text size={1} style={secondary}>{marker}%</Text>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Equalizer: Story = {
  render: (args) => {
    const bands = ['60 Hz', '230 Hz', '910 Hz', '3.6 kHz', '14 kHz'];
    const [gains, setGains] = useState([4, 2, 0, -2, 3]);

    return (
      <div style={{ display: 'flex', gap: 32 }}>
        {bands.map((band, index) => (
          <div key={band} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
            <Text size={1} style={secondary}>{gains[index] > 0 ? '+' : ''}{gains[index]} dB</Text>
            <Slider
              {...args}
              orientation='vertical'
              min={-12}
              max={12}
              value={gains[index]}
              onChangeValue={(gain) => setGains(gains.map((current, i) => (i === index ? gain : current)))}
              style={{ height: 200 }}
            >
              <SliderTrack>
                <SliderRange />
              </SliderTrack>
              <SliderThumb>
                <SliderThumbInput aria-label={band} aria-valuetext={`${gains[index]} dB`} />
                <SliderThumbIndicator />
              </SliderThumb>
            </Slider>
            <Text size={1} fontWeight={600}>{band}</Text>
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ ...column, gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Slider key={size} {...args} size={size} defaultValue={[30, 70]} style={{ width: '100%' }}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0}>
            <SliderThumbInput aria-label={`${size} from`} />
            <SliderThumbIndicator />
          </SliderThumb>
          <SliderThumb index={1}>
            <SliderThumbInput aria-label={`${size} to`} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ ...column, gap: 24 }}>
      {(['primary', 'secondary'] as const).map((variant) => (
        <Slider key={variant} {...args} variant={variant} defaultValue={60} style={{ width: '100%' }}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput aria-label={variant} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
      ))}
    </div>
  ),
};

export const InForm: Story = {
  render: (args) => {
    const [submitted, setSubmitted] = useState('');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setSubmitted(`price=${data.getAll('price').join(',')}`);
    };

    return (
      <form style={column} onSubmit={onSubmit}>
        <Slider {...args} name='price' defaultValue={[20, 80]} style={{ width: '100%' }}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0}>
            <SliderThumbInput aria-label='Minimum price' />
            <SliderThumbIndicator />
          </SliderThumb>
          <SliderThumb index={1}>
            <SliderThumbInput aria-label='Maximum price' />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type='submit'>Submit</Button>
          <Button type='reset' appearance='outline'>Reset</Button>
        </div>
        <Text size={2} style={secondary}>{submitted || 'Submit to see the form data'}</Text>
      </form>
    );
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    style: { height: '240px' },
  },
};

export const RightToLeft: Story = {
  render: (args) => (
    <div dir='rtl'>
      <Slider {...args} defaultValue={[25, 60]}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0}>
          <SliderThumbInput aria-label='From' />
          <SliderThumbIndicator />
        </SliderThumb>
        <SliderThumb index={1}>
          <SliderThumbInput aria-label='To' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <Slider {...args} defaultValue={30} />,
};
