import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import { Text } from '../Text';
import { TableBody, TableData, TableFoot, TableHead, TableHeading, TableRow } from './components';

const products = [
  { model: 'iPhone 16 Pro', storage: '256 GB', price: '$1,099' },
  { model: 'iPhone 16', storage: '128 GB', price: '$799' },
  { model: 'iPhone 16e', storage: '128 GB', price: '$599' },
];

const meta = {
  title: 'Data/Table',
  component: Table,
  subcomponents: {
    TableHead,
    TableBody,
    TableFoot,
    TableRow,
    TableHeading,
    TableData,
  },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    dataAlign: {
      control: 'radio',
      options: ['start', 'center', 'end', 'between'],
    },
    edgePadded: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    fullHeight: {
      control: 'boolean',
    },
  },
  args: {
    children: [
      <TableHead key='head'>
        <TableRow>
          <TableHeading><Text>Model</Text></TableHeading>
          <TableHeading><Text>Storage</Text></TableHeading>
          <TableHeading><Text>Price</Text></TableHeading>
        </TableRow>
      </TableHead>,
      <TableBody key='body'>
        {products.map((product) => (
          <TableRow key={product.model}>
            <TableData><Text>{product.model}</Text></TableData>
            <TableData><Text>{product.storage}</Text></TableData>
            <TableData><Text>{product.price}</Text></TableData>
          </TableRow>
        ))}
      </TableBody>,
      <TableFoot key='foot'>
        <TableRow>
          <TableData><Text>Total</Text></TableData>
          <TableData />
          <TableData><Text>$2,497</Text></TableData>
        </TableRow>
      </TableFoot>,
    ],
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = Array.from({ length: 50 }, (_, index) => index + 1);

export const Playground: Story = {};

export const Edge: Story = {
  args: {
    style: { maxWidth: 480 },
    children: [
      <TableHead key='head'>
        <TableRow>
          <TableHeading><Text>Order</Text></TableHeading>
          <TableHeading><Text>Customer</Text></TableHeading>
          <TableHeading><Text>Note</Text></TableHeading>
        </TableRow>
      </TableHead>,
      <TableBody key='body'>
        <TableRow>
          <TableData><Text>#0</Text></TableData>
          <TableData><Text>Maximilian Alexander Wolfeschlegelsteinhausenbergerdorff</Text></TableData>
          <TableData><Text>Leave the parcel with the concierge on the ground floor, and if nobody answers call the number on file before 6 pm.</Text></TableData>
        </TableRow>
        <TableRow>
          <TableData><Text>#00</Text></TableData>
          <TableData><Text>billing-department-international@very-long-company-domain-example.com</Text></TableData>
          <TableData />
        </TableRow>
        {rows.map((row) => (
          <TableRow key={row}>
            <TableData><Text>{`#${row}`}</Text></TableData>
            <TableData><Text>{`Customer ${row}`}</Text></TableData>
            <TableData><Text>—</Text></TableData>
          </TableRow>
        ))}
      </TableBody>,
    ],
  },
};
