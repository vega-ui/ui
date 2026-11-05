import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBase, CalendarBaseProps } from './CalendarBase';
import {
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseControlIconButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
} from './components';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { getWeekDayNames } from '@vega-ui/i18n';

const shell = (
  <>
    <CalendarBaseHeader>
      <CalendarBaseControlIconButton aria-label='Previous'>
        <Icon><ChevronLeft /></Icon>
      </CalendarBaseControlIconButton>
      <CalendarBasePickerButton>March</CalendarBasePickerButton>
      <CalendarBaseControlIconButton aria-label='Next'>
        <Icon><ChevronRight /></Icon>
      </CalendarBaseControlIconButton>
    </CalendarBaseHeader>
    <CalendarBaseWeekLabels>
      {getWeekDayNames('en-US', 'short').map((label) => (
        <CalendarBaseWeekLabel key={label}>{label}</CalendarBaseWeekLabel>
      ))}
    </CalendarBaseWeekLabels>
  </>
);

const meta = {
  title: 'Data/CalendarBase',
  component: CalendarBase,
  subcomponents: {
    CalendarBaseControlIconButton,
    CalendarBaseWeekLabels,
    CalendarBaseWeekLabel,
    CalendarBaseHeader,
    CalendarBasePickerButton,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    compact: {
      control: 'boolean',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    children: shell,
  },
} satisfies Meta<typeof CalendarBase>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: CalendarBaseProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const variants: CalendarBaseProps['variant'][] = ['primary', 'secondary'];
const rows = variants.flatMap((variant) => [false, true].map((compact) => ({ variant, compact })));

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 24, alignItems: 'start' }}>
      {rows.map((row) => sizes.map((size) => (
        <div key={`${row.variant}-${row.compact}-${size}`} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text size={2}>{`${row.variant}${row.compact ? ' / compact' : ''} / ${size}`}</Text>
          <CalendarBase {...row} size={size}>
            {shell}
          </CalendarBase>
        </div>
      )))}
    </div>
  ),
};
