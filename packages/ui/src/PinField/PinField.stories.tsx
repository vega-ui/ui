import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { PinField } from './PinField';
import {
  PinFieldInput,
  PinFieldSeparator,
  PinFieldSlot,
} from './components';
import { Button } from '../Button';

const meta = {
  title: 'Form/Fields/PinField/PinField',
  component: PinField,
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
  },
} satisfies Meta<typeof PinField>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/* Basic use cases                                                     */
/* ------------------------------------------------------------------ */

/** Standard 4-digit PIN (ATM / card / confirmation code) */
export const FourDigitPIN: Story = {
  name: '4-digit PIN',
  args: {
    placeholder: '••••',
    maxLength: 4,
    children: [
      <PinFieldInput key={0} />,
      <PinFieldSlot key={1} index={0} />,
      <PinFieldSlot key={2} index={1} />,
      <PinFieldSlot key={3} index={2} />,
      <PinFieldSlot key={4} index={3} />,
    ],
  },
};

/** 6-digit numeric OTP (bank / 2FA / SMS code) */
export const SixDigitOTP: Story = {
  name: '6-digit OTP',
  args: {
    placeholder: '••••••',
    maxLength: 6,
    children: [
      <PinFieldInput key={0} />,
      <PinFieldSlot key={1} index={0} />,
      <PinFieldSlot key={2} index={1} />,
      <PinFieldSlot key={3} index={2} />,
      <PinFieldSlot key={4} index={3} />,
      <PinFieldSlot key={5} index={4} />,
      <PinFieldSlot key={6} index={5} />,
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Formatting & grouping                                               */
/* ------------------------------------------------------------------ */

/** Grouped PIN with visual separator (e.g. legacy systems) */
export const GroupedWithSeparator: Story = {
  name: 'Grouped with separator',
  args: {
    maxLength: 4,
    children: [
      <PinFieldInput key={0} />,
      <PinFieldSlot key={1} index={0} />,
      <PinFieldSlot key={2} index={1} />,
      <PinFieldSeparator key={3} />,
      <PinFieldSlot key={4} index={2} />,
      <PinFieldSlot key={5} index={3} />,
    ],
  },
};

/** Long code split into logical groups (XXXX-XXXX) */
export const LongGroupedCode: Story = {
  name: 'Grouped 8-digit code',
  args: {
    maxLength: 8,
    children: [
      <PinFieldInput key={0} />,
      <PinFieldSlot key={1} index={0} />,
      <PinFieldSlot key={2} index={1} />,
      <PinFieldSlot key={3} index={2} />,
      <PinFieldSlot key={4} index={3} />,
      <PinFieldSeparator key={5} />,
      <PinFieldSlot key={6} index={4} />,
      <PinFieldSlot key={7} index={5} />,
      <PinFieldSlot key={8} index={6} />,
      <PinFieldSlot key={9} index={7} />,
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Input constraints                                                   */
/* ------------------------------------------------------------------ */

/** Alphabetic PIN (internal systems / invite codes) */
export const AlphabeticCode: Story = {
  name: 'Alphabetic code',
  args: {
    mask: /^[A-Za-z]+$/,
    placeholder: 'ABCD',
    maxLength: 4,
    children: [
      <PinFieldInput key={0} />,
      <PinFieldSlot key={1} index={0} />,
      <PinFieldSlot key={2} index={1} />,
      <PinFieldSlot key={3} index={2} />,
      <PinFieldSlot key={4} index={3} />,
    ],
  },
};

/** Alphanumeric code (promo / activation code) */
export const AlphaNumericCode: Story = {
  name: 'Alphanumeric code',
  args: {
    mask: /^[A-Za-z0-9]+$/,
    placeholder: 'A1B2',
    maxLength: 4,
    children: [
      <PinFieldInput key={0} />,
      <PinFieldSlot key={1} index={0} />,
      <PinFieldSlot key={2} index={1} />,
      <PinFieldSlot key={3} index={2} />,
      <PinFieldSlot key={4} index={3} />,
    ],
  },
};

/* ------------------------------------------------------------------ */
/* States                                                              */
/* ------------------------------------------------------------------ */

/** Error state (wrong PIN entered) */
export const ErrorState: Story = {
  name: 'Error state',
  args: {
    maxLength: 4,
    error: true,
    children: [
      <PinFieldInput key={0} />,
      <PinFieldSlot key={1} index={0} />,
      <PinFieldSlot key={2} index={1} />,
      <PinFieldSlot key={3} index={2} />,
      <PinFieldSlot key={4} index={3} />,
    ],
  },
};

/** Disabled state (input locked) */
export const Disabled: Story = {
  args: {
    maxLength: 4,
    disabled: true,
    children: [
      <PinFieldInput key={0} />,
      <PinFieldSlot key={1} index={0} />,
      <PinFieldSlot key={2} index={1} />,
      <PinFieldSlot key={3} index={2} />,
      <PinFieldSlot key={4} index={3} />,
    ],
  },
};

/** Controlled code, cleared after a failed check */
export const Controlled: Story = {
  render: (args) => {
    const [code, setCode] = useState('');

    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <PinField {...args} maxLength={4} value={code} onChangeValue={setCode}>
          <PinFieldInput aria-label='Verification code' />
          <PinFieldSlot index={0} />
          <PinFieldSlot index={1} />
          <PinFieldSlot index={2} />
          <PinFieldSlot index={3} />
        </PinField>
        <Button onClick={() => setCode('')}>Clear</Button>
      </div>
    );
  },
};
