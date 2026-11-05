import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, BadgeProps } from './Badge';

const variants: BadgeProps['variant'][] = ['info', 'error', 'success', 'warning'];
const appearances: BadgeProps['appearance'][] = ['ghost', 'outline', 'fill', 'surface'];
const sizes: BadgeProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const rows = variants.flatMap((variant) => appearances.map((appearance) => ({ variant, appearance })));

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2902&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['info', 'error', 'success', 'warning'],
    },
    appearance: {
      control: 'radio',
      options: ['fill', 'outline', 'ghost', 'surface'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, min-content)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => (
        <Badge key={`${row.variant}-${row.appearance}-${size}`} {...row} size={size}>
          {`${row.variant} / ${row.appearance} / ${size}`}
        </Badge>
      )))}
    </div>
  ),
};
