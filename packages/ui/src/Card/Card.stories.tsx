import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Text } from '../Text';
import { CardAppearance, CardSize } from './types';

const sizes: CardSize[] = ['sm', 'md', 'lg'];
const appearances: CardAppearance[] = ['outline', 'transparent'];

const meta = {
  title: 'Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-595&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    appearance: {
      control: 'radio',
      options: ['outline', 'transparent'],
    },
  },
  args: {
    children: <Text>I'm a card!</Text>,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {appearances.map((appearance) => sizes.map((size) => (
        <Card key={`${appearance}-${size}`} appearance={appearance} size={size}>
          <Text>{`${appearance} / ${size}`}</Text>
        </Card>
      )))}
    </div>
  ),
};
