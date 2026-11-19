import { Icon, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';
import { TextAlignCenterIcon, TextAlignEndIcon, TextAlignStartIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <ToggleGroup aria-label='Alignment' size='sm' defaultValue='start'>
      <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
      <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
      <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
    </ToggleGroup>
  );
}
