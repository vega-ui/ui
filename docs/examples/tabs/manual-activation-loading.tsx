import { useState } from 'react';
import { Spinner, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

const reports: Record<string, { label: string, rows: string[] }> = {
  invoices: { label: 'Invoices', rows: ['INV-2041 · €1,240.00 · Paid', 'INV-2042 · €310.50 · Due 30 Nov'] },
  payouts: { label: 'Payouts', rows: ['14 Nov · €3,980.00 to IBAN •• 7731', '07 Nov · €2,415.20 to IBAN •• 7731'] },
  disputes: { label: 'Disputes', rows: ['No open disputes in the last 90 days.'] },
};

export default function ManualActivationLoading() {
  const [loaded, setLoaded] = useState<string[]>(['invoices']);

  const load = (value: string) => {
    if (loaded.includes(value)) return;
    setTimeout(() => setLoaded((current) => [...current, value]), 900);
  };

  return (
    <Tabs defaultValue='invoices' activation='manual' onChangeValue={load} style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Finance reports'>
        {Object.entries(reports).map(([value, report]) => <TabsTab key={value} value={value}>{report.label}</TabsTab>)}
      </TabsList>
      {Object.entries(reports).map(([value, report]) => (
        <TabsPanel key={value} value={value}>
          <div style={{ display: 'grid', gap: 'var(--spacing-4)', minHeight: 'calc(2lh + var(--spacing-4))', alignContent: 'start' }}>
            {loaded.includes(value)
              ? report.rows.map((row) => <Text key={row} size={3} style={{ fontVariantNumeric: 'tabular-nums' }}>{row}</Text>)
              : <Spinner size={3} aria-label={`Loading ${report.label.toLowerCase()}`} />}
          </div>
        </TabsPanel>
      ))}
    </Tabs>
  );
}
