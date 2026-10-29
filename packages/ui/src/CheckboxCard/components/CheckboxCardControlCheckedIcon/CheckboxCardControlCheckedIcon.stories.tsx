import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rocket } from '@vega-ui/icons';
import { CheckboxCardControlCheckedIcon } from './CheckboxCardControlCheckedIcon';
import { CheckboxCardControl } from '../CheckboxCardControl';
import { CheckboxCardControlHiddenInput } from '../CheckboxCardControlHiddenInput';
import { CheckboxCardControlIndicator } from '../CheckboxCardControlIndicator';

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardControlCheckedIcon',
  component: CheckboxCardControlCheckedIcon,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <CheckboxCardControl checked>
        <CheckboxCardControlHiddenInput />
        <CheckboxCardControlIndicator>
          <Story />
        </CheckboxCardControlIndicator>
      </CheckboxCardControl>
    )
  }
} satisfies Meta<typeof CheckboxCardControlCheckedIcon>;

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