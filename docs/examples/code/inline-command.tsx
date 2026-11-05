import { Code, Text } from '@vega-ui/react';

const steps = [
  { text: 'Install the package:', command: 'pnpm add @vega-ui/react' },
  { text: 'Import the styles once in your entry file:', command: 'import \'@vega-ui/react/style.css\'' },
  { text: 'Start the dev server:', command: 'pnpm dev' },
];

export default function InlineCommand() {
  return (
    <ol style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', margin: 0, paddingInlineStart: 'var(--spacing-10)' }}>
      {steps.map((step) => (
        <Text key={step.command} asChild size={3}>
          <li>
            {step.text} <Code>{step.command}</Code>
          </li>
        </Text>
      ))}
    </ol>
  );
}
