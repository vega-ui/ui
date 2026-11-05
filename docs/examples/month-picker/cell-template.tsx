import {
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  useMonthPickerCellContext,
} from '@vega-ui/react';

const spending: Record<string, number> = {
  '2026-01-01': 1240,
  '2026-02-01': 980,
  '2026-03-01': 1415,
  '2026-04-01': 1102,
  '2026-05-01': 1630,
  '2026-06-01': 2210,
  '2026-07-01': 1875,
  '2026-08-01': 1490,
  '2026-09-01': 1320,
  '2026-10-01': 1160,
};

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

function SpendingMonth({ locale }: { locale: string }) {
  const money = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', notation: 'compact' });
  const { date, label } = useMonthPickerCellContext();
  const amount = spending[date];

  if (amount === undefined) return <MonthPickerCell />;

  return (
    <MonthPickerCell aria-label={`${label}, ${money.format(amount)}`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1.1 }}>
        <span>{label}</span>
        <small style={{ color: 'var(--label-secondary)' }}>{money.format(amount)}</small>
      </span>
    </MonthPickerCell>
  );
}

export default function CellTemplate({ locale = 'en-US' }: { locale?: string }) {
  return (
    <MonthPicker aria-label='Spending by month, 2026' locale={locale} year='2026-01-01' size='lg' to='2026-10-01' style={{ width: '100%' }}>
      <MonthPickerLayout format='short' cols={4}>
        <SpendingMonth locale={locale} />
      </MonthPickerLayout>
    </MonthPicker>
  );
}
