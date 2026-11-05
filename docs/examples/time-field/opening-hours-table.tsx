import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  TimeField,
  TimeFieldInput,
} from '@vega-ui/react';

const DAYS = [
  { day: 'Monday', opens: '09:00', closes: '18:00' },
  { day: 'Tuesday', opens: '09:00', closes: '18:00' },
  { day: 'Wednesday', opens: '09:00', closes: '20:00' },
  { day: 'Thursday', opens: '09:00', closes: '18:00' },
  { day: 'Friday', opens: '10:00', closes: '16:00' },
];

export default function OpeningHoursTable() {
  return (
    <Table aria-label='Opening hours'>
      <TableHead>
        <TableRow>
          <TableHeading>Day</TableHeading>
          <TableHeading>Opens</TableHeading>
          <TableHeading>Closes</TableHeading>
        </TableRow>
      </TableHead>
      <TableBody>
        {DAYS.map(({ day, opens, closes }) => (
          <TableRow key={day}>
            <TableData>{day}</TableData>
            <TableData>
              <TimeField size='sm' defaultValue={opens} style={{ width: 96 }}>
                <TimeFieldInput name={`${day.toLowerCase()}Opens`} aria-label={`${day} opens`} />
              </TimeField>
            </TableData>
            <TableData>
              <TimeField size='sm' defaultValue={closes} style={{ width: 96 }}>
                <TimeFieldInput name={`${day.toLowerCase()}Closes`} aria-label={`${day} closes`} />
              </TimeField>
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
