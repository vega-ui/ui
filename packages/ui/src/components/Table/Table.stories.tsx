import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table.tsx';
import { Text } from '../Text';
import { TableBody, TableData, TableFoot, TableHead, TableHeading, TableRow } from './components';

const meta = {
  title: 'UI-Core/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const Content = [
  <TableHead>
    <TableRow>
      <TableHeading>
        <Text>Модель</Text>
      </TableHeading>
      <TableHeading>
        <Text>Модель</Text>
      </TableHeading>
      <TableHeading>
        <Text>Цена</Text>
      </TableHeading>
    </TableRow>
  </TableHead>,
  <TableBody>
    <TableRow>
      <TableData>
        <Text>iPhone 12 Pro</Text>
      </TableData>
      <TableData>
        <Text>iPhone 12 Pro</Text>
      </TableData>
      <TableData>
        <Text>$999</Text>
      </TableData>
    </TableRow>
    <TableRow>
      <TableData>
        <Text>iPhone 12 Pro</Text>
      </TableData>
      <TableData >
        <Text>iPhone 12 Pro</Text>
      </TableData>
      <TableData>
        <Text>$999</Text>
      </TableData>
    </TableRow>
    <TableRow>
      <TableData>
        <Text>iPhone 12 Pro</Text>
      </TableData>
      <TableData>
        <Text>iPhone 12 Pro</Text>
      </TableData>
      <TableData>
        <Text>$999</Text>
      </TableData>
    </TableRow>
  </TableBody>,
  <TableFoot>
    <TableRow>
      <TableData>
        <Text>Средняя цена:</Text>
      </TableData>
      <TableData />
      <TableData>
        <Text>$758.8</Text>
      </TableData>
    </TableRow>
  </TableFoot>
]

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: Content,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: Content,
  },
};

export const OverflowScrollable: Story = {
  args: {
    fullWidth: true,
    style: {
      minWidth: '520px'
    },
    children: Content,
  },
};