import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectListbox } from './SelectListbox';
import { Select } from '../../Select.tsx';
import { SelectCombobox } from '../SelectCombobox';
import { SelectValue } from '../SelectValue';
import { SelectIcon } from '../SelectIcon';
import { SelectHiddenSelect } from '../SelectHiddenSelect';
import { SelectOption } from '../SelectOption';
import { Icon } from '../../../Icon';
import { Building2, Landmark, Theater } from '@vega-ui/icons';
import { SelectPortal } from '../SelectPortal';

const meta = {
  title: 'Form/Selectors/Select/SelectListbox',
  component: SelectListbox,
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
        <SelectCombobox>
          <SelectValue style={{ gap: 12 }} placeholder='Select city' />
          <SelectIcon />
        </SelectCombobox>
        <SelectPortal>
          <Story />
        </SelectPortal>
      </Select>
    )
  }
} satisfies Meta<typeof SelectListbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <SelectOption value={1}>Moscow</SelectOption>,
      <SelectOption value={2}>New-York</SelectOption>,
      <SelectOption value={3}>Paris</SelectOption>
    ]
  }
}

export const NonTextChildren: Story = {
  args: {
    children: [
      <SelectOption style={{ gap: 12 }} value={1}>
        <Icon size='sm'><Building2 /></Icon>
        Moscow
      </SelectOption>,
      <SelectOption style={{ gap: 12 }} value={2}>
        <Icon size='sm'><Landmark /></Icon>
        New-York
      </SelectOption>,
      <SelectOption style={{ gap: 12 }} value={3}>
        <Icon size='sm'><Theater /></Icon>
        Paris
      </SelectOption>
    ]
  }
}