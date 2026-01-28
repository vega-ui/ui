import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateTimeFieldTriggerIconButton } from './DateTimeFieldTriggerIconButton';
import { DateTimeField } from '../../DateTimeField';
import { getDateFormat, getDateSeparator } from '@vega-ui/utils';
import { CalendarDays } from '@vega-ui/icons';
import { Icon } from '../../../Icon';

const meta = {
  title: 'Form/Fields/DateTimeField/DateTimeFieldTriggerIconButton',
  component: DateTimeFieldTriggerIconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <DateTimeField dateFormat={getDateFormat(navigator.language)} separator={getDateSeparator(navigator.language)}>
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
