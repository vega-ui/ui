import type { Meta, StoryObj } from '@storybook/react';

import { Progress, ProgressProps } from './Progress.tsx';

const sizes: ProgressProps['size'][] = ['sm', 'md', 'lg'] as const
const variants: ProgressProps['variant'][] = ['primary', 'secondary'] as const

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Progress> = {
  title: 'UI-Core/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2268-5896&t=KIqUXkO2Fq2zdfys-11',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    style: {
      width: '250px',
    }
  },
};

export const Secondary: Story = {
  args: {
    value: 50,
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
        {sizes.map((size, index) => <Progress value={50} style={{ width: 100 + index * 50 + 'px' }} size={size} {...props} />)}
      </div>
    )
  }
};

export const AllVariants: Story = {
  render(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {variants.map((variant) =>
          sizes.map((size, index) => <Progress value={50} style={{ width: 100 + index * 50 + 'px' }} variant={variant} size={size} {...props} />)
        )}
      </div>
    )
  }
};

export const Indeterminate: Story = {
  args: {
    style: {
      width: '150px',
    }
  },
};