import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './Separator.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Separator> = {
  title: 'UI-Core/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-2660&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(args) {
    return (
      <div style={{ width: '400px' }}>
        <Separator {...args} />
      </div>
    )
  }
};