import { Fieldset, FieldsetLegend, HelperText, Radio } from '@vega-ui/react';

export default function DisabledOption() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Data region</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='region' value='eu' defaultChecked />
            European Union (Frankfurt)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='region' value='us' />
            United States (Virginia)
          </label>
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', color: 'var(--label-tertiary)' }}>
              <Radio name='region' value='au' disabled aria-describedby='region-au-note' />
              Australia (Sydney)
            </label>
            <HelperText id='region-au-note' style={{ paddingInlineStart: 'var(--spacing-12)' }}>Opens in Q3. Join the waitlist in Settings → Regions.</HelperText>
          </div>
        </div>
      </Fieldset>
      <Fieldset disabled aria-describedby='backups-note'>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-2)' }}>Backup frequency</FieldsetLegend>
        <HelperText id='backups-note'>Managed by your organization policy.</HelperText>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', color: 'var(--label-tertiary)' }}>
            <Radio name='backups' value='daily' defaultChecked />
            Daily
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', color: 'var(--label-tertiary)' }}>
            <Radio name='backups' value='hourly' />
            Hourly
          </label>
        </div>
      </Fieldset>
    </div>
  );
}
