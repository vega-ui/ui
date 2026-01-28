import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateRangeFieldTriggerIconButton } from './DateRangeFieldTriggerIconButton';
import { DateRangeField } from '../../DateRangeField';
import { getDateFormat, getDateSeparator } from '@vega-ui/utils';
import { CalendarDays } from '@vega-ui/icons';
import { Icon } from '../../../Icon';

const meta = {
  title: 'Form/Fields/DateRangeField/DateRangeFieldTriggerIconButton',
  component: DateRangeFieldTriggerIconButton,
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
} satisfies Meta<typeof DateRangeFieldTriggerIconButton>;

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
