import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectValue } from './SelectValue';
import { Select } from '../../Select';
import { SelectCombobox } from '../SelectCombobox';
import { SelectIcon } from '../SelectIcon';

const meta = {
  title: 'Form/Selectors/Select/SelectValue',
  component: SelectValue,
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
          <SelectIcon />
        </SelectCombobox>
      </Select>
    )
  }
} satisfies Meta<typeof SelectValue>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder'
  }
}