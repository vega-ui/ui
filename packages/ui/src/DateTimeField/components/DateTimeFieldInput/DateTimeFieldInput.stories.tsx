import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateTimeFieldInput } from './DateTimeFieldInput';
import { DateTimeField } from '../../DateTimeField';
import { getDateFormat, getDateSeparator } from '@vega-ui/utils';

const meta = {
  title: 'Form/Fields/DateTimeField/DateTimeFieldInput',
  component: DateTimeFieldInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <DateTimeField dateFormat={getDateFormat(navigator.language)} dateSeparator={getDateSeparator(navigator.language)}>
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
