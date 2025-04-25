import type { Meta, StoryObj } from '@storybook/react';
import { SheetTrigger } from './SheetTrigger.tsx';
import { Text } from '../../../Text';
import { Button } from '../../../Button';
import { Sheet } from '../../Sheet.tsx';
import { SheetContent } from '../SheetContent';

const meta = {
  title: 'UI-Core/Sheet/SheetTrigger',
  component: SheetTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SheetTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(props) {
    return (
      <Sheet>
        <SheetTrigger {...props} asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <Text>Sheet content</Text>
        </SheetContent>
      </Sheet>
    )
  }
}