import type { Meta, StoryObj } from '@storybook/react-vite';

import { SegmentedControl } from './SegmentedControl.tsx';
import { SegmentedControlItem } from './components';
import { Icon } from '../Icon';
import { SunIcon, MoonIcon } from '@vega-ui/icons';

const meta = {
  title: 'Form/Selectors/SegmentedControl/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2378&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    }
  },
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
        <SegmentedControlItem value='1'>Label</SegmentedControlItem>
        <SegmentedControlItem value='2'>Label</SegmentedControlItem>
        <SegmentedControlItem value='3'>Label</SegmentedControlItem>
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
          <Icon size='sm'><SunIcon /></Icon>
        </SegmentedControlItem>
        <SegmentedControlItem value='2'>
          <Icon size='sm'><MoonIcon /></Icon>
        </SegmentedControlItem>
      </SegmentedControl>
    )
  }
};