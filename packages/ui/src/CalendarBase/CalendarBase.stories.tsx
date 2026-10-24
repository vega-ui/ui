import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBase } from './CalendarBase';
import {
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseControlIconButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
} from './components';
import { Icon } from '../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { getWeekDayNames } from '@vega-ui/i18n';

const meta: Meta<typeof CalendarBase> = {
  title: 'Data/CalendarBase/CalendarBase',
  component: CalendarBase,
  parameters: { layout: 'centered' },
  args: {
    children: (
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
    ),
  },
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
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The visual shell without calendar logic: `size` and `variant` reach every
 * primitive inside through `CalendarBaseContext`. `Calendar` is built on it;
 * use the primitives only for a calendar of your own.
 */
export const Default: Story = {
  args: {},
};
