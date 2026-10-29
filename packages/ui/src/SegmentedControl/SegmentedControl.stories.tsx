import type { Meta, StoryObj } from '@storybook/react-vite';

import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput } from './components';
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
    defaultValue: '1',
    children: [
      <SegmentedControlItem key={0} value='1'>
        <SegmentedControlItemInput />
        Apple
      </SegmentedControlItem>,
      <SegmentedControlItem key={1} value='2'>
        <SegmentedControlItemInput />
        Orange
      </SegmentedControlItem>,
      <SegmentedControlItem key={2} value='3'>
        <SegmentedControlItemInput />
        Blueberry
      </SegmentedControlItem>,
      <SegmentedControlIndicator key={3} />
    ]
  },
};

export const Separated: Story = {
  args: {
    name: 'separated',
    defaultValue: '1',
    style: {
      display: 'flex',
      width: 'min-content',
    },
    children: [
      <SegmentedControlItem key={0} value='1'>
        <SegmentedControlItemInput />
        Apple
      </SegmentedControlItem>,
      <Separator key={1} style={{ height: '80%' }} orientation='vertical' />,
      <SegmentedControlItem key={2} value='2'>
        <SegmentedControlItemInput />
        Orange
      </SegmentedControlItem>,
      <Separator key={3} style={{ height: '80%' }} orientation='vertical' />,
      <SegmentedControlItem key={4} value='3'>
        <SegmentedControlItemInput />
        Blueberry
      </SegmentedControlItem>,
      <SegmentedControlIndicator key={5} />
    ]
  },
};

export const MinContent: Story = {
  args: {
    name: 'min-content',
    defaultValue: '1',
    style: {
      display: 'flex',
      width: 'min-content',
    },
    children: [
      <SegmentedControlItem key={0} value='1'>
        <SegmentedControlItemInput />
        Apple
      </SegmentedControlItem>,
      <SegmentedControlItem key={1} value='2'>
        <SegmentedControlItemInput />
        Orange
      </SegmentedControlItem>,
      <SegmentedControlItem key={2} value='3'>
        <SegmentedControlItemInput />
        Blueberry
      </SegmentedControlItem>,
      <SegmentedControlIndicator key={3} />
    ]
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    disabled: true,
    children: MinContent.args.children,
  },
};

export const SelectedDisabled: Story = {
  args: {
    name: 'selected-disabled',
    disabled: true,
    value: '2',
    children: MinContent.args.children,
  },
};

export const DifferentLength: Story = {
  args: {
    name: 'different-length',
    defaultValue: '2',
    style: {
      display: 'flex',
    },
    children: [
      <SegmentedControlItem key={0} value='1'>
        <SegmentedControlItemInput />
        Short
      </SegmentedControlItem>,
      <SegmentedControlItem key={1} value='2'>
        <SegmentedControlItemInput />
        Loooooong
      </SegmentedControlItem>,
      <SegmentedControlItem key={2} value='3'>
        <SegmentedControlItemInput />
        Short
      </SegmentedControlItem>,
      <SegmentedControlIndicator key={3} />
    ]
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    name: 'primary',
    variant: 'primary',
  },
  render: Default.render
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    name: 'secondary',
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
      <SegmentedControlItem key={0} value='1'>
        <SegmentedControlItemInput />
        <Icon size='sm'><SunIcon /></Icon>
      </SegmentedControlItem>,
      <SegmentedControlItem key={1} value='2'>
        <SegmentedControlItemInput />
        <Icon size='sm'><MoonIcon /></Icon>
      </SegmentedControlItem>,
      <SegmentedControlIndicator key={2} />
    ]
  }
};