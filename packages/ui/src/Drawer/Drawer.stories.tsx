import type { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties } from 'react';
import { XIcon } from '@vega-ui/icons';

import { Drawer } from './Drawer';
import { DrawerClose, DrawerContent, DrawerTrigger } from './components';
import { DrawerPosition } from './types';
import { Button } from '../Button';
import { Text } from '../Text';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Heading } from '../Heading';
import { Label } from '../Label';
import { TextField, TextFieldInput } from '../TextField';
import { Switch, SwitchIndicator, SwitchInput } from '../Switch';

const POSITIONS: DrawerPosition[] = [
  'top-start', 'top', 'top-end',
  'end-start', 'end', 'end-end',
  'bottom-start', 'bottom', 'bottom-end',
  'start-start', 'start', 'start-end',
];

const meta = {
  title: 'Overlay/Drawer',
  component: Drawer,
  subcomponents: {
    DrawerTrigger,
    DrawerContent,
    DrawerClose,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    position: {
      control: 'select',
      options: POSITIONS,
    },
  },
  args: {
    position: 'end',
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [
      <DrawerTrigger key='trigger' asChild>
        <Button>Open settings</Button>
      </DrawerTrigger>,
      <DrawerContent key='content' aria-labelledby='settings-title'>
        <Heading id='settings-title' as='h2' size={4} fontWeight={600}>Settings</Heading>
        <DrawerClose asChild>
          <IconButton
            aria-label='Close'
            variant='secondary'
            appearance='ghost'
            style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
          >
            <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
          </IconButton>
        </DrawerClose>
        <form method='dialog' style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 280 }}>
          <Label htmlFor='display-name'>Display name</Label>
          <TextField>
            <TextFieldInput id='display-name' defaultValue='Ada Lovelace' />
          </TextField>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <Text size={3} id='email-notifications'>Email notifications</Text>
            <Switch>
              <SwitchInput defaultChecked aria-labelledby='email-notifications' />
              <SwitchIndicator />
            </Switch>
          </div>
          <Button type='submit'>Save</Button>
        </form>
      </DrawerContent>,
    ],
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 8 }}>
      {POSITIONS.map((position) => (
        <Drawer key={position} position={position}>
          <DrawerTrigger asChild>
            <Button variant='secondary'>{position}</Button>
          </DrawerTrigger>
          <DrawerContent aria-labelledby={`${position}-title`}>
            <Heading id={`${position}-title`} as='h2' size={4} fontWeight={600}>{position}</Heading>
            <Text size={3}>{`This drawer slides in from ${position}.`}</Text>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const RightToLeft: Story = {
  name: 'Right to left',
  parameters: {
    docs: {
      description: {
        story: 'Positions are logical: in right-to-left text `start` is the right side and `end` the left, and the swipe that closes the drawer follows.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {(['start', 'end'] as const).map((position) => (
        <Drawer key={position} position={position}>
          <DrawerTrigger asChild>
            <Button variant='secondary'>{position}</Button>
          </DrawerTrigger>
          <DrawerContent dir='rtl' aria-labelledby={`rtl-${position}-title`}>
            <Heading id={`rtl-${position}-title`} as='h2' size={4} fontWeight={600}>{position}</Heading>
            <Text size={3}>{`position="${position}" in right-to-left text.`}</Text>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const FullSize: Story = {
  name: 'Full size',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Drawer position='end'>
        <DrawerTrigger asChild>
          <Button>Full height</Button>
        </DrawerTrigger>
        <DrawerContent fullHeight aria-labelledby='full-height-title'>
          <Heading id='full-height-title' as='h2' size={4} fontWeight={600}>Full height</Heading>
          <Text size={3}>The drawer takes the whole height of the viewport.</Text>
        </DrawerContent>
      </Drawer>
      <Drawer position='bottom'>
        <DrawerTrigger asChild>
          <Button>Full width</Button>
        </DrawerTrigger>
        <DrawerContent fullWidth aria-labelledby='full-width-title'>
          <Heading id='full-width-title' as='h2' size={4} fontWeight={600}>Full width</Heading>
          <Text size={3}>The drawer takes the whole width of the viewport.</Text>
        </DrawerContent>
      </Drawer>
    </div>
  ),
};

export const ClosedBy: Story = {
  name: 'closedBy',
  parameters: {
    docs: {
      description: {
        story: '`any` (the default) closes on a backdrop click, a touch swipe toward the edge, or `Escape`; `closerequest` only on `Escape`; `none` only from inside.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {(['any', 'closerequest', 'none'] as const).map((closedBy) => (
        <Drawer key={closedBy}>
          <DrawerTrigger asChild>
            <Button>{closedBy}</Button>
          </DrawerTrigger>
          <DrawerContent closedBy={closedBy} aria-labelledby={`${closedBy}-title`}>
            <Heading id={`${closedBy}-title`} as='h2' size={4} fontWeight={600}>{`closedBy="${closedBy}"`}</Heading>
            <Text size={3}>Try a backdrop click, a swipe and Escape.</Text>
            <form method='dialog'>
              <Button type='submit'>Done</Button>
            </form>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const Appearance: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Not blurred</Button>
        </DrawerTrigger>
        <DrawerContent blurred={false} aria-labelledby='not-blurred-title'>
          <Heading id='not-blurred-title' as='h2' size={4} fontWeight={600}>Not blurred</Heading>
          <Text size={3}>The page behind is dimmed but stays sharp.</Text>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Without overlay</Button>
        </DrawerTrigger>
        <DrawerContent overlay={false} shadowed aria-labelledby='without-overlay-title'>
          <Heading id='without-overlay-title' as='h2' size={4} fontWeight={600}>Without overlay</Heading>
          <Text size={3}>The page behind stays visible, and the drawer is still modal.</Text>
        </DrawerContent>
      </Drawer>
    </div>
  ),
};

export const Scrollable: Story = {
  args: {
    position: 'end',
    children: [
      <DrawerTrigger key='trigger' asChild>
        <Button>Open activity</Button>
      </DrawerTrigger>,
      <DrawerContent key='content' fullHeight aria-labelledby='activity-title'>
        <Heading id='activity-title' as='h2' size={4} fontWeight={600}>Activity</Heading>
        <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
          {Array.from({ length: 30 }, (_, index) => (
            <Text key={index} size={3}>{`${index + 1} min ago — a teammate updated the roadmap.`}</Text>
          ))}
        </div>
      </DrawerContent>,
    ],
  },
};

export const Nested: Story = {
  args: {
    position: 'end',
    children: [
      <DrawerTrigger key='trigger' asChild>
        <Button>Open settings</Button>
      </DrawerTrigger>,
      <DrawerContent key='content' aria-labelledby='nested-settings-title'>
        <Heading id='nested-settings-title' as='h2' size={4} fontWeight={600}>Settings</Heading>
        <Text size={3}>General preferences of your account.</Text>
        <Drawer position='end'>
          <DrawerTrigger asChild>
            <Button variant='secondary'>Advanced</Button>
          </DrawerTrigger>
          <DrawerContent aria-labelledby='advanced-title'>
            <Heading id='advanced-title' as='h2' size={4} fontWeight={600}>Advanced</Heading>
            <Text size={3}>A nested drawer opens over the first one; closing it returns you there.</Text>
          </DrawerContent>
        </Drawer>
      </DrawerContent>,
    ],
  },
};
