import type { Meta, StoryObj } from '@storybook/react-vite';
import { Diff } from '@vega-ui/icons';
import { CheckboxCardControlIndeterminateIcon } from './CheckboxCardControlIndeterminateIcon';
import { CheckboxCardControl } from '../CheckboxCardControl';
import { CheckboxCardControlIndicator } from '../CheckboxCardControlIndicator';
import { CheckboxCardControlHiddenInput } from '../CheckboxCardControlHiddenInput';

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardControlIndeterminateIcon',
  component: CheckboxCardControlIndeterminateIcon,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <CheckboxCardControl indeterminate>
        <CheckboxCardControlHiddenInput />
        <CheckboxCardControlIndicator>
          <Story />
        </CheckboxCardControlIndicator>
      </CheckboxCardControl>
    )
  }
} satisfies Meta<typeof CheckboxCardControlIndeterminateIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Custom: Story = {
  args: {
    children: <Diff />
  }
}