import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea.tsx';

const meta = {
  title: 'UI-Core/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4713&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: 'Опишите ситуацию',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
  },
  render(props) {
    return <TextArea {...props} />
  }
}
