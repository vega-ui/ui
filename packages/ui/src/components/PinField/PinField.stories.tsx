import type { Meta, StoryObj } from '@storybook/react';

import { PinField } from './PinField.tsx';
import { PinFieldSeparator, PinFieldSlot } from './components';
import { Label } from '../Label';
import { HelperText } from '../HelperText';

const meta = {
  title: 'UI-Core/PinField/PinField',
  component: PinField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      type: 'number'
    }
  },
  args: {},
} satisfies Meta<typeof PinField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: '••••',
    children: [
      <PinFieldSlot index={0} />,
      <PinFieldSlot index={1} />,
      <PinFieldSlot index={2} />,
      <PinFieldSlot index={3} />
    ]
  },
};

export const WithAlphabet: Story = {
  args: {
    mask: /^[A-Za-z]+$/,
    children: [
      <PinFieldSlot index={0} />,
      <PinFieldSlot index={1} />,
      <PinFieldSlot index={2} />,
      <PinFieldSlot index={3} />
    ]
  },
};

export const Long: Story = {
  args: {
    maxLength: 6,
    children: [
      <PinFieldSlot index={0} />,
      <PinFieldSlot index={1} />,
      <PinFieldSlot index={2} />,
      <PinFieldSlot index={3} />,
      <PinFieldSlot index={4} />,
      <PinFieldSlot index={5} />
    ]
  },
};

export const WithSeparator: Story = {
  args: {
    children: [
      <PinFieldSlot index={0} />,
      <PinFieldSlot index={1} />,
      <PinFieldSeparator />,
      <PinFieldSlot index={2} />,
      <PinFieldSlot index={3} />
    ]
  },
};

export const WithLabel: Story = {
  render(...args) {
    return (
      <>
        <Label htmlFor='input'>OTP Code:</Label>
        <PinField id='input' {...args}>
          <PinFieldSlot index={0} />
          <PinFieldSlot index={1} />
          <PinFieldSeparator />
          <PinFieldSlot index={2} />
          <PinFieldSlot index={3} />
        </PinField>
      </>
    )
  }
};

export const WithHelper: Story = {
  render(...args) {
    return (
      <>
        <Label htmlFor='input1'>OTP Code:</Label>
        <PinField id='input1' {...args}>
          <PinFieldSlot index={0} />
          <PinFieldSlot index={1} />
          <PinFieldSeparator />
          <PinFieldSlot index={2} />
          <PinFieldSlot index={3} />
        </PinField>
        <HelperText>From SMS</HelperText>
      </>
    )
  }
};