import {
  Icon,
  IconButton,
  type IndexedSnapScrollerApiRef,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef, useState } from 'react';

const PERIOD = 20;
const FIRST_YEAR = '2007-01-01';

function getYear(key: string) {
  return Number(key.slice(0, 4));
}

export default function PagedYearsWithOwnButtons() {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState(FIRST_YEAR);
  const [selected, setSelected] = useState<string | null>(null);

  const firstYear = getYear(page);
  const lastYear = firstYear + PERIOD - 1;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Earlier years' size='sm' variant='secondary' appearance='ghost' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{firstYear}–{lastYear}</Text>
        <IconButton aria-label='Later years' size='sm' variant='secondary' appearance='ghost' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <YearPicker
        aria-label='Founding year'
        locale='en-US'
        defaultFocusedDate={FIRST_YEAR}
        value={selected}
        onChangeValue={setSelected}
        period={PERIOD}
      >
        <YearPickerScroller apiRef={scrollerRef} onChangePeriod={setPage}>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout rows={5} cols={4}>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
    </div>
  );
}
