import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react';

import { PinField, PinFieldProps } from './PinField';
import {
  PinFieldInput,
  PinFieldSeparator,
  PinFieldSlot,
} from './components';

const meta = {
  title: 'Form/Fields/PinField',
  component: PinField,
  subcomponents: {
    PinFieldSlot,
    PinFieldInput,
    PinFieldSeparator,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1969&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    maxLength: { control: { type: 'number', min: 1, max: 12 } },
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    maxLength: 4,
    placeholder: '••••',
  },
  render: (args) => (
    <PinField {...args}>
      <PinFieldInput aria-label='Code' />
      {Array.from({ length: args.maxLength ?? 4 }, (_, index) => (
        <PinFieldSlot key={index} index={index} />
      ))}
    </PinField>
  ),
} satisfies Meta<typeof PinField>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: PinFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { label: 'default', disabled: false, error: false },
  { label: 'disabled', disabled: true, error: false },
  { label: 'error', disabled: false, error: true },
];
const layouts = [
  { label: '4', groups: [[0, 1, 2, 3]] },
  { label: '6', groups: [[0, 1, 2, 3, 4, 5]] },
  { label: '2-2', groups: [[0, 1], [2, 3]] },
  { label: '4-4', groups: [[0, 1, 2, 3], [4, 5, 6, 7]] },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, auto)`, gap: 16, alignItems: 'center' }}>
      {sizes.map((size) => states.map((state) => (
        <PinField key={`${size}-${state.label}`} size={size} disabled={state.disabled} error={state.error} defaultValue='12'>
          <PinFieldInput aria-label='Code' />
          <PinFieldSlot index={0} />
          <PinFieldSlot index={1} />
          <PinFieldSlot index={2} />
          <PinFieldSlot index={3} />
        </PinField>
      )))}
    </div>
  ),
};

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
      {layouts.map((layout) => (
        <PinField key={layout.label} maxLength={layout.groups.flat().length}>
          <PinFieldInput aria-label='Code' />
          {layout.groups.map((group, groupIndex) => (
            <Fragment key={group[0]}>
              {groupIndex > 0 && <PinFieldSeparator />}
              {group.map((index) => (
                <PinFieldSlot key={index} index={index} />
              ))}
            </Fragment>
          ))}
        </PinField>
      ))}
    </div>
  ),
};
