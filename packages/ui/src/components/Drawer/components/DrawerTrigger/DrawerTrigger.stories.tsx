import type { Meta, StoryObj } from '@storybook/react';
import { DrawerTrigger } from './DrawerTrigger.tsx';
import { Text } from '../../../Text';
import { Drawer } from '../../Drawer.tsx';
import { Button } from '../../../Button';
import { DrawerContent } from '../DrawerContent';

const meta = {
  title: 'UI-Core/Drawer/DrawerTrigger',
  component: DrawerTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DrawerTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(props) {
    return (
      <Drawer>
        <DrawerTrigger {...props} asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <Text>Drawer content</Text>
        </DrawerContent>
      </Drawer>
    )
  }
}