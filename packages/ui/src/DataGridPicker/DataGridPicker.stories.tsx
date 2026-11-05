import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridPicker, DataGridPickerProps } from './DataGridPicker';
import {
  DataGridPickerItem,
  DataGridPickerRowGroup,
  DataGridPickerRow,
  DataGridPickerScroller,
  DataGridPickerScrollerContent,
} from './components';

const rows = [0, 1, 2, 3, 4];
const cols = [0, 1, 2, 3, 4];

const grid = (
  <DataGridPickerRowGroup>
    {rows.map((row) => (
      <DataGridPickerRow row={row} key={row}>
        {cols.map((col) => (
          <DataGridPickerItem col={col} key={col}>
            {col + 1}
          </DataGridPickerItem>
        ))}
      </DataGridPickerRow>
    ))}
  </DataGridPickerRowGroup>
);

const meta = {
  title: 'Data/DataGridPicker',
  component: DataGridPicker,
  subcomponents: {
    DataGridPickerItem,
    DataGridPickerRow,
    DataGridPickerRowGroup,
    DataGridPickerScroller,
    DataGridPickerScrollerContent,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    },
    wrap: {
      control: 'radio',
      options: ['horizontal', 'vertical', 'both'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    'aria-label': 'Grid',
    size: 'sm',
    defaultActive: '0:0',
    children: grid,
  },
} satisfies Meta<typeof DataGridPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: DataGridPickerProps['variant'][] = ['primary', 'secondary'];
const sizes: DataGridPickerProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 24, alignItems: 'start' }}>
      {variants.map((variant) => sizes.map((size) => (
        <div key={`${variant}-${size}`} style={{ display: 'grid', gap: 8 }}>
          <span>{`${variant} / ${size}`}</span>
          <DataGridPicker aria-label='Grid' variant={variant} size={size} defaultSelected='1:1'>
            {grid}
          </DataGridPicker>
        </div>
      )))}
    </div>
  ),
};
