import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateFieldInput } from './DateFieldInput';
import { DateField } from '../../DateField';
import { getDateFormat, getDateSeparator, gregorianCalendar } from '@vega-ui/i18n';

const meta = {
  title: 'Form/Fields/DateField/DateFieldInput',
  component: DateFieldInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <DateField format={getDateFormat(gregorianCalendar, navigator.language)} separator={getDateSeparator(gregorianCalendar, navigator.language)}>
        <Story />
      </DateField>
    )
  }
} satisfies Meta<typeof DateFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
