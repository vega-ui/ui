import { Code } from '@vega-ui/react';

const snippet = `{
  "extends": "@vega-ui/eslint-config",
  "rules": {
    "react/jsx-quotes": ["error", "prefer-single"]
  }
}`;

export default function MultilineSnippet() {
  return (
    <pre style={{ margin: 0, width: '100%', overflowX: 'auto' }}>
      <Code size={2} style={{ display: 'block', padding: 'var(--spacing-6)', whiteSpace: 'pre' }}>
        {snippet}
      </Code>
    </pre>
  );
}
