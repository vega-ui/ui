import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectCombobox } from './SelectCombobox';
import { Select } from '../../Select';
import { SelectHiddenSelect } from '../SelectHiddenSelect';
import { SelectListbox } from '../SelectListbox';
import { SelectOption } from '../SelectOption';
import { SelectValue } from '../SelectValue';
import { SelectIcon } from '../SelectIcon';
import { ChevronsUpDown, Dices } from '@vega-ui/icons';
import { Icon } from '../../../Icon';
import { useSelectContext } from '../../contexts';

const meta = {
  title: 'Form/Selectors/Select/SelectCombobox',
  component: SelectCombobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Select>
        <SelectHiddenSelect />
        <Story />
        <SelectListbox>
          <SelectOption value={1}>1</SelectOption>
          <SelectOption value={2}>2</SelectOption>
          <SelectOption value={3}>3</SelectOption>
        </SelectListbox>
      </Select>
    )
  }
} satisfies Meta<typeof SelectCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <SelectValue key={0} placeholder='Select value' />,
      <SelectIcon key={1} />
    ]
  }
}

export const WithCustomIcon: Story = {
  args: {
    children: [
      <SelectValue key={0} placeholder='Select value' />,
      <SelectIcon key={1}>
        <ChevronsUpDown />
      </SelectIcon>
    ]
  }
}

const SelectedValueText = () => {
  return useSelectContext().selected
}

export const WithCustomValue: Story = {
  args: {
    children: [
      <SelectValue key={0} placeholder='Select value' style={{ gap: 12 }}>
        <Icon size='sm'><Dices /></Icon>
        <SelectedValueText />
      </SelectValue>,
      <SelectIcon key={1} />
    ]
  }
}