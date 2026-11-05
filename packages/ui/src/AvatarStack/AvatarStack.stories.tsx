import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarStack } from './AvatarStack';
import { AvatarFallback, AvatarImage, AvatarSize, AvatarVariant } from '../Avatar';
import { AvatarStackItem } from './components';

const image = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#7c9cd6"/><circle cx="32" cy="26" r="12" fill="#e9eefa"/><rect x="12" y="42" width="40" height="30" rx="15" fill="#e9eefa"/></svg>')}`;

const people = [
  { name: 'Alice Kim', initials: 'AK', src: image },
  { name: 'Bob Carter', initials: 'BC' },
  { name: 'Lena Adams', initials: 'LA', src: image },
  { name: 'Mark Owens', initials: 'MO' },
  { name: 'Nina Park', initials: 'NP', src: image },
  { name: 'Omar Haddad', initials: 'OH' },
];
const sizes: AvatarSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const variants: AvatarVariant[] = ['primary', 'secondary'];

const items = people.map((person) => (
  <AvatarStackItem key={person.name}>
    <AvatarFallback>{person.initials}</AvatarFallback>
    {person.src && <AvatarImage src={person.src} alt={person.name} />}
  </AvatarStackItem>
));

const meta = {
  title: 'Display/AvatarStack',
  component: AvatarStack,
  subcomponents: {
    AvatarStackItem,
  },
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4176&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
  args: {
    children: items,
  },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${variants.length}, auto)`, gap: 24, alignItems: 'center', justifyContent: 'start' }}>
      {sizes.map((size) => variants.map((variant) => (
        <AvatarStack key={`${size}-${variant}`} size={size} variant={variant}>
          {items}
        </AvatarStack>
      )))}
    </div>
  ),
};
