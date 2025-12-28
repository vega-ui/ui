import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './Progress.tsx';
import { ProgressTrack } from './components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2268-5896&t=KIqUXkO2Fq2zdfys-11',
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
    style: { width: '100%' },
    children: [
      <ProgressTrack />
    ]
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

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    style: {
      width: '150px',
    }
  },
};