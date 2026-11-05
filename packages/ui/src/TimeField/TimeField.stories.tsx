import type { Meta, StoryObj } from '@storybook/react-vite';

import { TimeField, TimeFieldProps } from './TimeField';
import { TimeFieldInput } from './components';
import { getTimeTemplate } from '@vega-ui/utils';

const sizes: TimeFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { label: 'default', error: false, disabled: false },
  { label: 'error', error: true, disabled: false },
  { label: 'disabled', error: false, disabled: true },
];

const meta = {
  title: 'Form/Fields/TimeField',
  component: TimeField,
  subcomponents: {
    TimeFieldInput,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    format: { control: 'radio', options: ['HH:mm', 'HH:mm:ss'] },
    min: { control: 'text' },
    max: { control: 'text' },
    step: { control: 'number' },
    error: { control: 'boolean' },
  },
  args: {
    format: 'HH:mm',
  },
  render: (args) => (
    <TimeField {...args}>
      <TimeFieldInput aria-label='Time' placeholder={getTimeTemplate(args.format ?? 'HH:mm')} />
    </TimeField>
  ),
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, 160px)`, gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => states.map((state) => (
        <TimeField key={`${size}-${state.label}`} {...args} size={size} error={state.error}>
          <TimeFieldInput aria-label={`${size} / ${state.label}`} placeholder={getTimeTemplate(args.format ?? 'HH:mm')} disabled={state.disabled} />
        </TimeField>
      )))}
    </div>
  ),
};
