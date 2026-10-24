import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateTimeFieldInput } from './DateTimeFieldInput';
import { DateTimeField } from '../../DateTimeField';
import { getDateFormat, getDateSeparator, gregorianCalendar } from '@vega-ui/i18n';

const meta = {
  title: 'Form/Fields/DateTimeField/DateTimeFieldInput',
  component: DateTimeFieldInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <DateTimeField dateFormat={getDateFormat(gregorianCalendar)} dateSeparator={getDateSeparator(gregorianCalendar)}>
        <Story />
      </DateTimeField>
    )
  }
} satisfies Meta<typeof DateTimeFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
