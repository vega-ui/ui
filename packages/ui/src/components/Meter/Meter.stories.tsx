import type { Meta, StoryObj } from '@storybook/react';

import { Meter, MeterProps } from './Meter.tsx';

const sizes: MeterProps['size'][] = ['sm', 'md', 'lg'] as const
const variants: MeterProps['variant'][] = ['primary', 'secondary'] as const

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Meter> = {
  title: 'UI-Core/Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2273-5914&t=RUt89rPgQMrw8K8U-11',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: .25,
    style: {
      width: '250px',
    }
  },
};

export const Secondary: Story = {
  args: {
    value: .5,
    style: {
      width: '250px',
    },
    variant: 'secondary',
  },
};

export const WithMax: Story = {
  args: {
    value: 100,
    max: 1000,
    style: {
      width: '150px',
    }
  },
};

export const Sizes: Story = {
  render(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sizes.map((size, index) => <Meter value={.5} style={{ width: 100 + index * 50 + 'px' }} size={size} {...props} />)}
      </div>
    )
  }
};

export const AllVariants: Story = {
  render(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {variants.map((variant) =>
          sizes.map((size, index) => <Meter value={.5} style={{ width: 100 + index * 50 + 'px' }} variant={variant} size={size} {...props} />)
        )}
      </div>
    )
  }
};

export const Optimum: Story = {
  args: {
    style: { width: '150px' },
    value: 75,
    max: 100,
    high: 66,
    low: 33,
    optimum: 100,
  },
};

export const Suboptimum: Story = {
  args: {
    style: { width: '150px' },
    value: 60,
    max: 100,
    high: 66,
    low: 33,
    optimum: 100,
  },
};

export const EvenLessGood: Story = {
  args: {
    style: { width: '150px' },
    value: 30,
    max: 100,
    high: 66,
    low: 33,
    optimum: 100,
  },
};