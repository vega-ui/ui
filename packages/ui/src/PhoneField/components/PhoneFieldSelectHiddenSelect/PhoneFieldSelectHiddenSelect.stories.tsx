import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneFieldSelectHiddenSelect } from './PhoneFieldSelectHiddenSelect';
import { PhoneFieldSelect } from '../PhoneFieldSelect';
import { PhoneFieldSelectPortal } from '../PhoneFieldSelectPortal';
import { PhoneFieldSelectListbox } from '../PhoneFieldSelectListbox';
import { PhoneFieldSelectOption } from '../PhoneFieldSelectOption';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldSelect/PhoneFieldSelectHiddenSelect',
  component: PhoneFieldSelectHiddenSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <PhoneFieldSelect>
        <Story />
        <PhoneFieldSelectPortal>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='RU'>RU</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
        </PhoneFieldSelectPortal>
      </PhoneFieldSelect>
    )
  }
} satisfies Meta<typeof PhoneFieldSelectHiddenSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}