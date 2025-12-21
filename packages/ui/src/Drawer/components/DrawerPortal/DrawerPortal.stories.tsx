import type { Meta, StoryObj } from '@storybook/react-vite';
import { DrawerPortal } from './DrawerPortal';
import { Drawer } from '../../Drawer.tsx';
import { DrawerTrigger } from '../DrawerTrigger';
import { Button } from '../../../Button';
import { DrawerContent } from '../DrawerContent';
import { DrawerOverlay } from '../DrawerBackdrop';
import { DrawerHeader } from '../DrawerHeader';
import { DrawerTitle } from '../DrawerTitle';
import { DrawerCloseButton } from '../DrawerCloseButton';
import { Text } from '../../../Text';

const meta = {
  title: 'Overlay/Drawer/DrawerPortal',
  component: DrawerPortal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: [
      <DrawerOverlay key={0} />,
      <DrawerContent key={1}>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <Text style={{ maxWidth: 300 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry
        </Text>
      </DrawerContent>
    ]
  },
  decorators(Story) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <Story />
      </Drawer>
    )
  }
} satisfies Meta<typeof DrawerPortal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}