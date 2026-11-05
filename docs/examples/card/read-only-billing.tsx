import { Card, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';

export default function ReadOnlyBilling() {
  return (
    <Card aria-labelledby='billing-contact-title' style={{ width: '100%', maxWidth: 420, gap: 'var(--spacing-12)' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading id='billing-contact-title' as='h3' size={4} fontWeight={600}>Billing contact</Heading>
        <Text id='billing-contact-note' size={2} style={{ color: 'var(--label-secondary)' }}>
          Only workspace owners can change billing details. Ask Maria Chen to update them.
        </Text>
      </div>
      <fieldset disabled aria-describedby='billing-contact-note' style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-8)', alignSelf: 'stretch' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-contact-name'>Name</Label>
          <TextField>
            <TextFieldInput id='billing-contact-name' defaultValue='Maria Chen' />
          </TextField>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-contact-email'>Email</Label>
          <TextField>
            <TextFieldInput id='billing-contact-email' type='email' defaultValue='billing@northwind.io' />
          </TextField>
        </div>
      </fieldset>
    </Card>
  );
}
