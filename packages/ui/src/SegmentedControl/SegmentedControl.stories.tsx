import type { Meta, StoryObj } from '@storybook/react-vite';

import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemHiddenInput } from './components';
import { Icon } from '../Icon';
import { SunIcon, MoonIcon } from '@vega-ui/icons';
import { Separator } from '../Separator';

const meta = {
  title: 'Form/Selectors/SegmentedControl/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
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
    name: 'default',
    children: [
      <SegmentedControlItem value='1'>
        <SegmentedControlItemHiddenInput />
        Apple
      </SegmentedControlItem>,
      <SegmentedControlItem value='2'>
        <SegmentedControlItemHiddenInput />
        Orange
      </SegmentedControlItem>,
      <SegmentedControlItem value='3'>
        <SegmentedControlItemHiddenInput />
        Blueberry
      </SegmentedControlItem>,
      <SegmentedControlIndicator />
    ]
  },
};

export const Separated: Story = {
  args: {
    name: 'default',
    style: {
      display: 'flex',
      width: 'min-content',
    },
    children: [
      <SegmentedControlItem value='1'>
        <SegmentedControlItemHiddenInput />
        Apple
      </SegmentedControlItem>,
      <Separator style={{ height: '80%' }} orientation='vertical' />,
      <SegmentedControlItem value='2'>
        <SegmentedControlItemHiddenInput />
        Orange
      </SegmentedControlItem>,
      <Separator style={{ height: '80%' }} orientation='vertical' />,
      <SegmentedControlItem value='3'>
        <SegmentedControlItemHiddenInput />
        Blueberry
      </SegmentedControlItem>,
      <SegmentedControlIndicator />
    ]
  },
};

export const MinContent: Story = {
  args: {
    name: 'default',
    style: {
      display: 'flex',
      width: 'min-content',
    },
    children: [
      <SegmentedControlItem value='1'>
        <SegmentedControlItemHiddenInput />
        Apple
      </SegmentedControlItem>,
      <SegmentedControlItem value='2'>
        <SegmentedControlItemHiddenInput />
        Orange
      </SegmentedControlItem>,
      <SegmentedControlItem value='3'>
        <SegmentedControlItemHiddenInput />
        Blueberry
      </SegmentedControlItem>,
      <SegmentedControlIndicator />
    ]
  },
};

export const Disabled: Story = {
  args: {
    name: 'default',
    disabled: true,
    children: MinContent.args.children,
  },
};

export const SelectedDisabled: Story = {
  args: {
    name: 'default',
    disabled: true,
    value: '2',
    children: MinContent.args.children,
  },
};

export const DifferentLength: Story = {
  args: {
    name: 'default',
    style: {
      display: 'flex',
    },
    children: [
      <SegmentedControlItem value='1'>
        <SegmentedControlItemHiddenInput />
        Short
      </SegmentedControlItem>,
      <SegmentedControlItem value='2'>
        <SegmentedControlItemHiddenInput />
        Loooooong
      </SegmentedControlItem>,
      <SegmentedControlItem value='3'>
        <SegmentedControlItemHiddenInput />
        Short
      </SegmentedControlItem>,
      <SegmentedControlIndicator />
    ]
  },
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
    name: 'icon',
    children: [
      <SegmentedControlItem value='1'>
        <SegmentedControlItemHiddenInput />
        <Icon size='sm'><SunIcon /></Icon>
      </SegmentedControlItem>,
      <SegmentedControlItem value='2'>
        <SegmentedControlItemHiddenInput />
        <Icon size='sm'><MoonIcon /></Icon>
      </SegmentedControlItem>,
      <SegmentedControlIndicator />
    ]
  }
};