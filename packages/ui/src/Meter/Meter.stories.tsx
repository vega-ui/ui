import type { Meta, StoryObj } from '@storybook/react-vite';

import { Meter, MeterProps } from './Meter';
import { MeterTrack } from './components';

const meta = {
  title: 'Feedback/Meter',
  component: Meter,
  subcomponents: {
    MeterTrack,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2273-5914&t=RUt89rPgQMrw8K8U-11',
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
    value: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    low: {
      control: 'number',
    },
    high: {
      control: 'number',
    },
    optimum: {
      control: 'number',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  args: {
    'aria-label': 'Storage used',
    value: 25,
    min: 0,
    max: 100,
    style: { width: 250 },
    children: <MeterTrack />,
  },
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: MeterProps['variant'][] = ['primary', 'secondary'];
const sizes: MeterProps['size'][] = ['sm', 'md', 'lg'];
const values = [20, 50, 80];
const rows = variants.flatMap((variant) => sizes.map((size) => ({ variant, size })));

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${values.length}, 150px)`, gap: 16, alignItems: 'center' }}>
      {rows.map((row) => values.map((value) => (
        <Meter
          key={`${row.variant}-${row.size}-${value}`}
          {...row}
          aria-label={`${row.variant} / ${row.size} / ${value}`}
          value={value}
          max={100}
          low={33}
          high={66}
          optimum={100}
        >
          <MeterTrack />
        </Meter>
      )))}
    </div>
  ),
};
