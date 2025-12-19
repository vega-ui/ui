import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCheckedIcon } from './CheckboxCheckedIcon.tsx';
import { Checkbox } from '../../Checkbox.tsx';
import { CheckboxIndicator } from '../CheckboxIndicator';
import { CheckboxHiddenInput } from '../CheckboxHiddenInput';
import { Rocket } from '@vega-ui/icons';

const meta = {
  title: 'Form/Selectors/Checkbox/CheckboxCheckedIcon',
  component: CheckboxCheckedIcon,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <Checkbox checked>
        <CheckboxHiddenInput />
        <CheckboxIndicator>
          <Story />
        </CheckboxIndicator>
      </Checkbox>
    )
  }
} satisfies Meta<typeof CheckboxCheckedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Custom: Story = {
  args: {
    children: <Rocket />
  }
}