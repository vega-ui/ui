import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetPortal } from './SheetPortal';
import { Sheet } from '../../Sheet';
import { SheetTrigger } from '../SheetTrigger';
import { Button } from '../../../Button';
import { SheetBackdrop } from '../SheetBackdrop';
import { SheetContent } from '../SheetContent';
import { Text } from '../../../Text';
import { SheetMain } from '../SheetMain';

const meta = {
  title: 'Overlay/Sheet/SheetPortal',
  component: SheetPortal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <Story />
      </Sheet>
    )
  }
} satisfies Meta<typeof SheetPortal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <SheetBackdrop>
        <SheetContent>
          <SheetMain>
            <Text>Hello</Text>
          </SheetMain>
        </SheetContent>
      </SheetBackdrop>
    )
  }
}