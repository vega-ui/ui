import { DayPicker, DayPickerCell, DayPickerLayout } from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MinimalComposition({ locale = 'en-US' }: { locale?: string }) {
  return (
    <DayPicker aria-label='November 2026' locale={locale} month='2026-11-01'>
      <DayPickerLayout>
        <DayPickerCell />
      </DayPickerLayout>
    </DayPicker>
  );
}
