import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControlItem } from './SegmentedControlItem.tsx';
import { SegmentedControlItemHiddenInput } from '../SegmentedControlItemHiddenInput';
import { SegmentedControl } from '../../SegmentedControl.tsx';

const meta = {
  title: 'Form/Selectors/SegmentedControl/SegmentedControlItem',
  component: SegmentedControlItem,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2323&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    }
  },
  args: {},
  decorators(Story) {
    return (
      <SegmentedControl name='default'>
        <Story />
      </SegmentedControl>
    )
  }
} satisfies Meta<typeof SegmentedControlItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: 1,
    children: [
      <SegmentedControlItemHiddenInput />,
      'Label'
    ]
  },
}