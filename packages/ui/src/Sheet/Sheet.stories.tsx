import type { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties } from 'react';
import { XIcon } from '@vega-ui/icons';

import { Sheet, SheetProps } from './Sheet';
import { SheetClose, SheetContent, SheetContentProps, SheetHandle, SheetTrigger } from './components';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { subcomponentArgs } from '../../../../.storybook/subcomponentArgs';

type SheetStoryProps = SheetProps & Pick<SheetContentProps, 'closedBy' | 'blurred' | 'overlay' | 'shadowed' | 'style'>;

const PLACES = Array.from({ length: 30 }, (_, index) => ({
  name: `Coffee place ${index + 1}`,
  details: `${(index + 1) * 120} m · Open until 22:00`,
}));

const content = subcomponentArgs(SheetContent, ['closedBy', 'blurred', 'overlay', 'shadowed']);

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
    snapPoints: { control: 'object' },
    steppedSnapPoints: { control: 'boolean' },
    ...content.argTypes,
    style: { control: 'object' },
  },
  args: {
    steppedSnapPoints: false,
    closedBy: 'any',
    blurred: false,
    overlay: true,
    shadowed: false,
  },
} satisfies Meta<SheetStoryProps>;

export default meta;
type Story = StoryObj<SheetStoryProps>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'By default the sheet fits its content and, like an iOS sheet, keeps clear of the sides. A CSS `height` in `style` replaces fitting the content; the sheet is never taller than the viewport.',
      },
    },
  },
  render: (args) => {
    const [contentProps, { style, ...sheetProps }] = content.split(args);

    return (
      <Sheet {...sheetProps}>
        <SheetTrigger asChild>
          <Button>Share place</Button>
        </SheetTrigger>
        <SheetContent {...contentProps} style={style} aria-labelledby='share-title'>
          <SheetHandle aria-label='Resize sheet' />
          <Heading id='share-title' size={4} fontWeight={600} as='h2'>Share</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 'calc(16px + var(--sheet-inset, var(--spacing-8)))', '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
          <form method='dialog' style={{ display: 'grid', gap: 8 }}>
            <Text size={3}>Send Coffee place 1 to a friend or save it for later.</Text>
            <Button type='submit'>Copy link</Button>
            <Button type='submit' variant='secondary'>Save to list</Button>
          </form>
        </SheetContent>
      </Sheet>
    );
  },
};

export const LongContent: Story = {
  name: 'Long content',
  parameters: {
    docs: {
      description: {
        story: 'The long list makes the sheet as tall as the viewport, so it rests at its snap points; drag it or press the handle, and a flick can skip a snap point unless `steppedSnapPoints` is on. Like an iOS sheet, it keeps clear of the sides until it reaches the top of the viewport. At the top, the list scrolls.',
      },
    },
  },
  args: {
    snapPoints: ['160px', 0.5, 1],
  },
  render: (args) => {
    const [contentProps, { style, ...sheetProps }] = content.split(args);

    return (
      <Sheet {...sheetProps}>
        <SheetTrigger asChild>
          <Button>Nearby places</Button>
        </SheetTrigger>
        <SheetContent {...contentProps} style={style} aria-label='Nearby'>
          <SheetHandle aria-label='Resize sheet' />
          <Heading size={4} fontWeight={600} as='h2'>Nearby</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto', overscrollBehavior: 'contain' }}>
            {PLACES.map(({ name, details }) => (
              <div key={name}>
                <Text size={3} fontWeight={500}>{name}</Text>
                <Text asChild size={3}><p style={{ margin: 0 }}>{details}</p></Text>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};
