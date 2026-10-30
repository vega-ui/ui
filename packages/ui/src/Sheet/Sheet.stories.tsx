import type { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties, useState } from 'react';
import { XIcon } from '@vega-ui/icons';

import { Sheet } from './Sheet';
import { SheetClose, SheetContent, SheetHandle, SheetTrigger } from './components';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { Label } from '../Label';
import { TextField, TextFieldInput } from '../TextField';

const PLACES = Array.from({ length: 30 }, (_, index) => ({
  name: `Coffee place ${index + 1}`,
  details: `${(index + 1) * 120} m · Open until 22:00`,
}));

const meta = {
  title: 'Overlay/Sheet',
  component: Sheet,
  subcomponents: {
    SheetTrigger,
    SheetContent,
    SheetHandle,
    SheetClose,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1665&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story: 'By default the sheet fits its content and, like an iOS sheet, keeps clear of the sides.',
      },
    },
  },
  args: {
    children: [
      <SheetTrigger key='trigger' asChild>
        <Button>Share place</Button>
      </SheetTrigger>,
      <SheetContent key='content' aria-labelledby='share-title'>
        <SheetHandle aria-label='Resize sheet' />
        <Heading id='share-title' size={4} fontWeight={600} as='h2'>Share</Heading>
        <SheetClose asChild>
          <IconButton
            aria-label='Close'
            variant='secondary'
            appearance='ghost'
            style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
          >
            <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
          </IconButton>
        </SheetClose>
        <form method='dialog' style={{ display: 'grid', gap: 8 }}>
          <Text size={3}>Send Coffee place 1 to a friend or save it for later.</Text>
          <Button type='submit'>Copy link</Button>
          <Button type='submit' variant='secondary'>Save to list</Button>
        </form>
      </SheetContent>,
    ],
  },
};

export const SnapPoints: Story = {
  name: 'Snap points',
  parameters: {
    docs: {
      description: {
        story: 'Snap points are fractions of the viewport height. The long list makes the sheet as tall as the viewport, so it rests at half and full height; drag it or press the handle, and a flick can skip a snap point. Like an iOS sheet, it keeps clear of the sides until it reaches the top of the viewport. At the top, the list scrolls.',
      },
    },
  },
  args: {
    snapPoints: [0.5, 1],
    children: [
      <SheetTrigger key='trigger' asChild>
        <Button>Nearby places</Button>
      </SheetTrigger>,
      <SheetContent key='content' aria-label='Nearby'>
        <SheetHandle aria-label='Resize sheet' />
        <Heading size={4} fontWeight={600} as='h2'>Nearby</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
          {PLACES.map(({ name, details }) => (
            <div key={name}>
              <Text size={3} fontWeight={500}>{name}</Text>
              <Text asChild size={3}><p style={{ margin: 0 }}>{details}</p></Text>
            </div>
          ))}
        </div>
      </SheetContent>,
    ],
  },
};

export const SteppedSnapPoints: Story = {
  name: 'Stepped snap points',
  parameters: {
    docs: {
      description: {
        story: 'A pixel snap point keeps a fixed peek height. With `steppedSnapPoints` a drag moves one snap point at most.',
      },
    },
  },
  args: {
    snapPoints: ['160px', 0.5, 1],
    steppedSnapPoints: true,
    children: [
      <SheetTrigger key='trigger' asChild>
        <Button>Nearby places</Button>
      </SheetTrigger>,
      <SheetContent key='content' aria-label='Nearby'>
        <SheetHandle aria-label='Resize sheet' />
        <Heading size={4} fontWeight={600} as='h2'>Nearby</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
          {PLACES.map(({ name, details }) => (
            <div key={name}>
              <Text size={3} fontWeight={500}>{name}</Text>
              <Text asChild size={3}><p style={{ margin: 0 }}>{details}</p></Text>
            </div>
          ))}
        </div>
      </SheetContent>,
    ],
  },
};

export const Height: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A CSS height on `SheetContent` replaces fitting the content; the sheet is never taller than the viewport.',
      },
    },
  },
  args: {
    children: [
      <SheetTrigger key='trigger' asChild>
        <Button>Open map</Button>
      </SheetTrigger>,
      <SheetContent key='content' aria-label='Map' style={{ height: '80dvh' }}>
        <SheetHandle aria-label='Resize sheet' />
        <Heading size={4} fontWeight={600} as='h2'>Map</Heading>
        <Text size={3}>The sheet takes 80% of the viewport height whatever its content.</Text>
      </SheetContent>,
    ],
  },
};

export const Form: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The sheet rises above the on-screen keyboard, and a drag never starts inside the text fields.',
      },
    },
  },
  args: {
    children: [
      <SheetTrigger key='trigger' asChild>
        <Button>New list</Button>
      </SheetTrigger>,
      <SheetContent key='content' aria-label='New list'>
        <SheetHandle aria-label='Resize sheet' />
        <Heading size={4} fontWeight={600} as='h2'>New list</Heading>
        <form method='dialog' style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Label htmlFor='list-name'>Name</Label>
          <TextField>
            <TextFieldInput id='list-name' placeholder='Weekend spots' required />
          </TextField>
          <Label htmlFor='list-note'>Note</Label>
          <TextField>
            <TextFieldInput id='list-note' placeholder='Optional' />
          </TextField>
          <Button type='submit' style={{ marginTop: 8 }}>Create</Button>
        </form>
      </SheetContent>,
    ],
  },
};

export const ClosedBy: Story = {
  name: 'closedBy',
  parameters: {
    docs: {
      description: {
        story: '`any` (the default) closes on a backdrop click, a swipe down, or `Escape`; `closerequest` only on `Escape`; `none` only from inside.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {(['any', 'closerequest', 'none'] as const).map((closedBy) => (
        <Sheet key={closedBy}>
          <SheetTrigger asChild>
            <Button>{closedBy}</Button>
          </SheetTrigger>
          <SheetContent aria-label={closedBy} closedBy={closedBy}>
            <SheetHandle aria-label='Resize sheet' />
            <Heading size={4} fontWeight={600} as='h2'>{`closedBy="${closedBy}"`}</Heading>
            <form method='dialog' style={{ display: 'grid', gap: 8 }}>
              <Text size={3}>Try a backdrop click, a swipe down and Escape.</Text>
              <Button type='submit'>Done</Button>
            </form>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const Appearance: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Not blurred</Button>
        </SheetTrigger>
        <SheetContent aria-label='Not blurred' blurred={false}>
          <SheetHandle aria-label='Resize sheet' />
          <Heading size={4} fontWeight={600} as='h2'>Not blurred</Heading>
          <Text size={3}>The page behind is dimmed but stays sharp.</Text>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Without overlay</Button>
        </SheetTrigger>
        <SheetContent aria-label='Without overlay' overlay={false} shadowed>
          <SheetHandle aria-label='Resize sheet' />
          <Heading size={4} fontWeight={600} as='h2'>Without overlay</Heading>
          <Text size={3}>The page behind stays visible, and the sheet is still modal.</Text>
        </SheetContent>
      </Sheet>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [snapPoint, setSnapPoint] = useState(0);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Sheet snapPoints={[0.5, 1]} activeSnapPoint={snapPoint} onChangeActiveSnapPoint={setSnapPoint}>
          <SheetTrigger asChild>
            <Button>Nearby places</Button>
          </SheetTrigger>
          <SheetContent aria-label='Nearby'>
            <SheetHandle aria-label='Resize sheet' />
            <Heading size={4} fontWeight={600} as='h2'>Nearby</Heading>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <Button onClick={() => setSnapPoint(0)}>Half</Button>
              <Button onClick={() => setSnapPoint(1)}>Full</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
              {PLACES.map(({ name, details }) => (
                <div key={name}>
                  <Text size={3} fontWeight={500}>{name}</Text>
                  <Text asChild size={3}><p style={{ margin: 0 }}>{details}</p></Text>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Text size={2}>activeSnapPoint: {snapPoint}</Text>
      </div>
    );
  },
};

export const Nested: Story = {
  args: {
    children: [
      <SheetTrigger key='trigger' asChild>
        <Button>Open place</Button>
      </SheetTrigger>,
      <SheetContent key='content' aria-label='Coffee place 1'>
        <SheetHandle aria-label='Resize sheet' />
        <Heading size={4} fontWeight={600} as='h2'>Coffee place 1</Heading>
        <div style={{ display: 'grid', gap: 8 }}>
          <Text size={3}>120 m · Open until 22:00</Text>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='secondary'>Share</Button>
            </SheetTrigger>
            <SheetContent aria-label='Share'>
              <SheetHandle aria-label='Resize sheet' />
              <Heading size={4} fontWeight={600} as='h2'>Share</Heading>
              <Text size={3}>A nested sheet opens over the first one; closing it returns you there.</Text>
            </SheetContent>
          </Sheet>
        </div>
      </SheetContent>,
    ],
  },
};
