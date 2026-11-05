import { Code, Text } from '@vega-ui/react';

export default function CodeInRtlText() {
  return (
    <Text asChild size={3}>
      <p dir='rtl' lang='ar'>
        شغّل الأمر <Code dir='ltr'>pnpm build --filter=@acme/web</Code> قبل النشر.
      </p>
    </Text>
  );
}
