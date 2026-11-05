import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { AvatarFallback, AvatarIcon, AvatarImage } from './components';
import { HeartPlus } from '@vega-ui/icons';
import { AvatarSize, AvatarVariant } from './types';

const image = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#7c9cd6"/><circle cx="32" cy="26" r="12" fill="#e9eefa"/><rect x="12" y="42" width="40" height="30" rx="15" fill="#e9eefa"/></svg>')}`;
const brokenImage = 'data:image/png;base64,';

const sizes: AvatarSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const variants: AvatarVariant[] = ['primary', 'secondary'];
const contents = [
  {
    name: 'image',
    children: [
      <AvatarFallback key='fallback'>BC</AvatarFallback>,
      <AvatarImage key='image' src={image} alt='Bob Carter' />,
    ],
  },
  {
    name: 'broken image',
    children: [
      <AvatarFallback key='fallback'>BC</AvatarFallback>,
      <AvatarImage key='image' src={brokenImage} alt='Bob Carter' />,
    ],
  },
  {
    name: 'initials',
    children: <AvatarFallback>BC</AvatarFallback>,
  },
  {
    name: 'icon',
    children: <AvatarIcon><HeartPlus /></AvatarIcon>,
  },
];
const rows = variants.flatMap((variant) => contents.map((content) => ({ variant, content })));

const meta = {
  title: 'Display/Avatar',
  component: Avatar,
  subcomponents: {
    AvatarFallback,
    AvatarImage,
    AvatarIcon,
  },
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2671&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
  args: {
    children: contents[0].children,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center', justifyContent: 'start' }}>
      {rows.map((row) => sizes.map((size) => (
        <Avatar key={`${row.variant}-${row.content.name}-${size}`} variant={row.variant} size={size}>
          {row.content.children}
        </Avatar>
      )))}
    </div>
  ),
};
