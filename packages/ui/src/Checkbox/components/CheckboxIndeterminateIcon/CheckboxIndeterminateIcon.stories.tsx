import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxIndeterminateIcon } from './CheckboxIndeterminateIcon';
import { Checkbox } from '../../Checkbox';
import { CheckboxIndicator } from '../CheckboxIndicator';
import { CheckboxHiddenInput } from '../CheckboxHiddenInput';
import { Diff } from '@vega-ui/icons';

const meta = {
  title: 'Form/Selectors/Checkbox/CheckboxIndeterminateIcon',
  component: CheckboxIndeterminateIcon,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <Checkbox indeterminate>
        <CheckboxHiddenInput />
        <CheckboxIndicator>
          <Story />
        </CheckboxIndicator>
      </Checkbox>
    )
  }
} satisfies Meta<typeof CheckboxIndeterminateIcon>;

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