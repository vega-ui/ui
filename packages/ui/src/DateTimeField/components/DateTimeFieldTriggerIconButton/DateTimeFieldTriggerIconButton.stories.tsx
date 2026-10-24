import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateTimeFieldTriggerIconButton } from './DateTimeFieldTriggerIconButton';
import { DateTimeField } from '../../DateTimeField';

import { CalendarDays } from '@vega-ui/icons';
import { Icon } from '../../../Icon';
import { getDateFormat, getDateSeparator, gregorianCalendar } from '@vega-ui/i18n';

const meta = {
  title: 'Form/Fields/DateTimeField/DateTimeFieldTriggerIconButton',
  component: DateTimeFieldTriggerIconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <DateTimeField dateFormat={getDateFormat(gregorianCalendar)} separator={getDateSeparator(gregorianCalendar)}>
        <Story />
      </DateTimeField>
    )
  }
} satisfies Meta<typeof DateTimeFieldTriggerIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomIcon: Story = {
  name: 'Icon',
  args: {
    children: <Icon><CalendarDays /></Icon>
  },
};
