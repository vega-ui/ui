import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  GridScroller,
  Icon,
  Button,
  IndexedSnapScrollerContent,
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
    <GridRowGroup>
      {rows.map((rowIndex) => {
        const row = index * rows.length + rowIndex;

        return (
          <GridRow key={row} row={row}>
            {cols.map((col) => {
              const year = getPageStart(index) + rowIndex * cols.length + col;

              return (
                <GridCell key={year} col={col} value={year} asChild>
                  <GridItem size='sm'>{year}</GridItem>
                </GridCell>
              );
            })}
          </GridRow>
        );
      })}
    </GridRowGroup>
  );
}

export default function PagedPickerWithOwnButtons() {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState(0);

  return (
    <Grid aria-label='Graduation year' selection='single' wrap='horizontal' defaultValue={2021} defaultActive={2021} style={{ width: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button square aria-label='Previous years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeftIcon /></Icon>
        </Button>
        <Text size={2} aria-live='polite'>{getPageStart(page)}–{getPageStart(page) + perPage - 1}</Text>
        <Button square aria-label='Next years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRightIcon /></Icon>
        </Button>
      </div>
      <GridScroller apiRef={scrollerRef} defaultIndex={0} onScrollSnapChanging={(_, index) => setPage(index)}>
        <IndexedSnapScrollerContent style={{ width: '100%' }}>
          <YearPage />
        </IndexedSnapScrollerContent>
      </GridScroller>
    </Grid>
  );
}
