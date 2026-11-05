import {
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';

export default function InlineVariantInsideSentenceLikeUi() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', flexWrap: 'wrap', width: '100%' }}>
      <Text size={3}>Email me a digest</Text>
      <Select variant='inline' defaultValue='weekly'>
        <SelectHiddenSelect name='digest' />
        <SelectCombobox aria-label='Summary frequency'>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='daily'>every day</SelectOption>
          <SelectOption value='weekly'>every Monday</SelectOption>
          <SelectOption value='monthly'>on the 1st of the month</SelectOption>
          <SelectOption value='never'>never</SelectOption>
        </SelectListbox>
      </Select>
    </div>
  );
}
