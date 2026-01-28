import type { Meta, StoryObj } from '@storybook/react-vite';

import { TimeFieldInput } from './TimeFieldInput';
import { TimeField } from '../../TimeField';

const meta = {
  title: 'Form/Fields/TimeField/TimeFieldInput',
  component: TimeFieldInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {},
  decorators(Story) {
    return (
      <TimeField>
        <Story />
      </TimeField>
    )
  }
} satisfies Meta<typeof TimeFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
