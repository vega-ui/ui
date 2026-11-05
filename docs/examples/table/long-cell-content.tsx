import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

const files = [
  { name: 'q3-board-presentation-final-v7-reviewed-by-legal-and-finance-DO-NOT-SHARE.pdf', owner: 'maya.chen@northwind-traders-international.example.com', size: '18.4 MB' },
  { name: 'logo.svg', owner: 'li@acme.io', size: '4 KB' },
  { name: 'Отчёт_о_продажах_за_третий_квартал_по_регионам.xlsx', owner: 'ivan.petrov@example.ru', size: '2.1 MB' },
];

export const layout = 'wide';

export default function LongCellContent() {
  return (
    <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ tableLayout: 'fixed', borderStyle: 'hidden' }}>
        <colgroup>
          <col />
          <col style={{ width: '35%' }} />
          <col style={{ width: 88 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>File</TableHeading>
            <TableHeading scope='col'>Owner</TableHeading>
            <TableHeading scope='col'>Size</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableData style={{ overflowWrap: 'anywhere' }}>{file.name}</TableData>
              <TableData title={file.owner} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.owner}
              </TableData>
              <TableData style={{ whiteSpace: 'nowrap' }}>{file.size}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
