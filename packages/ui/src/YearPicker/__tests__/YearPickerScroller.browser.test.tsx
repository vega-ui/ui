import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { YearPicker } from '../YearPicker';
import { YearPickerScroller, YearPickerScrollerContent, YearPickerCell, YearPickerScrollerLayout } from '../components';
import { IndexedSnapScrollerApiRef } from '../../IndexedSnapScroller';

afterEach(cleanup);

describe('YearPickerScroller', () => {
  it('reports the first day of the first year of the page scrolled into view', async () => {
    const apiRef = createRef<IndexedSnapScrollerApiRef>();
    const onChangePeriod = vi.fn();
    
    render(
      <YearPicker aria-label='Years' year='2026-05-10'>
        <YearPickerScroller apiRef={apiRef} onChangePeriod={onChangePeriod}>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
    );
    
    await expect.poll(() => apiRef.current).not.toBeNull();
    
    apiRef.current?.next();
    await expect.poll(() => onChangePeriod).toHaveBeenLastCalledWith('2038-01-01');
    
    apiRef.current?.prev();
    await expect.poll(() => onChangePeriod).toHaveBeenLastCalledWith('2026-01-01');
  });
});
