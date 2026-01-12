import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import {
  PaginationEllipsis,
  PaginationItem,
  PaginationText,
  PaginationTriggerIconButton,
} from './components';
import { IconButtonProps } from '../IconButton';
import { JSX, useState } from 'react';
import { Icon } from '../Icon';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, MoveLeft, MoveRight } from '@vega-ui/icons';
import { PaginationListItem } from './components/PaginationListItem';

const meta = {
  title: 'Navigation/Pagination/Pagination',
  component: Pagination,
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
    }
  },
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <>
        <PaginationListItem>
          <PaginationTriggerIconButton>
            <Icon><DoubleArrowLeftIcon /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton>
            <Icon><MoveLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem>111</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem>112</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationEllipsis />
        </PaginationListItem>
        <PaginationListItem>
          <PaginationItem>113</PaginationItem>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton>
            <Icon><DoubleArrowRightIcon /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton>
            <Icon><MoveRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </>
    ),
  },
};

export const LinkBasedPagination: Story = {
  render(props) {
    const searchParams = new URLSearchParams(window.location.search)
    const currentPage = parseInt(searchParams.get('page') || '1', 10)
    const totalPages = 20

    const getHref = (page: number) => `?page=${page}`
    const isFirst = currentPage <= 1
    const isLast = currentPage >= totalPages

    const renderPageItem = (page: number) => (
      <PaginationListItem>
        <PaginationItem
          asChild
          key={page}
          current={page === currentPage}
        >
          <a href={getHref(page)}>{page}</a>
        </PaginationItem>
      </PaginationListItem>
    )

    const pages: JSX.Element[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageItem(i))
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(renderPageItem(i))
        }
        pages.push(
          <PaginationListItem>
            <PaginationEllipsis key='ellipsis-end' />
          </PaginationListItem>
        )
        pages.push(renderPageItem(totalPages)) 
      } else if (currentPage >= totalPages - 3) {
        pages.push(renderPageItem(1))
        pages.push(
          <PaginationListItem>
            <PaginationEllipsis key='ellipsis-start' />
          </PaginationListItem>
        )
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(renderPageItem(i))
        }
      } else {
        pages.push(renderPageItem(1))
        pages.push(
          <PaginationListItem>
            <PaginationEllipsis key='ellipsis-start' />
          </PaginationListItem>
        )
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(renderPageItem(i))
        }
        pages.push(
          <PaginationListItem>
            <PaginationEllipsis key='ellipsis-end' />
          </PaginationListItem>
        )
        pages.push(renderPageItem(totalPages))
      }
    }

    return (
      <Pagination {...props}>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isFirst} asChild>
            <a href={getHref(1)} aria-disabled={isFirst}><Icon><DoubleArrowLeftIcon /></Icon></a>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isFirst} asChild>
            <a href={getHref(currentPage - 1)} aria-disabled={isFirst}><Icon><MoveLeft /></Icon></a>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        {pages}
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isLast} asChild>
            <a href={getHref(currentPage + 1)} aria-disabled={isLast}><Icon><MoveRight /></Icon></a>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isLast} asChild>
            <a href={getHref(totalPages)} aria-disabled={isLast}><Icon><DoubleArrowRightIcon /></Icon></a>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    )
  },
};

export const ButtonBasedPagination: Story = {
  render(props) {
    const totalPages = 20
    const [page, setPage] = useState(1)

    const isFirst = page === 1
    const isLast = page === totalPages

    const renderItem = (p: number) => (
      <PaginationItem asChild={false} key={p} current={p === page} onClick={() => setPage(p)}>
        {p}
      </PaginationItem>
    )

    return (
      <Pagination {...props}>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isFirst} onClick={() => setPage(1)}>
            <Icon><DoubleArrowLeftIcon /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isFirst} onClick={() => setPage(page - 1)}>
            <Icon><MoveLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>

        {page > 3 && (
          <PaginationListItem>
            <PaginationItem asChild={false} onClick={() => setPage(1)}>1</PaginationItem>
          </PaginationListItem>
        )}
        {page > 4 && (
          <PaginationListItem>
            <PaginationEllipsis />
          </PaginationListItem>
        )}

        {Array.from({ length: 3 }, (_, i) => page - 1 + i).map((p) => {
          if (p < 1 || p > totalPages) return null
          return renderItem(p)
        })}

        {page < totalPages - 3 && (
          <PaginationListItem>
            <PaginationEllipsis />
          </PaginationListItem>
        )}
        {page < totalPages - 2 && (
          <PaginationListItem>
            <PaginationItem onClick={() => setPage(totalPages)}>{totalPages}</PaginationItem>
          </PaginationListItem>
        )}
        
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isLast} onClick={() => setPage(page + 1)}>
            <Icon><MoveRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isLast} onClick={() => setPage(totalPages)}>
            <Icon><DoubleArrowRightIcon /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    )
  }
}

export const CompactPagination: StoryObj = {
  render: () => {
    const totalPages = 20
    const [page, setPage] = useState(1)

    const isFirst = page === 1
    const isLast = page === totalPages

    return (
      <Pagination>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isFirst} onClick={() => setPage(1)}>
            <Icon><DoubleArrowLeftIcon /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isFirst} onClick={() => setPage(page - 1)}>
            <Icon><MoveLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        
        <PaginationText>
          Page {page} of {totalPages}
        </PaginationText>
        
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isLast} onClick={() => setPage(page + 1)}>
            <Icon><MoveRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationListItem>
          <PaginationTriggerIconButton disabled={isLast} onClick={() => setPage(totalPages)}>
            <Icon><DoubleArrowRightIcon /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    )
  },
}