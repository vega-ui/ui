import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateFieldTriggerIconButton } from './DateFieldTriggerIconButton';
import { DateField } from '../../DateField';

import { CalendarDays } from '@vega-ui/icons';
import { Icon } from '../../../Icon';
import { getDateFormat, getDateSeparator, gregorianCalendar } from '@vega-ui/i18n';

const meta = {
  title: 'Form/Fields/DateField/DateFieldTriggerIconButton',
  component: DateFieldTriggerIconButton,
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
} satisfies Meta<typeof DateFieldTriggerIconButton>;

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
