import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './Separator';

const meta = {
  title: 'Display/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2660&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div style={{ display: 'flex', width: 400, height: 120, alignItems: 'center', justifyContent: 'center' }}>
      <Separator {...args} />
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
