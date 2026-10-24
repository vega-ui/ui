import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeft } from '@vega-ui/icons';
import { CalendarBaseControlIconButton } from './CalendarBaseControlIconButton';
import { Icon } from '../../../Icon';

const meta: Meta<typeof CalendarBaseControlIconButton> = {
  title: 'Data/CalendarBase/CalendarBaseControlIconButton',
  component: CalendarBaseControlIconButton,
  args: {
    'aria-label': 'Previous',
    children: <Icon><ChevronLeft /></Icon>,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A ghost icon button in the size and variant of the surrounding
 * `CalendarBase`. The icon has no text, so give it an `aria-label`.
 */
export const Default: Story = {
  args: {},
};
