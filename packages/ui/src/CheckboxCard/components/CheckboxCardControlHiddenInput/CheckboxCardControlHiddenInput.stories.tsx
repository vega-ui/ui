import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCardControlHiddenInput } from './CheckboxCardControlHiddenInput';

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardControlHiddenInput',
  component: CheckboxCardControlHiddenInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckboxCardControlHiddenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};