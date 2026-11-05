import {
  useYearPickerCellContext,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';

const reports: Record<string, number> = {
  '2019-01-01': 4,
  '2020-01-01': 12,
  '2021-01-01': 11,
  '2022-01-01': 12,
  '2023-01-01': 12,
  '2024-01-01': 9,
};

function ReportYear() {
  const { date, label } = useYearPickerCellContext();
  const count = reports[date] ?? 0;

  return (
    <YearPickerCell aria-label={`${label}, ${count} reports`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1.1 }}>
        <span>{label}</span>
        <small style={{ color: 'var(--label-secondary)' }}>{count}</small>
      </span>
    </YearPickerCell>
  );
}

export default function CellTemplate() {
  return (
    <YearPicker aria-label='Report year' locale='en-US' year='2019-01-01' size='lg' to='2024-01-01' style={{ width: '100%' }}>
      <YearPickerLayout rows={2} cols={4}>
        <ReportYear />
      </YearPickerLayout>
    </YearPicker>
  );
}
