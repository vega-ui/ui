import type { Meta, StoryObj } from '@storybook/react-vite';

import { Meter } from './Meter.tsx';
import { MeterTrack } from './components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Meter> = {
  title: 'Feedback/Meter/Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2273-5914&t=RUt89rPgQMrw8K8U-11',
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
    }
  },
  args: {
    children: <MeterTrack />
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