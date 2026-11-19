import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Fieldset,
  Heading,
  HelperText,
  Icon,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon, XIcon } from '@vega-ui/icons';

export default function ReadOnlySettings() {
  const titleId = useId();
  const nameId = useId();
  const domainId = useId();
  const noteId = useId();
  const [canEdit, setCanEdit] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Checkbox>
        <CheckboxInput checked={canEdit} onChange={(event) => setCanEdit(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Signed in as a workspace admin
      </Checkbox>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Workspace settings</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Workspace settings</Heading>
            <DrawerClose asChild>
              <Button
                square
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </DrawerClose>
          </div>
          <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            {!canEdit && <HelperText id={noteId}>Only workspace admins can change these settings.</HelperText>}
            <Fieldset disabled={!canEdit} aria-describedby={canEdit ? undefined : noteId} style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0 }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor={nameId}>Workspace name</Label>
                <TextField>
                  <TextFieldInput id={nameId} name='name' defaultValue='Northwind Studio' />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor={domainId}>Allowed email domain</Label>
                <TextField>
                  <TextFieldInput id={domainId} name='domain' defaultValue='northwind.dev' />
                </TextField>
              </div>
              <Button type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>Save</Button>
            </Fieldset>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
