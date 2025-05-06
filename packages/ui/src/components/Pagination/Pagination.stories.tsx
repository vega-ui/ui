import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination.tsx';
import {
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem, PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger, PaginationText
} from './components';
import { IconButtonProps } from '../IconButton';
import { JSX, useState } from 'react';

const meta = {
  title: 'UI-Core/Pagination/Pagination',
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
      options: ['small', 'medium', 'large'] as IconButtonProps['size'][],
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
        <PaginationFirstTrigger />
        <PaginationPrevTrigger />
        <PaginationItem>111</PaginationItem>
        <PaginationItem>112</PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>113</PaginationItem>
        <PaginationNextTrigger />
        <PaginationLastTrigger />
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
      <PaginationItem
        key={page}
        href={getHref(page)}
        current={page === currentPage}
      >
        {page}
      </PaginationItem>
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
        pages.push(<PaginationEllipsis key='ellipsis-end' />)
        pages.push(renderPageItem(totalPages)) 
      } else if (currentPage >= totalPages - 3) {
        pages.push(renderPageItem(1))
        pages.push(<PaginationEllipsis key='ellipsis-start' />)
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(renderPageItem(i))
        }
      } else {
        pages.push(renderPageItem(1))
        pages.push(<PaginationEllipsis key='ellipsis-start' />)
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(renderPageItem(i))
        }
        pages.push(<PaginationEllipsis key='ellipsis-end' />)
        pages.push(renderPageItem(totalPages))
      }
    }

    return (
      <Pagination {...props}>
        <PaginationFirstTrigger href={getHref(1)} disabled={isFirst} />
        <PaginationPrevTrigger href={getHref(currentPage - 1)} disabled={isFirst} />
        {pages}
        <PaginationNextTrigger href={getHref(currentPage + 1)} disabled={isLast} />
        <PaginationLastTrigger href={getHref(totalPages)} disabled={isLast} />
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
        <PaginationFirstTrigger disabled={isFirst} onClick={() => setPage(1)}>
          <button />
        </PaginationFirstTrigger>
        <PaginationPrevTrigger disabled={isFirst} onClick={() => setPage(page - 1)}>
          <button/>
        </PaginationPrevTrigger>

        {page > 3 && <PaginationItem asChild={false} onClick={() => setPage(1)}>1</PaginationItem>}
        {page > 4 && <PaginationEllipsis />}

        {Array.from({ length: 3 }, (_, i) => page - 1 + i).map((p) => {
          if (p < 1 || p > totalPages) return null
          return renderItem(p)
        })}

        {page < totalPages - 3 && <PaginationEllipsis />}
        {page < totalPages - 2 && <PaginationItem asChild={false} onClick={() => setPage(totalPages)}>{totalPages}</PaginationItem>}

        <PaginationNextTrigger disabled={isLast} onClick={() => setPage(page + 1)}>
          <button/>
        </PaginationNextTrigger>
        <PaginationLastTrigger disabled={isLast} onClick={() => setPage(totalPages)}>
          <button/>
        </PaginationLastTrigger>
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
        <PaginationFirstTrigger disabled={isFirst} onClick={() => setPage(1)}>
          <button />
        </PaginationFirstTrigger>
        <PaginationPrevTrigger disabled={isFirst} onClick={() => setPage(page - 1)}>
          <button/>
        </PaginationPrevTrigger>

        <PaginationText>
          Page {page} of {totalPages}
        </PaginationText>

        <PaginationNextTrigger disabled={isLast} onClick={() => setPage(page + 1)}>
          <button/>
        </PaginationNextTrigger>
        <PaginationLastTrigger disabled={isLast} onClick={() => setPage(totalPages)}>
          <button/>
        </PaginationLastTrigger>
      </Pagination>
    )
  },
}