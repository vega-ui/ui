import type { Meta, StoryObj } from '@storybook/react';
import { DrawerContent } from './DrawerContent.tsx';
import { Text } from '../../../Text';
import { Drawer } from '../../Drawer.tsx';
import { DrawerTrigger } from '../DrawerTrigger';
import { Button } from '../../../Button';

const meta = {
  title: 'UI-Core/Drawer/DrawerContent',
  component: DrawerContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DrawerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>Drawer content</Text>
  },
  render(props) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent {...props} />
      </Drawer>
    )
  }
}