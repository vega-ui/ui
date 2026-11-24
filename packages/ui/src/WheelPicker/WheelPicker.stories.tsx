import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '.';

const pad = (value: number) => String(value).padStart(2, '0')
const hours = Array.from({ length: 24 }, (_, hour) => hour)
const minutes = Array.from({ length: 60 }, (_, minute) => minute)
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

const meta = {
  title: 'Form/Selectors/WheelPicker',
  component: WheelPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'radio',
      options: [3, 5, 7],
    },
    size: { control: 'radio', options: sizes },
  },
  args: {
    rows: 5,
    size: 'md',
    'aria-label': 'Time',
  },
} satisfies Meta<typeof WheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [hour, setHour] = useState(9)
    const [minute, setMinute] = useState(30)

    return (
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-8)' }}>
        <WheelPicker {...args}>
          <WheelPickerColumn aria-label='Hours' loop value={hour} onChangeValue={setHour}>
            {hours.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
          </WheelPickerColumn>
          <WheelPickerColumn aria-label='Minutes' loop value={minute} onChangeValue={setMinute}>
            {minutes.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
          </WheelPickerColumn>
        </WheelPicker>
        <output>{pad(hour)}:{pad(minute)}</output>
      </div>
    )
  },
};

const units = ['minutes', 'hours', 'days', 'weeks']

const states = [
  { state: 'default', disabledFrom: Infinity, readOnly: false, disabled: false },
  { state: 'disabled options', disabledFrom: 4, readOnly: false, disabled: false },
  { state: 'read-only', disabledFrom: Infinity, readOnly: true, disabled: false },
  { state: 'disabled', disabledFrom: Infinity, readOnly: false, disabled: true },
]

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, auto)`, gap: 'var(--spacing-16)', justifyItems: 'center' }}>
      {states.map(({ state, disabledFrom, readOnly, disabled }) => (
        <div key={state} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
          <WheelPicker aria-label={state}>
            <WheelPickerColumn aria-label='Amount' defaultValue={2} readOnly={readOnly} disabled={disabled}>
              {Array.from({ length: 10 }, (_, amount) => amount + 1).map((amount) => (
                <WheelPickerOption key={amount} value={amount} disabled={amount >= disabledFrom}><WheelPickerFace>{amount}</WheelPickerFace></WheelPickerOption>
              ))}
            </WheelPickerColumn>
            <WheelPickerColumn aria-label='Unit' defaultValue='hours' readOnly={readOnly} disabled={disabled}>
              {units.map((unit) => <WheelPickerOption key={unit} value={unit}><WheelPickerFace>{unit}</WheelPickerFace></WheelPickerOption>)}
            </WheelPickerColumn>
          </WheelPicker>
          <span>{state}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-16)' }}>
      {sizes.map((size) => (
        <WheelPicker key={size} size={size} aria-label={size}>
          <WheelPickerColumn aria-label='Hours' loop defaultValue={9}>
            {hours.map((hour) => <WheelPickerOption key={hour} value={hour}><WheelPickerFace>{pad(hour)}</WheelPickerFace></WheelPickerOption>)}
          </WheelPickerColumn>
          <WheelPickerColumn aria-label='Minutes' loop defaultValue={30}>
            {minutes.map((minute) => <WheelPickerOption key={minute} value={minute}><WheelPickerFace>{pad(minute)}</WheelPickerFace></WheelPickerOption>)}
          </WheelPickerColumn>
        </WheelPicker>
      ))}
    </div>
  ),
};
