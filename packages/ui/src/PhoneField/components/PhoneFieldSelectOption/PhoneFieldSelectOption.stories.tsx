import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneFieldSelectOption } from './PhoneFieldSelectOption';
import { PhoneFieldSelect } from '../PhoneFieldSelect';
import { PhoneFieldSelectHiddenSelect } from '../PhoneFieldSelectHiddenSelect';
import { PhoneFieldSelectCombobox } from '../PhoneFieldSelectCombobox';
import { PhoneFieldSelectValue } from '../PhoneFieldSelectValue';
import { PhoneFieldSelectIcon } from '../PhoneFieldSelectIcon';
import { PhoneFieldSelectPortal } from '../PhoneFieldSelectPortal';
import { PhoneField } from '../../PhoneField';
import { PhoneFieldInput } from '../PhoneFieldInput';
import { PhoneFieldSelectListbox } from '../PhoneFieldSelectListbox';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldSelect/PhoneFieldSelectOption',
  component: PhoneFieldSelectOption,
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
            <PhoneFieldSelectListbox>
              <Story />
            </PhoneFieldSelectListbox>
          </PhoneFieldSelectPortal>
        </PhoneFieldSelect>
        <PhoneFieldInput />
      </PhoneField>
    )
  }
} satisfies Meta<typeof PhoneFieldSelectOption>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: 'US',
    children: 'US'
  }
}

export const Emoji: Story = {
  args: {
    value: 'US',
    children: '🇺🇸',
  }
}