import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClockIcon } from '@vega-ui/icons';

import { TimeField, TimeFieldProps } from './TimeField';
import { TimeFieldColumn, TimeFieldInput, TimeFieldOption, TimeFieldTrigger } from './components';
import { Icon } from '../Icon';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { WheelPicker, WheelPickerFace } from '../WheelPicker';
import { getTimeTemplate } from '@vega-ui/utils';

const sizes: TimeFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { label: 'default', invalid: false, disabled: false },
  { label: 'invalid', invalid: true, disabled: false },
  { label: 'disabled', invalid: false, disabled: true },
];

const meta = {
  title: 'Form/Fields/TimeField',
  component: TimeField,
  subcomponents: {
    TimeFieldInput,
    TimeFieldTrigger,
    TimeFieldColumn,
    TimeFieldOption,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    format: { control: 'radio', options: ['HH:mm', 'HH:mm:ss'] },
    min: { control: 'text' },
    max: { control: 'text' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
  args: {
    format: 'HH:mm',
  },
  render: (args) => (
    <TimeField {...args}>
      <TimeFieldInput aria-label='Time' placeholder={getTimeTemplate(args.format ?? 'HH:mm')} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <TimeFieldTrigger square aria-label='Pick a time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label='Pick a time' style={{ padding: 'var(--spacing-6)' }}>
          <WheelPicker aria-label='Time'>
            <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
            <TimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            {args.format === 'HH:mm:ss' && <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>}
            {args.format === 'HH:mm:ss' && <TimeFieldColumn unit='second' aria-label='Seconds'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>}
          </WheelPicker>
        </PopoverContent>
      </Popover>
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
        <TimeField key={`${size}-${state.label}`} {...args} size={size}>
          <TimeFieldInput aria-label={`${size} / ${state.label}`} aria-invalid={state.invalid} placeholder={getTimeTemplate(args.format ?? 'HH:mm')} disabled={state.disabled} />
        </TimeField>
      )))}
    </div>
  ),
};
