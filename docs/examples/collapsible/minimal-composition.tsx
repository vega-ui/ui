import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <div style={{ width: '100%' }}>
      <Collapsible>
        <CollapsibleTrigger>Advanced billing options</CollapsibleTrigger>
        <CollapsibleContent>
          VAT settings, invoice recipients, and legal entity data.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
