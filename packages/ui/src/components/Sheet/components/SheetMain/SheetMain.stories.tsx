import type { Meta, StoryObj } from '@storybook/react';
import { SheetMain } from './SheetMain.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'Overlay/Sheet/SheetMain',
  component: SheetMain,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SheetMain>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <Text asChild size={3} style={{ textAlign: 'center', marginTop: '30px' }}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
          like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </Text>
    )
  },
}