import type { Meta, StoryObj } from '@storybook/react-vite';
import { Backdrop } from './Backdrop';
import { Text } from '../Text';

const meta = {
  title: 'Overlay/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    lockScroll: false,
  },
  decorators(Story) {
    return (
      <div style={{ width: 1000, height: 300 }}>
        <Story />
      </div>
    )
  }
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}

export const ContentBehind: Story = {
  render(props) {
    return (
      <div>
        <Text style={{ padding: 12 }} asChild>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </Text>
        <Backdrop {...props} />
      </div>
    )
  }
}