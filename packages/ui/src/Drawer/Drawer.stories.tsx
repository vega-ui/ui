import type { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties } from 'react';
import { XIcon } from '@vega-ui/icons';

import { Drawer, DrawerProps } from './Drawer';
import { DrawerClose, DrawerContent, DrawerContentProps, DrawerTrigger } from './components';
import { DrawerPosition } from './types';
import { Button } from '../Button';
import { Text } from '../Text';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Heading } from '../Heading';
import { Label } from '../Label';
import { TextField, TextFieldInput } from '../TextField';
import { Switch, SwitchIndicator, SwitchInput } from '../Switch';
import { subcomponentArgs } from '../../../../.storybook/subcomponentArgs';

type DrawerStoryProps = DrawerProps & Pick<DrawerContentProps, 'fullHeight' | 'fullWidth' | 'closedBy' | 'blurred' | 'overlay' | 'shadowed'>;

const POSITIONS: DrawerPosition[] = [
  'top-start', 'top', 'top-end',
  'end-start', 'end', 'end-end',
  'bottom-start', 'bottom', 'bottom-end',
  'start-start', 'start', 'start-end',
];

const content = subcomponentArgs(DrawerContent, ['fullHeight', 'fullWidth', 'closedBy', 'blurred', 'overlay', 'shadowed']);

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
    ...content.argTypes,
  },
  args: {
    position: 'end',
    fullHeight: false,
    fullWidth: false,
    closedBy: 'any',
    blurred: true,
    overlay: true,
    shadowed: false,
  },
} satisfies Meta<DrawerStoryProps>;

export default meta;
type Story = StoryObj<DrawerStoryProps>;

export const Playground: Story = {
  render: (args) => {
    const [contentProps, drawerProps] = content.split(args);

    return (
      <Drawer {...drawerProps}>
        <DrawerTrigger asChild>
          <Button>Open settings</Button>
        </DrawerTrigger>
        <DrawerContent
          {...contentProps}
          aria-labelledby='settings-title'
        >
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
        </DrawerContent>
      </Drawer>
    );
  },
};

export const Matrix: Story = {
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

export const Scrollable: Story = {
  args: {
    fullHeight: true,
  },
  render: (args) => {
    const [contentProps, drawerProps] = content.split(args);

    return (
      <Drawer {...drawerProps}>
        <DrawerTrigger asChild>
          <Button>Open activity</Button>
        </DrawerTrigger>
        <DrawerContent
          {...contentProps}
          aria-labelledby='activity-title'
        >
          <Heading id='activity-title' as='h2' size={4} fontWeight={600}>Activity</Heading>
          <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
            {Array.from({ length: 30 }, (_, index) => (
              <Text key={index} size={3}>{`${index + 1} min ago — a teammate updated the roadmap.`}</Text>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  },
};
