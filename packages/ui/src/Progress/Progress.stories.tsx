import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress, ProgressProps } from './Progress';
import { ProgressTrack } from './components';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  subcomponents: {
    ProgressTrack,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2268-5896&t=KIqUXkO2Fq2zdfys-11',
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
    max: {
      control: 'number',
    },
    indeterminate: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  args: {
    'aria-label': 'Upload progress',
    value: 50,
    max: 100,
    style: { width: 250 },
    children: <ProgressTrack />,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: ProgressProps['variant'][] = ['primary', 'secondary'];
const sizes: ProgressProps['size'][] = ['sm', 'md', 'lg'];
const rows = variants.flatMap((variant) => sizes.map((size) => ({ variant, size })));

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', gap: 16, alignItems: 'center' }}>
      {rows.map((row) => [false, true].map((indeterminate) => (
        <Progress
          key={`${row.variant}-${row.size}-${indeterminate}`}
          {...row}
          aria-label={`${row.variant} / ${row.size}${indeterminate ? ' / indeterminate' : ''}`}
          value={50}
          max={100}
          indeterminate={indeterminate}
        >
          <ProgressTrack />
        </Progress>
      )))}
    </div>
  ),
};
