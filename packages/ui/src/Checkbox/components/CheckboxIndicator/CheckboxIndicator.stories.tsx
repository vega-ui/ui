import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxIndicator } from './CheckboxIndicator';
import { Checkbox } from '../../Checkbox';
import { CheckboxHiddenInput } from '../CheckboxHiddenInput';
import { CheckboxCheckedIcon } from '../CheckboxCheckedIcon';
import { CheckboxIndeterminateIcon } from '../CheckboxIndeterminateIcon';
import { Rocket } from '@vega-ui/icons';

const meta = {
  title: 'Form/Selectors/Checkbox/CheckboxIndicator',
  component: CheckboxIndicator,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <Checkbox>
        <CheckboxHiddenInput />
        <Story />
      </Checkbox>
    )
  }
} satisfies Meta<typeof CheckboxIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <CheckboxCheckedIcon key={0} />,
      <CheckboxIndeterminateIcon key={1} />,
    ]
  },
};

export const CustomCheckedIcon: Story = {
  args: {
    children: [
      <CheckboxCheckedIcon key={0}>
        <Rocket />
      </CheckboxCheckedIcon>,
      <CheckboxIndeterminateIcon key={1} />,
    ]
  },
};