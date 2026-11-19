import { Icon, Toggle } from '@vega-ui/react';
import { RulerIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Toggle size='sm'>
      <Icon size='sm'><RulerIcon /></Icon>
      Show ruler
    </Toggle>
  );
}
