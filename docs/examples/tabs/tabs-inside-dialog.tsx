import { useId, type CSSProperties } from 'react';
import { Button, Dialog, DialogClose, DialogContent, DialogTrigger, Heading, Icon, Label, Tabs, TabsList, TabsPanel, TabsTab, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function TabsInsideDialog() {
  const titleId = useId();
  const emailId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Share project</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} style={{ width: 'min(440px, 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)', marginBlockEnd: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Share “Spring release”</Heading>
          <DialogClose asChild>
            <Button
              square
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DialogClose>
        </div>
        <Tabs defaultValue='invite' size='sm'>
          <TabsList aria-label='Share with'>
            <TabsTab value='invite'>Invite people</TabsTab>
            <TabsTab value='link'>Public link</TabsTab>
          </TabsList>
          <TabsPanel value='invite'>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={emailId}>Email</Label>
              <TextField>
                <TextFieldInput id={emailId} type='email' placeholder='name@company.com' />
              </TextField>
            </div>
          </TabsPanel>
          <TabsPanel value='link'>
            <Text size={3} style={{ color: 'var(--label-secondary)' }}>Anyone with the link can view the project, but not edit it.</Text>
          </TabsPanel>
        </Tabs>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Share</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
