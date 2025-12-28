import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneFieldSelectListbox } from './PhoneFieldSelectListbox';
import { PhoneFieldSelect } from '../PhoneFieldSelect';
import { PhoneFieldSelectHiddenSelect } from '../PhoneFieldSelectHiddenSelect';
import { PhoneFieldSelectCombobox } from '../PhoneFieldSelectCombobox';
import { PhoneFieldSelectValue } from '../PhoneFieldSelectValue';
import { PhoneFieldSelectIcon } from '../PhoneFieldSelectIcon';
import { PhoneFieldSelectPortal } from '../PhoneFieldSelectPortal';
import { PhoneFieldSelectOption } from '../PhoneFieldSelectOption';
import { PhoneField } from '../../PhoneField';
import { PhoneFieldInput } from '../PhoneFieldInput';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldSelect/PhoneFieldSelectListbox',
  component: PhoneFieldSelectListbox,
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
            <PhoneFieldSelectValue placeholder='XX' />
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectPortal>
            <Story />
          </PhoneFieldSelectPortal>
        </PhoneFieldSelect>
        <PhoneFieldInput />
      </PhoneField>
    )
  }
} satisfies Meta<typeof PhoneFieldSelectListbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <PhoneFieldSelectOption key={0} value='RU'>
        RU
      </PhoneFieldSelectOption>,
      <PhoneFieldSelectOption key={1} value='FR'>
        FR
      </PhoneFieldSelectOption>,
      <PhoneFieldSelectOption key={2} value='US'>
        US
      </PhoneFieldSelectOption>
    ]
  }
}

export const Flags: Story = {
  args: {
    children: [
      <PhoneFieldSelectOption value='RU'>
        🇷🇺
      </PhoneFieldSelectOption>,
      <PhoneFieldSelectOption value='US'>
        🇺🇸
      </PhoneFieldSelectOption>,
      <PhoneFieldSelectOption value='IT'>
        🇮🇹
      </PhoneFieldSelectOption>
    ]
  }
}