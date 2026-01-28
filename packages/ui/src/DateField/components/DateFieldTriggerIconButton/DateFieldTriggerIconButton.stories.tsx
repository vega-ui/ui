import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateFieldTriggerIconButton } from './DateFieldTriggerIconButton';
import { DateField } from '../../DateField';
import { getDateFormat, getDateSeparator } from '@vega-ui/utils';
import { CalendarDays } from '@vega-ui/icons';
import { Icon } from '../../../Icon';

const meta = {
  title: 'Form/Fields/DateField/DateFieldTriggerIconButton',
  component: DateFieldTriggerIconButton,
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
