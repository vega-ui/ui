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
import { SelectPortal } from '../SelectPortal';

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
        <SelectPortal>
          <SelectListbox>
            <SelectOption value={1}>1</SelectOption>
            <SelectOption value={2}>2</SelectOption>
            <SelectOption value={3}>3</SelectOption>
          </SelectListbox>
        </SelectPortal>
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
      <SelectValue placeholder='Select value' />,
      <SelectIcon />
    ]
  }
}

export const WithCustomIcon: Story = {
  args: {
    children: [
      <SelectValue placeholder='Select value' />,
      <SelectIcon>
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
      <SelectValue placeholder='Select value' style={{ gap: 12 }}>
        <Icon size='sm'><Dices /></Icon>
        <SelectedValueText />
      </SelectValue>,
      <SelectIcon />
    ]
  }
}