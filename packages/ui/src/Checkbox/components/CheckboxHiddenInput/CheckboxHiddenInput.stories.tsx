import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../../Checkbox.tsx';
import { CheckboxHiddenInput } from './CheckboxHiddenInput';
import { CheckboxCheckedIcon } from '../CheckboxCheckedIcon';
import { CheckboxIndeterminateIcon } from '../CheckboxIndeterminateIcon';
import { CheckboxIndicator } from '../CheckboxIndicator';

const meta = {
  title: 'Form/Selectors/Checkbox/CheckboxHiddenInput',
  component: CheckboxHiddenInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <Checkbox>
        <Story />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
      </Checkbox>
    )
  }
} satisfies Meta<typeof CheckboxHiddenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};