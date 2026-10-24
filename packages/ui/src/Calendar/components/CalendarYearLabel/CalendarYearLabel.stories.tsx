import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYearLabel } from './CalendarYearLabel';
import { Calendar } from '../../Calendar';

const meta: Meta<typeof CalendarYearLabel> = {
  title: 'Data/Calendar/CalendarYearLabel',
  component: CalendarYearLabel,
  argTypes: {
    format: {
      control: 'radio',
      options: ['numeric', '2-digit'],
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
 * The year of the visible month in the locale and calendar system of the
 * `Calendar`.
 */
export const Default: Story = {
  args: {},
};

/**
 * `format="2-digit"` keeps the last two digits of the year.
 */
export const TwoDigit: Story = {
  args: {
    format: '2-digit',
  },
};
