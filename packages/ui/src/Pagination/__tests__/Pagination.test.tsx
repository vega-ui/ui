import { describe, it, expect, vi } from 'vitest'
import { ReactElement } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from '../Pagination'
import {
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationText
} from '../components';

const setup = (page = 1, total = 5, onChange = vi.fn()) => {
  const isFirst = page === 1
  const isLast = page === total

  render(
    <Pagination>
      <PaginationFirstTrigger aria-label='first' disabled={isFirst} onClick={() => onChange(1)}>
        <button />
      </PaginationFirstTrigger>
      <PaginationPrevTrigger aria-label='prev' disabled={isFirst} onClick={() => onChange(page - 1)}>
        <button/>
      </PaginationPrevTrigger>
      <PaginationText>
        Page {page} of {total}
      </PaginationText>
      <PaginationNextTrigger aria-label='next' disabled={isLast} onClick={() => onChange(page + 1)}>
        <button/>
      </PaginationNextTrigger>
      <PaginationLastTrigger aria-label='last' disabled={isLast} onClick={() => onChange(total)}>
        <button/>
      </PaginationLastTrigger>
    </Pagination>
  )

  return { onChange }
}

const setupWithButton = (currentPage: number, totalPages = 20) => {
  const pages: ReactElement[] = []

  const renderItem = (page: number) => (
    <PaginationItem asChild={false} key={page} current={page === currentPage}>
      {page}
    </PaginationItem>
  )

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(renderItem(i))
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(renderItem(i))
      pages.push(<PaginationEllipsis key={Math.random()} />)
      pages.push(renderItem(totalPages))
    } else if (currentPage >= totalPages - 3) {
      pages.push(renderItem(1))
      pages.push(<PaginationEllipsis key={Math.random()} />)
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(renderItem(i))
    } else {
      pages.push(renderItem(1))
      pages.push(<PaginationEllipsis key={Math.random()} />)
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(renderItem(i))
      pages.push(<PaginationEllipsis key={Math.random()} />)
      pages.push(renderItem(totalPages))
    }
  }

  render(<Pagination>{pages}</Pagination>)
}

describe('Pagination', () => {
  it('renders pagination text correctly', () => {
    setup(3, 5)
    expect(screen.getByText('Page 3 of 5')).toBeDefined()
  })

  it('calls onChange with correct page when Next is clicked', () => {
    const { onChange } = setup(2, 5)
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('calls onChange with correct page when Prev is clicked', () => {
    const { onChange } = setup(3, 5)
    fireEvent.click(screen.getByRole('button', { name: /prev/i }))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('calls onChange with 1 when First is clicked', () => {
    const { onChange } = setup(4, 5)
    fireEvent.click(screen.getByRole('button', { name: /first/i }))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('calls onChange with last page when Last is clicked', () => {
    const { onChange } = setup(2, 5)
    fireEvent.click(screen.getByRole('button', { name: /last/i }))
    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('disables Prev and First on the first page', () => {
    setup(1, 5)
    expect(screen.getByRole('button', { name: /first/i }).getAttribute('disabled')).toBe('')
    expect(screen.getByRole('button', { name: /prev/i }).getAttribute('disabled')).toBe('')
  })

  it('disables Next and Last on the last page', () => {
    setup(5, 5)
    expect(screen.getByRole('button', { name: /next/i }).getAttribute('disabled')).toBe('')
    expect(screen.getByRole('button', { name: /last/i }).getAttribute('disabled')).toBe('')
  })

  it('renders full range without ellipsis when totalPages <= 7', () => {
    setupWithButton(3, 5)
    expect(screen.queryByText('...')).toBeNull()
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeDefined()
    }
  })

  it('renders ellipsis at end when on early pages', () => {
    setupWithButton(2, 20)
    expect(screen.getByText('...')).toBeDefined()
    expect(screen.queryAllByText('...')).toHaveLength(1)
    expect(screen.getByText('1')).toBeDefined()
    expect(screen.getByText('5')).toBeDefined()
    expect(screen.getByText('20')).toBeDefined()
  })

  it('renders ellipsis at start when on late pages', () => {
    setupWithButton(19, 20)
    expect(screen.queryAllByText('...')).toHaveLength(1)
    expect(screen.getByText('1')).toBeDefined()
    expect(screen.getByText('16')).toBeDefined()
    expect(screen.getByText('20')).toBeDefined()
  })

  it('renders ellipsis on both sides when in the middle', () => {
    setupWithButton(10, 20)
    expect(screen.queryAllByText('...')).toHaveLength(2)
    expect(screen.getByText('1')).toBeDefined()
    expect(screen.getByText('9')).toBeDefined()
    expect(screen.getByText('10').getAttribute('aria-current')).toBe('page')
    expect(screen.getByText('11')).toBeDefined()
    expect(screen.getByText('20')).toBeDefined()
  })
})