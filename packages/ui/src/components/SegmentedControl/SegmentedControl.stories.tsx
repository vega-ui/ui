import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


import { SegmentedControl } from './SegmentedControl.tsx';
import { SegmentedControlItem } from './components';
import { Icon } from '../Icon';

const meta = {
  title: 'UI-Core/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'radio',
  },
  render(props) {
    return (
      <SegmentedControl {...props}>
        <SegmentedControlItem value='1'>SSD</SegmentedControlItem>
        <SegmentedControlItem value='2'>HDD</SegmentedControlItem>
        <SegmentedControlItem value='3'>NVMe</SegmentedControlItem>
      </SegmentedControl>
    )
  }
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: 'primary',
  },
  render: Default.render
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
  render: Default.render
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
  render(props) {
    return (
      <SegmentedControl {...props}>
        <SegmentedControlItem value='1'>
          <Icon name='sun' />
        </SegmentedControlItem>
        <SegmentedControlItem value='2'>
          <Icon name='moon' />
        </SegmentedControlItem>
      </SegmentedControl>
    )
  }
};