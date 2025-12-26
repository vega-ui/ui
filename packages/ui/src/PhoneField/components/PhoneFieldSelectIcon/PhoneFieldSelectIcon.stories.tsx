import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneFieldSelectIcon } from './PhoneFieldSelectIcon';
import { ChevronsUpDown } from '@vega-ui/icons';
import { PhoneFieldSelect } from '../PhoneFieldSelect';
import { PhoneFieldSelectCombobox } from '../PhoneFieldSelectCombobox';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldSelect/PhoneFieldSelectIcon',
  component: PhoneFieldSelectIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <PhoneFieldSelect>
        <PhoneFieldSelectCombobox>
          <Story />
        </PhoneFieldSelectCombobox>
      </PhoneFieldSelect>
    )
  }
} satisfies Meta<typeof PhoneFieldSelectIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}

export const CustomIcon: Story = {
  args: {
    children: <ChevronsUpDown />
  }
}