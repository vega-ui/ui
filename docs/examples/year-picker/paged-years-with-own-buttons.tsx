import {
  Button,
  Icon,
  type IndexedSnapScrollerApiRef,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
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
        <Button square aria-label='Earlier years' size='sm' variant='secondary' appearance='ghost' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeftIcon /></Icon>
        </Button>
        <Text fontWeight={600} aria-live='polite'>{firstYear}–{lastYear}</Text>
        <Button square aria-label='Later years' size='sm' variant='secondary' appearance='ghost' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRightIcon /></Icon>
        </Button>
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
