import {
  HelperText,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const MIN_AGE = 18;
const CURRENT_YEAR = 2026;

export default function UnderAgeBirthYear() {
  const [birthYear, setBirthYear] = useState<string | null>('2010-01-01');
  const messageId = useId();

  const age = birthYear ? CURRENT_YEAR - Number(birthYear.slice(0, 4)) : null;
  const invalid = age !== null && age < MIN_AGE;

  let message = 'Pick the year you were born.';
  if (age !== null) message = `You turn ${age} this year.`;
  if (invalid) message = `You must be at least ${MIN_AGE} to open an account. You turn ${age} this year.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Birth year'
        aria-describedby={messageId}
        locale='en-US'
        year={birthYear ?? '2000-01-01'}
        selected={birthYear}
        onSelectCell={setBirthYear}
      >
        <YearPickerScroller>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
