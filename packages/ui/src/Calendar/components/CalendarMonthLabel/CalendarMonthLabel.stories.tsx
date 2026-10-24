import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonthLabel } from './CalendarMonthLabel';
import { Calendar } from '../../Calendar';

const meta: Meta<typeof CalendarMonthLabel> = {
  title: 'Data/Calendar/CalendarMonthLabel',
  component: CalendarMonthLabel,
  argTypes: {
    format: {
      control: 'radio',
      options: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    },
  },
  decorators(Story) {
    return (
      <Calendar>
        <Story />
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The visible month of the `Calendar` in its locale and calendar system.
 */
export const Default: Story = {
  args: {},
};

/**
 * `format="short"` gives an abbreviated name.
 */
export const Short: Story = {
  args: {
    format: 'short',
  },
};

/**
 * `format="narrow"` gives a single letter in most locales.
 */
export const Narrow: Story = {
  args: {
    format: 'narrow',
  },
};
