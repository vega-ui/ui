import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCardControlInput } from './CheckboxCardControlInput';

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardControlInput',
  component: CheckboxCardControlInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckboxCardControlInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};