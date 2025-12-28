import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectPortal } from './SelectPortal';
import { Select } from '../../Select';
import { SelectHiddenSelect } from '../SelectHiddenSelect';
import { SelectCombobox } from '../SelectCombobox';
import { SelectValue } from '../SelectValue';
import { SelectIcon } from '../SelectIcon';
import { SelectListbox } from '../SelectListbox';
import { SelectOption } from '../SelectOption';
import { Icon } from '../../../Icon';
import { BadgeCent, BadgeDollarSign, BadgeEuro, BadgeIndianRupee, BadgeJapaneseYen } from '@vega-ui/icons';

const meta = {
  title: 'Form/Selectors/Select/SelectPortal',
  component: SelectPortal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: (
      <SelectListbox>
        <SelectOption style={{ gap: 12 }} value={1}>
          <Icon size='sm'><BadgeDollarSign /></Icon>
          Dollar
        </SelectOption>
        <SelectOption style={{ gap: 12 }} value={2}>
          <Icon size='sm'><BadgeEuro /></Icon>
          Euro
        </SelectOption>
        <SelectOption style={{ gap: 12 }} value={3}>
          <Icon size='sm'><BadgeIndianRupee /></Icon>
          Rupee
        </SelectOption>
        <SelectOption style={{ gap: 12 }} value={4}>
          <Icon size='sm'><BadgeJapaneseYen /></Icon>
          Yen
        </SelectOption>
        <SelectOption style={{ gap: 12 }} value={5}>
          <Icon size='sm'><BadgeCent /></Icon>
          Cent
        </SelectOption>
      </SelectListbox>
    )
  },
  decorators(Story) {
    return (
      <Select>
        <SelectHiddenSelect />
        <SelectCombobox>
          <SelectValue style={{ gap: 12 }} placeholder='Select value' />
          <SelectIcon />
        </SelectCombobox>
        <Story />
      </Select>
    )
  }
} satisfies Meta<typeof SelectPortal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}