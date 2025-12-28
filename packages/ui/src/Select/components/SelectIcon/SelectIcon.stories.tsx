import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectIcon } from './SelectIcon';
import { Select } from '../../Select';
import { SelectCombobox } from '../SelectCombobox';
import { ChevronsUpDown } from '@vega-ui/icons';

const meta = {
  title: 'Form/Selectors/Select/SelectIcon',
  component: SelectIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Select>
        <SelectCombobox>
          <Story />
        </SelectCombobox>
      </Select>
    )
  }
} satisfies Meta<typeof SelectIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}

export const CustomIcon: Story = {
  args: {
    children: <ChevronsUpDown />
  }
}