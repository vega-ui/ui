import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { SegmentedControl } from './SegmentedControl.tsx';
import { SegmentedControlItem } from './components';
import { Icon } from '../Icon';
import { SunIcon, MoonIcon } from '@vega-ui/icons';

const meta = {
  title: 'UI-Core/SegmentedControl/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2378&t=2RYEGgF9z3n5SpP5-11',
    },
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
          <Icon><SunIcon /></Icon>
        </SegmentedControlItem>
        <SegmentedControlItem value='2'>
          <Icon><MoonIcon /></Icon>
        </SegmentedControlItem>
      </SegmentedControl>
    )
  }
};