import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeading scope='col'>Plan</TableHeading>
          <TableHeading scope='col'>Price</TableHeading>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableData>Starter</TableData>
          <TableData>$9 / month</TableData>
        </TableRow>
        <TableRow>
          <TableData>Team</TableData>
          <TableData>$29 / month</TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
}
