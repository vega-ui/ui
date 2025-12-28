import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneFieldSelectPortal } from './PhoneFieldSelectPortal';
import { PhoneFieldSelect } from '../PhoneFieldSelect';
import { PhoneFieldSelectHiddenSelect } from '../PhoneFieldSelectHiddenSelect';
import { PhoneFieldSelectCombobox } from '../PhoneFieldSelectCombobox';
import { PhoneFieldSelectValue } from '../PhoneFieldSelectValue';
import { PhoneFieldSelectIcon } from '../PhoneFieldSelectIcon';
import { PhoneField } from '../../PhoneField';
import { PhoneFieldInput } from '../PhoneFieldInput';
import { PhoneFieldSelectListbox } from '../PhoneFieldSelectListbox';
import { PhoneFieldSelectOption } from '../PhoneFieldSelectOption';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldSelect/PhoneFieldSelectPortal',
  component: PhoneFieldSelectPortal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story, ctx) {
    const relative = Boolean(ctx.parameters.relative)
    
    return (
      <PhoneField>
        <PhoneFieldSelect style={relative ? { position: 'relative' } : undefined}>
          <PhoneFieldSelectHiddenSelect />
          <PhoneFieldSelectCombobox>
            <PhoneFieldSelectValue placeholder='XX' />
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <Story />
        </PhoneFieldSelect>
        <PhoneFieldInput />
      </PhoneField>
    )
  }
} satisfies Meta<typeof PhoneFieldSelectPortal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <PhoneFieldSelectListbox>
        <PhoneFieldSelectOption value='RU'>
          🇷🇺
        </PhoneFieldSelectOption>
        <PhoneFieldSelectOption value='US'>
          🇺🇸
        </PhoneFieldSelectOption>
        <PhoneFieldSelectOption value='IT'>
          🇮🇹
        </PhoneFieldSelectOption>
      </PhoneFieldSelectListbox>
    )
  }
}