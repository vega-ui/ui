import type { Meta, StoryObj } from '@storybook/react-vite';

import { PhoneFieldSelectCombobox } from './PhoneFieldSelectCombobox';
import { PhoneFieldSelectHiddenSelect } from '../PhoneFieldSelectHiddenSelect';
import { PhoneFieldSelectValue } from '../PhoneFieldSelectValue';
import { PhoneFieldSelectIcon } from '../PhoneFieldSelectIcon';
import { PhoneFieldSelectListbox } from '../PhoneFieldSelectListbox';
import { PhoneFieldSelectOption } from '../PhoneFieldSelectOption';
import { PhoneField } from '../../PhoneField';
import { PhoneFieldInput } from '../PhoneFieldInput';
import { PhoneFieldSelect } from '../PhoneFieldSelect';
import { PhoneFieldSelectPortal } from '../PhoneFieldSelectPortal';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldSelect/PhoneFieldSelectCombobox',
  component: PhoneFieldSelectCombobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <PhoneField defaultCode='RU'>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect />
          <Story />
          <PhoneFieldSelectPortal>
            <PhoneFieldSelectListbox>
              <PhoneFieldSelectOption value='RU'>
                RU
              </PhoneFieldSelectOption>
            </PhoneFieldSelectListbox>
          </PhoneFieldSelectPortal>
        </PhoneFieldSelect>
        <PhoneFieldInput />
      </PhoneField>
    )
  },
  args: {
    children: [
      <PhoneFieldSelectValue key={0} />,
      <PhoneFieldSelectIcon key={1} />
    ]
  }
} satisfies Meta<typeof PhoneFieldSelectCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}