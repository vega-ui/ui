import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControlItemHiddenInput } from './SegmentedControlItemHiddenInput';
import { SegmentedControl } from '../../SegmentedControl.tsx';
import { SegmentedControlItem } from '../SegmentedControlItem';
import { SegmentedControlIndicator } from '../SegmentedControlIndicator';

const meta = {
  title: 'Form/Selectors/SegmentedControl/SegmentedControlItemHiddenInput',
  component: SegmentedControlItemHiddenInput,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2323&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <SegmentedControl name='default'>
        <SegmentedControlIndicator />
        <SegmentedControlItem value='1'>
          <Story />
        </SegmentedControlItem>
      </SegmentedControl>
    )
  }
} satisfies Meta<typeof SegmentedControlItemHiddenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {}
}