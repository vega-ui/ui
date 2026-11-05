import type { Meta, StoryObj } from '@storybook/react-vite';

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl';
import { SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput } from './components';
import { Icon } from '../Icon';
import { SunIcon, MoonIcon } from '@vega-ui/icons';

const meta = {
  title: 'Form/Selectors/SegmentedControl',
  component: SegmentedControl,
  subcomponents: {
    SegmentedControlItem,
    SegmentedControlIndicator,
    SegmentedControlItemInput,
  },
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
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    name: 'fruit',
    defaultValue: '1',
    role: 'radiogroup',
    'aria-label': 'Fruit',
    children: [
      <SegmentedControlItem key='1' value='1'>
        <SegmentedControlItemInput />
        Apple
      </SegmentedControlItem>,
      <SegmentedControlItem key='2' value='2'>
        <SegmentedControlItemInput />
        Orange
      </SegmentedControlItem>,
      <SegmentedControlItem key='3' value='3'>
        <SegmentedControlItemInput />
        Blueberry
      </SegmentedControlItem>,
      <SegmentedControlIndicator key='indicator' />,
    ],
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: SegmentedControlProps['variant'][] = ['primary', 'secondary'];
const sizes: SegmentedControlProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { state: 'enabled', disabled: false, defaultValue: '1', icons: false },
  { state: 'disabled', disabled: true, defaultValue: undefined, icons: false },
  { state: 'selected disabled', disabled: true, defaultValue: '2', icons: false },
  { state: 'icon only', disabled: false, defaultValue: '1', icons: true },
];
const rows = states.flatMap((state) => sizes.map((size) => ({ ...state, size })));

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${variants.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => variants.map((variant) => {
        const name = `${variant} / ${row.state} / ${row.size}`;

        if (row.icons) {
          return (
            <SegmentedControl key={name} name={name} role='radiogroup' aria-label={name} variant={variant} size={row.size} disabled={row.disabled} defaultValue={row.defaultValue}>
              <SegmentedControlItem value='1'>
                <SegmentedControlItemInput aria-label='Light' />
                <Icon size='sm'><SunIcon /></Icon>
              </SegmentedControlItem>
              <SegmentedControlItem value='2'>
                <SegmentedControlItemInput aria-label='Dark' />
                <Icon size='sm'><MoonIcon /></Icon>
              </SegmentedControlItem>
              <SegmentedControlIndicator />
            </SegmentedControl>
          );
        }

        return (
          <SegmentedControl key={name} name={name} role='radiogroup' aria-label={name} variant={variant} size={row.size} disabled={row.disabled} defaultValue={row.defaultValue}>
            <SegmentedControlItem value='1'>
              <SegmentedControlItemInput />
              Apple
            </SegmentedControlItem>
            <SegmentedControlItem value='2'>
              <SegmentedControlItemInput />
              Orange
            </SegmentedControlItem>
            <SegmentedControlItem value='3'>
              <SegmentedControlItemInput />
              Blueberry
            </SegmentedControlItem>
            <SegmentedControlIndicator />
          </SegmentedControl>
        );
      }))}
    </div>
  ),
};

export const DifferentLength: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 400 }}>
      {['stretched', 'min-content'].map((width) => (
        <SegmentedControl
          key={width}
          name={`different-length-${width}`}
          role='radiogroup'
          aria-label={`Different length, ${width}`}
          defaultValue='2'
          style={{ display: 'flex', width: width === 'min-content' ? 'min-content' : undefined }}
        >
          <SegmentedControlItem value='1'>
            <SegmentedControlItemInput />
            Short
          </SegmentedControlItem>
          <SegmentedControlItem value='2'>
            <SegmentedControlItemInput />
            Loooooong
          </SegmentedControlItem>
          <SegmentedControlItem value='3'>
            <SegmentedControlItemInput />
            Short
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
      ))}
    </div>
  ),
};
