import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldsetHeader } from './FieldsetHeader';
import { FieldsetLegend } from '../FieldsetLegend';

const meta: Meta<typeof FieldsetHeader> = {
  title: 'Form/Layout/Fieldset/FieldsetHeader',
  component: FieldsetHeader,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <FieldsetLegend>
        Title
      </FieldsetLegend>
    )
  }
}