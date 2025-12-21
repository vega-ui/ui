import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldsetLegend } from './FieldsetLegend.tsx';

const meta: Meta<typeof FieldsetLegend> = {
  title: 'Form/Layout/Fieldset/FieldsetLegend',
  component: FieldsetLegend,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Title',
  }
}