import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateFieldInput } from './DateFieldInput';
import { DateField } from '../../DateField';
import { getDateFormat, getDateSeparator } from '@vega-ui/utils';

const meta = {
  title: 'Form/Fields/DateField/DateFieldInput',
  component: DateFieldInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <DateField format={getDateFormat(navigator.language)} separator={getDateSeparator(navigator.language)}>
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
