import {
  HelperText,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function PagedYearRange() {
  const [birthYear, setBirthYear] = useState<string | null>(null);
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Birth year'
        aria-describedby={hintId}
        locale='en-US'
        defaultFocusedDate='1990-01-01'
        min='1926-01-01'
        max='2008-01-01'
        value={birthYear}
        onChangeValue={setBirthYear}
        period={20}
      >
        <YearPickerScroller>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout rows={5} cols={4}>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <HelperText id={hintId}>Members must be 18 to 100 years old in 2026.</HelperText>
    </div>
  );
}
