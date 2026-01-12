import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dialog } from './Dialog';
import { Button, ButtonProps } from '../Button';
import { Text } from '../Text';
import {
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogPortal,
  DialogBackdrop,
  DialogTitle,
  DialogCloseButton,
} from './components';
import { Card } from '../Card';
import { FC } from 'react';
import { useDialogContext } from './contexts';

const meta = {
  title: 'Overlay/Dialog/Dialog',
  component: Dialog,
  subcomponents: {
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogPortal,
    DialogBackdrop,
    DialogTitle,
    DialogCloseButton,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1644&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const Paragraph = ({ children }: { children: string }) => (
  <Text asChild size={3} style={{ maxWidth: 520 }}>
    <p>{children}</p>
  </Text>
);

type DialogCloseActionButtonProps = ButtonProps;

const DialogCloseActionButton: FC<DialogCloseActionButtonProps> = ({ ...props }) => {
  const { changeOpen } = useDialogContext();
  
  return (
    <Button
      {...props}
      onClick={() => {
        changeOpen(false);
      }}
    />
  );
};

export const Minimal: Story = {
  name: 'Minimal (content only)',
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <Paragraph>
                This is a minimal dialog with a single piece of content. Use it for simple announcements or lightweight
                confirmations.
              </Paragraph>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};

export const TitleOnly: Story = {
  name: 'Title only',
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open title-only dialog</Button>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Information</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <Paragraph>A dialog can be as small as a title and a short message.</Paragraph>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};

export const WithHeaderAndClose: Story = {
  name: 'Header + close button',
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open dialog with header</Button>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Session expired</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              
              <Paragraph>
                Your session has expired. Please sign in again to continue. The close button is useful when the dialog is
                informational and not strictly action-driven.
              </Paragraph>
              
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <Button fullWidth>Sign in</Button>
                <DialogCloseActionButton fullWidth variant='secondary'>
                  Not now
                </DialogCloseActionButton>
              </div>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};

export const ActionsConfirm: Story = {
  name: 'Confirm dialog (primary/secondary actions)',
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open confirm dialog</Button>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm action</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              
              <Paragraph>
                This dialog demonstrates a typical confirm flow: a short explanation and two actions.
              </Paragraph>
              
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <DialogCloseActionButton fullWidth>Confirm</DialogCloseActionButton>
                <DialogCloseActionButton fullWidth variant='secondary'>
                  Cancel
                </DialogCloseActionButton>
              </div>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};

export const ScrollableContent: Story = {
  name: 'Scrollable content',
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open scrollable dialog</Button>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Activity log</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              
              <Text asChild size={2} style={{ opacity: 0.7 }}>
                <p>This dialog contains a scrollable region to keep actions visible.</p>
              </Text>
              
              <div style={{ maxHeight: 280, overflow: 'auto', marginTop: 12, paddingRight: 8 }}>
                <div style={{ display: 'grid', gap: 10 }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <Card key={i} size='sm'>
                      <Text asChild size={2} style={{ fontWeight: 600 }}>
                        <p>Event #{i + 1}</p>
                      </Text>
                      <Text asChild size={2} style={{ opacity: 0.7 }}>
                        <p>Details about this event are shown here.</p>
                      </Text>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <DialogCloseActionButton fullWidth variant='secondary'>
                  Close
                </DialogCloseActionButton>
                <Button fullWidth>Export</Button>
              </div>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};

export const Fluid: Story = {
  name: 'Fluid dialog (full-bleed)',
  args: {
    fluid: true,
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open fluid dialog</Button>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Quick preview</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              
              <Paragraph>
                Fluid mode is useful for large media previews or layouts that should stretch to available space.
              </Paragraph>
              
              <div
                style={{
                  marginTop: 12,
                  height: 220,
                  borderRadius: 16,
                  border: '1px solid rgba(0,0,0,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text size={3} style={{ opacity: 0.7 }}>
                  Media / preview area
                </Text>
              </div>
              
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <DialogCloseActionButton fullWidth>Done</DialogCloseActionButton>
              </div>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};

export const NestedDialogs: Story = {
  name: 'Nested dialogs (drill-down flow)',
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open parent dialog</Button>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Parent dialog</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              
              <Paragraph>
                This story demonstrates nested dialogs. Useful for drill-down flows or secondary confirmations.
              </Paragraph>
              
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <Button fullWidth>Primary action</Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button fullWidth variant='secondary'>
                      Open nested dialog
                    </Button>
                  </DialogTrigger>
                  
                  <DialogPortal>
                    <DialogBackdrop>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Nested dialog</DialogTitle>
                          <DialogCloseButton />
                        </DialogHeader>
                        
                        <Paragraph>
                          Nested dialog content. Verify focus trapping, escape handling, and stacking order.
                        </Paragraph>
                        
                        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                          <Button fullWidth>Continue</Button>
                          <DialogCloseActionButton fullWidth variant='secondary'>
                            Back
                          </DialogCloseActionButton>
                        </div>
                      </DialogContent>
                    </DialogBackdrop>
                  </DialogPortal>
                </Dialog>
              </div>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};

export const NestedConfirmFlow: Story = {
  name: 'Nested confirm (destructive action)',
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open settings dialog</Button>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              
              <Paragraph>
                A realistic flow: a settings dialog with a destructive action that opens a nested confirmation dialog.
              </Paragraph>
              
              <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                <Card>
                  <Text asChild size={2} style={{ fontWeight: 600 }}>
                    <p>Notifications</p>
                  </Text>
                  <Text asChild size={2} style={{ opacity: 0.7 }}>
                    <p>Manage delivery preferences and channels.</p>
                  </Text>
                </Card>
                
                <Card>
                  <Text asChild size={2} style={{ fontWeight: 600 }}>
                    <p>Security</p>
                  </Text>
                  <Text asChild size={2} style={{ opacity: 0.7 }}>
                    <p>Sessions, recovery methods, and sign-in protection.</p>
                  </Text>
                </Card>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='secondary'>Delete item…</Button>
                  </DialogTrigger>
                  
                  <DialogPortal>
                    <DialogBackdrop>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm deletion</DialogTitle>
                          <DialogCloseButton />
                        </DialogHeader>
                        
                        <Paragraph>
                          This is a confirm step implemented as a nested dialog. Ensure closing returns focus to the
                          triggering control.
                        </Paragraph>
                        
                        <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                          <DialogCloseActionButton>Delete</DialogCloseActionButton>
                          <DialogCloseActionButton fullWidth variant='secondary'>
                            Cancel
                          </DialogCloseActionButton>
                        </div>
                      </DialogContent>
                    </DialogBackdrop>
                  </DialogPortal>
                </Dialog>
              </div>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};

export const TripleNested: Story = {
  name: 'Triple nested (stress test)',
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Open level 1</Button>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Level 1</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              
              <Paragraph>
                Stress test with three nested dialogs. Useful for verifying stacking, focus management, and Escape
                handling across multiple layers.
              </Paragraph>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button fullWidth style={{ marginTop: 16 }} variant='secondary'>
                    Open level 2
                  </Button>
                </DialogTrigger>
                
                <DialogPortal>
                  <DialogBackdrop>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Level 2</DialogTitle>
                        <DialogCloseButton />
                      </DialogHeader>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button fullWidth style={{ marginTop: 16 }} variant='secondary'>
                            Open level 3
                          </Button>
                        </DialogTrigger>
                        
                        <DialogPortal>
                          <DialogBackdrop>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Level 3</DialogTitle>
                                <DialogCloseButton />
                              </DialogHeader>
                              
                              <Paragraph>
                                Deepest level content. Close dialogs in reverse order and verify focus restoration.
                              </Paragraph>
                              
                              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                                <DialogCloseActionButton fullWidth variant='secondary'>
                                  Back
                                </DialogCloseActionButton>
                                <DialogCloseActionButton fullWidth>Done</DialogCloseActionButton>
                              </div>
                            </DialogContent>
                          </DialogBackdrop>
                        </DialogPortal>
                      </Dialog>
                    </DialogContent>
                  </DialogBackdrop>
                </DialogPortal>
              </Dialog>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </>
    ),
  },
};
