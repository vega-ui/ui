# DataGridPicker Patterns

## Dense Choice Matrix

When to use:
Present many short options in a grid where the picker shape is part of the product experience.

Composition notes:
Use `DataGridPickerItem` for every selectable cell and let the picker layer own active and selected styling.

Trade-offs:
The layout is space-efficient, but each item needs strong visual clarity because labels are short.

<!-- example: data-grid-picker/compact-month-like-matrix.tsx -->
```tsx
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '@vega-ui/react';

const months = [
  ['Jan', 'Feb', 'Mar', 'Apr'],
  ['May', 'Jun', 'Jul', 'Aug'],
  ['Sep', 'Oct', 'Nov', 'Dec'],
];

export default function CompactMonthLikeMatrix() {
  return (
    <DataGridPicker
      aria-label='Statement month, 2026'
      size='sm'
      defaultSelected='2026-05'
      defaultActive='2026-05'
      style={{ width: 280 }}
    >
      <DataGridPickerRowGroup>
        {months.map((row, rowIndex) => (
          <DataGridPickerRow key={rowIndex} row={rowIndex}>
            {row.map((month, col) => {
              const value = `2026-${String(rowIndex * 4 + col + 1).padStart(2, '0')}`;

              return (
                <DataGridPickerItem key={month} col={col} value={value}>{month}</DataGridPickerItem>
              );
            })}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
}
```
<!-- /example -->

## Paged Picker

When to use:
The choice set is large enough that it should be paged horizontally.

Composition notes:
Wrap the grid in `DataGridPickerScroller` and render one page component inside `DataGridPickerScrollerContent`. The page reads its `index` from `useIndexedSnapScrollerContext`, derives its data and row numbers from it, and passes it as `scope` of its row group.

Trade-offs:
You gain density and swipe-like paging, but focus and active-state restoration become more important.

<!-- example: data-grid-picker/paged-picker-with-own-buttons.tsx -->
```tsx
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  DataGridPickerScroller,
  DataGridPickerScrollerContent,
  Icon,
  IconButton,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';

const firstYear = 2016;
const rows = [0, 1, 2];
const cols = [0, 1, 2, 3];
const perPage = rows.length * cols.length;

const getPageStart = (page: number) => firstYear + page * perPage;

function YearPage() {
  const { index } = useIndexedSnapScrollerContext();

  return (
    <DataGridPickerRowGroup scope={index}>
      {rows.map((rowIndex) => {
        const row = index * rows.length + rowIndex;

        return (
          <DataGridPickerRow key={row} row={row}>
            {cols.map((col) => {
              const year = getPageStart(index) + rowIndex * cols.length + col;

              return <DataGridPickerItem key={year} col={col} value={year}>{year}</DataGridPickerItem>;
            })}
          </DataGridPickerRow>
        );
      })}
    </DataGridPickerRowGroup>
  );
}

export default function PagedPickerWithOwnButtons() {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState(0);

  return (
    <DataGridPicker aria-label='Graduation year' size='sm' defaultSelected={2021} defaultActive={2021} style={{ width: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text size={2} aria-live='polite'>{getPageStart(page)}–{getPageStart(page) + perPage - 1}</Text>
        <IconButton aria-label='Next years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <DataGridPickerScroller apiRef={scrollerRef} defaultIndex={0} onScrollSnapChanging={(_, index) => setPage(index)}>
        <DataGridPickerScrollerContent style={{ width: '100%' }}>
          <YearPage />
        </DataGridPickerScrollerContent>
      </DataGridPickerScroller>
    </DataGridPicker>
  );
}
```
<!-- /example -->
