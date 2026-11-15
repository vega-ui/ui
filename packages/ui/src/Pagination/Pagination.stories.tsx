import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination, PaginationProps } from './Pagination';
import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from './components';
import { Icon } from '../Icon';
import { MoveLeft, MoveRight } from '@vega-ui/icons';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  subcomponents: {
    PaginationList,
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-3149&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'] as PaginationProps['size'][],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'] as PaginationProps['variant'][],
    },
  },
  args: {
    'aria-label': 'Pages',
    children: (
      <PaginationList>
        <PaginationItem>
          <PaginationLink href='?page=1' aria-label='Previous page'>
            <Icon><MoveLeft /></Icon>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='?page=1'>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='?page=2' current>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='?page=3'>3</PaginationLink>
        </PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>
          <PaginationLink href='?page=10'>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='?page=3' aria-label='Next page'>
            <Icon><MoveRight /></Icon>
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    ),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: PaginationProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const variants: PaginationProps['variant'][] = ['primary', 'secondary'];

export const Playground: Story = {};

export const LinkStates: Story = {
  parameters: {
    docs: {
      description: {
        story: '`current` marks the page, a link without `href` and with `aria-disabled` is disabled, `appearance` replaces the default look, and the last link carries a long page number.',
      },
    },
  },
  args: {
    children: (
      <PaginationList>
        <PaginationItem>
          <PaginationLink aria-label='Previous page' aria-disabled='true'>
            <Icon><MoveLeft /></Icon>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='?page=1' current>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='?page=2' appearance='ghost'>2</PaginationLink>
        </PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>
          <PaginationLink href='?page=1235'>1235</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='?page=2' aria-label='Next page'>
            <Icon><MoveRight /></Icon>
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    ),
  },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {variants.map((variant) => sizes.map((size) => (
        <Pagination key={`${variant}-${size}`} aria-label={`${variant} / ${size}`} variant={variant} size={size}>
          <PaginationList>
            <PaginationItem><PaginationLink href='?page=1' current>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href='?page=2'>2</PaginationLink></PaginationItem>
            <PaginationEllipsis />
            <PaginationItem><PaginationLink href='?page=9'>9</PaginationLink></PaginationItem>
            <PaginationItem>
              <PaginationLink href='?page=2' aria-label='Next page'>
                <Icon><MoveRight /></Icon>
              </PaginationLink>
            </PaginationItem>
          </PaginationList>
        </Pagination>
      )))}
    </div>
  ),
};
