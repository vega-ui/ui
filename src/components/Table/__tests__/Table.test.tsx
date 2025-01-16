import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Table } from '../Table.tsx';
import { TableBody, TableData, TableHead, TableHeading, TableRow } from '../components';
import { Text } from '../../Text';

const headings = [
  'Модель', 'Цвет', 'Цена'
]

const dataList = [
  'Model T', 'Red', '22.000'
]

const TableElement = (
  <Table>
    <TableHead>
      <TableRow>
        {headings.map((heading, index) => (
          <TableHeading data-testid='heading' key={index}>
            <Text>{heading}</Text>
          </TableHeading>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        {dataList.map((data) => (
          <TableData>
            <Text>{data}</Text>
          </TableData>
        ))}
      </TableRow>
    </TableBody>
  </Table>
)

describe('Table', () => {
  it('render', () => {
    render(TableElement)

    waitFor(() => {
      headings.forEach((heading) => {
        expect(screen.queryByText(heading)).toBeTruthy()
      })

      dataList.forEach((data) => {
        expect(screen.queryByText(data)).toBeTruthy()
      })
    })
  })
})