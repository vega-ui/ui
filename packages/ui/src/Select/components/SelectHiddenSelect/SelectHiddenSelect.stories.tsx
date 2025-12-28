import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectHiddenSelect } from './SelectHiddenSelect';
import { Select } from '../../Select';
import { SelectListbox } from '../SelectListbox';
import { SelectOption } from '../SelectOption';

const meta = {
  title: 'Form/Selectors/Select/SelectHiddenSelect',
  component: SelectHiddenSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <Select>
        <Story />
        <SelectListbox>
          <SelectOption value={1}>One</SelectOption>
          <SelectOption value={2}>Two</SelectOption>
        </SelectListbox>
      </Select>
    )
  }
} satisfies Meta<typeof SelectHiddenSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}