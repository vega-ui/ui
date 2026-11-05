import { Text } from '@vega-ui/react';

const files = [
  'Q1-2026-board-presentation-final-v7-approved-by-legal.pdf',
  'customer-interviews-transcripts-berlin-and-lisbon.docx',
  'logo.svg',
];

export default function LongTextOverflow() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      {files.map((file) => (
        <Text
          key={file}
          size={2}
          title={file}
          style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {file}
        </Text>
      ))}
      <Text size={2} style={{ overflowWrap: 'anywhere' }}>
        Invoices are sent to accounts-payable.emea-region@northwind-traders.example.com
      </Text>
    </div>
  );
}
