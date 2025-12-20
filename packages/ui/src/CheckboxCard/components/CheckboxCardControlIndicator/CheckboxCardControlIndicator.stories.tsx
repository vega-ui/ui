import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCardControlIndicator } from './CheckboxCardControlIndicator';
import { CheckboxCardControl } from '../CheckboxCardControl';
import { CheckboxCardControlHiddenInput } from '../CheckboxCardControlHiddenInput';
import { CheckboxCardControlIndeterminateIcon } from '../CheckboxCardControlIndeterminateIcon';
import { CheckboxCardControlCheckedIcon } from '../CheckboxCardControlCheckedIcon';

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardControlIndicator',
  component: CheckboxCardControlIndicator,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <CheckboxCardControl>
        <CheckboxCardControlHiddenInput />
        <Story />
      </CheckboxCardControl>
    )
  }
} satisfies Meta<typeof CheckboxCardControlIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <CheckboxCardControlIndeterminateIcon key={0} />,
      <CheckboxCardControlCheckedIcon key={1} />,
    ]
  }
};