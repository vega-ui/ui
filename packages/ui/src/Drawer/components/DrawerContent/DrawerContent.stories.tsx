import type { Meta, StoryObj } from '@storybook/react-vite';
import { DrawerContent } from './DrawerContent';
import { Text } from '../../../Text';
import { DrawerHeader } from '../DrawerHeader';
import { DrawerTitle } from '../DrawerTitle';
import { DrawerCloseButton } from '../DrawerCloseButton';
import { Drawer } from '../../Drawer';
import { DrawerTrigger } from '../DrawerTrigger';
import { Button } from '../../../Button';
import { DrawerPortal } from '../DrawerPortal';

const meta = {
  title: 'Overlay/Drawer/DrawerContent',
  component: DrawerContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: [
      <DrawerHeader key={0}>
        <DrawerTitle>Title</DrawerTitle>
        <DrawerCloseButton />
      </DrawerHeader>,
      <Text key={0}>
        Content
      </Text>
    ]
  },
  decorators(Story ) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <Story />
        </DrawerPortal>
      </Drawer>
    )
  }
} satisfies Meta<typeof DrawerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}