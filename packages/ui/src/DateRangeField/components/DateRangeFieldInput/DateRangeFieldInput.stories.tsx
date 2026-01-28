import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateRangeFieldInput } from './DateRangeFieldInput';
import { DateRangeField } from '../../DateRangeField';
import { getDateFormat, getDateSeparator } from '@vega-ui/utils';

const meta = {
  title: 'Form/Fields/DateRangeField/DateRangeFieldInput',
  component: DateRangeFieldInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <DateRangeField format={getDateFormat(navigator.language)} separator={getDateSeparator(navigator.language)}>
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
