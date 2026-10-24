import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateRangeFieldInput } from './DateRangeFieldInput';
import { DateRangeField } from '../../DateRangeField';
import { getDateFormat, getDateSeparator, gregorianCalendar } from '@vega-ui/i18n';

const meta = {
  title: 'Form/Fields/DateRangeField/DateRangeFieldInput',
  component: DateRangeFieldInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <DateRangeField format={getDateFormat(gregorianCalendar, navigator.language)} separator={getDateSeparator(gregorianCalendar, navigator.language)}>
        <Story />
      </DateRangeField>
    )
  }
} satisfies Meta<typeof DateRangeFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
