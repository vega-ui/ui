import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBasePickerButton } from './CalendarBasePickerButton';

const meta: Meta<typeof CalendarBasePickerButton> = {
  title: 'Data/CalendarBase/CalendarBasePickerButton',
  component: CalendarBasePickerButton,
  args: {
    children: 'March',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A transparent button in the size and variant of the surrounding
 * `CalendarBase`.
 */
export const Default: Story = {
  args: {},
};
