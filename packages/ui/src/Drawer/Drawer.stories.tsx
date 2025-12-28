import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
import { Text } from '../Text';
import { Button } from '../Button';
import {
  DrawerContent,
  DrawerHeader,
  DrawerBackdrop,
  DrawerPortal,
  DrawerTrigger,
  DrawerTitle,
  DrawerCloseButton,
} from './components';
import { TextField, TextFieldInput } from '../TextField';
import { Label } from '../Label';
import { useId } from 'react';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle } from '../Alert';

const meta: Meta<typeof Drawer> = {
  title: 'Overlay/Drawer/Drawer',
  component: Drawer,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1623&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const LongText = () => (
  <Text asChild size={3} style={{ maxWidth: 560 }}>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>
  </Text>
);

export const Default: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open drawer</Button>
        </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerContent>
            <LongText />
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    );
  },
};

export const WithoutOverlay: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open drawer without overlay</Button>
        </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerContent shadowed style={{ maxWidth: '80%' }}>
            <LongText />
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    );
  },
};

export const WithHeader: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open drawer with header</Button>
        </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerBackdrop>
            <DrawerContent shadowed>
              <DrawerHeader>
                <DrawerTitle>Drawer title</DrawerTitle>
                <DrawerCloseButton />
              </DrawerHeader>
              
              <LongText />
            </DrawerContent>
          </DrawerBackdrop>
        </DrawerPortal>
      </Drawer>
    );
  },
};

export const WithActions: Story = {
  render(props) {
    const id = useId()
    
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open actions drawer</Button>
        </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerBackdrop>
            <DrawerContent shadowed style={{ maxWidth: 520 }}>
              <DrawerHeader>
                <DrawerTitle>Invite members</DrawerTitle>
                <DrawerCloseButton />
              </DrawerHeader>
              
              <Text size={3} style={{ maxWidth: 520 }}>
                Use this drawer for a short flow with primary/secondary actions. Actions are placed at the bottom to stay
                reachable.
              </Text>
              
              <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
                <div style={{ display: 'grid', gap: 8 }}>
                  <Label htmlFor={id}>Email</Label>
                  <TextField size='sm'>
                    <TextFieldInput id={id} placeholder='name@company.com' />
                  </TextField>
                </div>
                
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <Button size='sm' fullWidth>Send invite</Button>
                  <DrawerCloseButton asChild>
                    <Button size='sm' fullWidth variant='secondary'>
                      Cancel
                    </Button>
                  </DrawerCloseButton>
                </div>
              </div>
            </DrawerContent>
          </DrawerBackdrop>
        </DrawerPortal>
      </Drawer>
    );
  },
};

export const ScrollableContent: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open scrollable drawer</Button>
        </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerBackdrop>
            <DrawerContent shadowed style={{ maxWidth: 560 }}>
              <DrawerHeader>
                <DrawerTitle>Activity</DrawerTitle>
                <DrawerCloseButton />
              </DrawerHeader>
              
              <div style={{ maxHeight: 360, overflow: 'auto', paddingRight: 8 }}>
                <Text size={3} style={{ maxWidth: 560 }}>
                  This story demonstrates long, scrollable content inside a Drawer while the header remains above the
                  scroll area.
                </Text>
                
                <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                  {Array.from({ length: 30 }).map((_, i) => (
                    <Card size='sm'>
                      <Heading size={2} fontWeight={600}>
                        Event #{i + 1}
                      </Heading>
                      <Text size={2} style={{ opacity: 0.7 }}>
                        Details about the event go here. Click outside to close.
                      </Text>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <DrawerCloseButton asChild>
                  <Button size='sm' fullWidth variant='secondary'>
                    Close
                  </Button>
                </DrawerCloseButton>
                <Button size='sm' fullWidth>Mark all as read</Button>
              </div>
            </DrawerContent>
          </DrawerBackdrop>
        </DrawerPortal>
      </Drawer>
    );
  },
};

export const NestedDrawers: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open parent drawer</Button>
        </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerBackdrop>
            <DrawerContent shadowed style={{ maxWidth: 640 }}>
              <DrawerHeader>
                <DrawerTitle>Parent drawer</DrawerTitle>
                <DrawerCloseButton />
              </DrawerHeader>
              
              <Text size={3} style={{ maxWidth: 640 }}>
                This story demonstrates nested drawers (a drawer opened from inside another drawer). Useful for
                drill-down flows, details, or secondary actions without leaving context.
              </Text>
              
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <Button size='sm' fullWidth>Primary action</Button>
                
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button size='sm' fullWidth variant='secondary'>
                      Open nested drawer
                    </Button>
                  </DrawerTrigger>
                  
                  <DrawerPortal>
                    <DrawerBackdrop />
                    <DrawerContent shadowed style={{ maxWidth: 520 }}>
                      <DrawerHeader>
                        <DrawerTitle>Nested drawer</DrawerTitle>
                        <DrawerCloseButton />
                      </DrawerHeader>
                      
                      <Text size={3} style={{ maxWidth: 520 }}>
                        Nested drawer content. Make sure focus trapping and escape handling behave correctly when multiple
                        overlays are present.
                      </Text>
                      
                      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                        <Button size='sm' fullWidth>Save</Button>
                        <DrawerCloseButton asChild>
                          <Button size='sm' fullWidth variant='secondary'>
                            Back
                          </Button>
                        </DrawerCloseButton>
                      </div>
                    </DrawerContent>
                  </DrawerPortal>
                </Drawer>
              </div>
            </DrawerContent>
          </DrawerBackdrop>
        </DrawerPortal>
      </Drawer>
    );
  },
};

export const NestedConfirmFlow: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button size='sm' fullWidth>Open settings drawer</Button>
        </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerBackdrop>
            <DrawerContent shadowed style={{ maxWidth: 640 }}>
              <DrawerHeader>
                <DrawerTitle>Settings</DrawerTitle>
                <DrawerCloseButton />
              </DrawerHeader>
              
              <Text size={3} style={{ maxWidth: 640 }}>
                A realistic flow: settings drawer → destructive action → confirm drawer. This covers nested modal-like
                interactions and ensures stacking, focus and closing behavior remain correct.
              </Text>
              
              <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                <Card size='sm'>
                  <Heading size={2} fontWeight={600}>
                    Notifications
                  </Heading>
                  <Text size={2} style={{ opacity: 0.7 }}>
                    Manage alert delivery and push settings.
                  </Text>
                </Card>
                
                <Card size='sm'>
                  <Heading size={2} fontWeight={600}>
                    Security
                  </Heading>
                  <Text size={2} style={{ opacity: 0.7 }}>
                    Two-factor auth, sessions, and recovery options.
                  </Text>
                </Card>
                
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button size='sm' appearance='ghost' variant='secondary' fullWidth>
                      Delete account…
                    </Button>
                  </DrawerTrigger>
                  
                  <DrawerPortal>
                    <DrawerBackdrop />
                    <DrawerContent shadowed style={{ maxWidth: 520 }}>
                      <DrawerHeader>
                        <DrawerTitle>Confirm deletion</DrawerTitle>
                        <DrawerCloseButton />
                      </DrawerHeader>
                      
                      <Alert variant='error'>
                        <AlertIcon />
                        <AlertMain>
                          <AlertTitle>Warning!</AlertTitle>
                          <AlertContent>
                            This is a confirm step implemented as a nested drawer. In apps this is often a nested modal;
                            drawer nesting should still behave correctly.
                          </AlertContent>
                        </AlertMain>
                      </Alert>
                      
                      <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                        <Button size='sm' fullWidth>Yes, delete</Button>
                        <DrawerCloseButton asChild>
                          <Button size='sm' fullWidth variant='secondary'>
                            Cancel
                          </Button>
                        </DrawerCloseButton>
                      </div>
                    </DrawerContent>
                  </DrawerPortal>
                </Drawer>
              </div>
            </DrawerContent>
          </DrawerBackdrop>
        </DrawerPortal>
      </Drawer>
    );
  },
};

export const TripleNested: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open level 1</Button>
        </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerBackdrop>
            <DrawerContent shadowed style={{ maxWidth: 680 }}>
              <DrawerHeader>
                <DrawerTitle>Level 1</DrawerTitle>
                <DrawerCloseButton />
              </DrawerHeader>
              
              <Text size={3} style={{ maxWidth: 680 }}>
                Stress test: three nested drawers. Useful for verifying z-index layering, focus management, escape key
                handling, and overlay stacking.
              </Text>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button fullWidth style={{ marginTop: 16 }}>
                    Open level 2
                  </Button>
                </DrawerTrigger>
                
                <DrawerPortal>
                  <DrawerBackdrop />
                  <DrawerContent shadowed style={{ maxWidth: 560 }}>
                    <DrawerHeader>
                      <DrawerTitle>Level 2</DrawerTitle>
                      <DrawerCloseButton />
                    </DrawerHeader>
                    
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button fullWidth style={{ marginTop: 16 }} variant='secondary'>
                          Open level 3
                        </Button>
                      </DrawerTrigger>
                      
                      <DrawerPortal>
                        <DrawerBackdrop />
                        <DrawerContent shadowed style={{ maxWidth: 480 }}>
                          <DrawerHeader>
                            <DrawerTitle>Level 3</DrawerTitle>
                            <DrawerCloseButton />
                          </DrawerHeader>
                          
                          <Text size={3} style={{ maxWidth: 480 }}>
                            Deepest level content. Close in reverse order and verify focus returns correctly.
                          </Text>
                          
                          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                            <DrawerCloseButton asChild>
                              <Button appearance='ghost' size='sm' fullWidth variant='secondary'>
                                Back
                              </Button>
                            </DrawerCloseButton>
                            <Button size='sm' fullWidth>Done</Button>
                          </div>
                        </DrawerContent>
                      </DrawerPortal>
                    </Drawer>
                  </DrawerContent>
                </DrawerPortal>
              </Drawer>
            </DrawerContent>
          </DrawerBackdrop>
        </DrawerPortal>
      </Drawer>
    );
  },
};
