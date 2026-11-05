import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import {
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationText,
  PaginationTriggerIconButton,
} from './components';
import { IconButtonProps } from '../IconButton';
import { Icon } from '../Icon';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, MoveLeft, MoveRight } from '@vega-ui/icons';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  subcomponents: {
    PaginationItem,
    PaginationTriggerIconButton,
    PaginationEllipsis,
    PaginationText,
    PaginationListItem,
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
      options: ['xs', 'sm', 'md', 'lg', 'xl'] as IconButtonProps['size'][],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'] as IconButtonProps['variant'][],
    },
  },
  args: {
    children: (
      <>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='First page'>
            <Icon><DoubleArrowLeftIcon /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Previous page'>
            <Icon><MoveLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem current>1</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem>2</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationEllipsis />
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem>10</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Next page'>
            <Icon><MoveRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Last page'>
            <Icon><DoubleArrowRightIcon /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </>
    ),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ItemStates: Story = {
  parameters: {
    docs: {
      description: {
        story: '`current` marks the active page, `disabled` blocks an item or a trigger on its own, and the last item carries a long page number.',
      },
    },
  },
  args: {
    children: (
      <>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Previous page' disabled>
            <Icon><MoveLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem current>1</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem disabled>2</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem>1235</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Next page'>
            <Icon><MoveRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </>
    ),
  },
};
