import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { TimeField } from './TimeField';
import { TimeFieldInput } from './components';

const meta = {
  title: 'Form/Fields/TimeField/TimeField',
  component: TimeField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: <TimeFieldInput placeholder='HH:MM' />
  },
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Seconds: Story = {
  args: {
    children: <TimeFieldInput placeholder='HH:MM:SS' />,
    format: 'HH:mm:ss'
  },
};

export const Min: Story = {
  args: {
    children: <TimeFieldInput placeholder='HH:MM (min: 12:00)' />,
    min: '12:00'
  },
};

export const Max: Story = {
  args: {
    children: <TimeFieldInput placeholder='HH:MM (max: 19:00)' />,
    max: '19:00'
  },
};

export const Controlled: Story = {
  name: 'Controlled value',
  render: (props) => {
    const [value, setValue] = useState('09:30');

    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <TimeField {...props} value={value} onChangeValue={setValue}>
          <TimeFieldInput placeholder='HH:MM' />
        </TimeField>
        <span>Value: {value || '—'}</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    children: <TimeFieldInput disabled placeholder='HH:MM' />,
  },
};