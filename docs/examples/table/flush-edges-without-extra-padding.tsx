import {
  Button,
  Card,
  Heading,
  Table,
  TableBody,
  TableData,
  TableRow,
} from '@vega-ui/react';
import { useState } from 'react';

const details = [
  ['Plan', 'Team'],
  ['Billing cycle', 'Yearly'],
  ['Next invoice', '1 December 2026'],
];

export default function FlushEdgesWithoutExtraPadding() {
  const [edgePadded, setEdgePadded] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <Button size='sm' variant='secondary' appearance='ghost' aria-pressed={edgePadded} onClick={() => setEdgePadded(!edgePadded)}>
        edgePadded: {String(edgePadded)}
      </Button>
      <Card appearance='outline' size='sm' style={{ alignItems: 'stretch', width: '100%', maxWidth: 360 }}>
        <Heading as='h3' size={4} fontWeight={600}>Subscription</Heading>
        <Table fullWidth edgePadded={edgePadded}>
          <TableBody>
            {details.map(([label, value]) => (
              <TableRow key={label}>
                <TableData>{label}</TableData>
                <TableData>{value}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
