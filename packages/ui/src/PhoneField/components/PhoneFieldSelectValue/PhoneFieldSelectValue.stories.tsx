import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneFieldSelectValue } from './PhoneFieldSelectValue';
import { PhoneFieldSelect } from '../PhoneFieldSelect';
import { PhoneFieldSelectHiddenSelect } from '../PhoneFieldSelectHiddenSelect';
import { PhoneFieldSelectCombobox } from '../PhoneFieldSelectCombobox';
import { PhoneFieldSelectIcon } from '../PhoneFieldSelectIcon';
import { PhoneFieldSelectPortal } from '../PhoneFieldSelectPortal';
import { PhoneField } from '../../PhoneField';
import { PhoneFieldInput } from '../PhoneFieldInput';
import { PhoneFieldSelectListbox } from '../PhoneFieldSelectListbox';
import { PhoneFieldSelectOption } from '../PhoneFieldSelectOption';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldSelect/PhoneFieldSelectValue',
  component: PhoneFieldSelectValue,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <PhoneField>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect />
          <PhoneFieldSelectCombobox>
            <Story />
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectPortal>
            <PhoneFieldSelectListbox>
              <PhoneFieldSelectOption value='IT'>🇮🇹</PhoneFieldSelectOption>
              <PhoneFieldSelectOption value='CH'>🇨🇳</PhoneFieldSelectOption>
            </PhoneFieldSelectListbox>
          </PhoneFieldSelectPortal>
        </PhoneFieldSelect>
        <PhoneFieldInput />
      </PhoneField>
    )
  }
} satisfies Meta<typeof PhoneFieldSelectValue>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {}
}

export const Placeholder: Story = {
  args: {
    placeholder: 'XX'
  }
}