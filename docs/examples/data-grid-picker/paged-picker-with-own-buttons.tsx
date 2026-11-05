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
