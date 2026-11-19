import { CSSProperties, useState } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from '@vega-ui/icons';
import {
  Button,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const describeFilter = ([from, to]: [string, string]) => {
  if (!from) return 'No date filter';
  if (!to) return `Created on ${from}`;

  return `Created from ${from} to ${to}`;
};

export default function RangeInAFilterDrawer() {
  const [created, setCreated] = useState<[string, string]>(['', '']);
  const [applied, setApplied] = useState<[string, string]>(['', '']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Filters</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby='order-filters-title' style={{ width: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='order-filters-title' as='h2' size={4} fontWeight={600}>Order filters</Heading>
            <DrawerClose asChild>
              <Button
                square
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </DrawerClose>
          </div>
          <form
            method='dialog'
            onSubmit={() => setApplied(created)}
            style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}
          >
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='created'>Created</Label>
              <DateRangeField format='dd.MM.yyyy' separator='.' value={created} onChangeValue={setCreated}>
                <DateRangeFieldInput id='created' placeholder='dd.mm.yyyy – dd.mm.yyyy' />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateRangeFieldTrigger square aria-label='Choose creation dates'><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
                  </PopoverTrigger>
                  <PopoverContent>
                    <DateRangeFieldCalendar aria-label='Choose creation dates'>
                      <CalendarHeader>
                        <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
                        <CalendarHeading>
                          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                        </CalendarHeading>
                        <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
                      </CalendarHeader>
                      <CalendarContent>
                        <CalendarDays>
                          <CalendarWeekdays>
                            <CalendarWeekday />
                          </CalendarWeekdays>
                          <CalendarDaysScroller>
                            <CalendarDaysScrollerContent>
                              <CalendarWeeks>
                                <CalendarDay />
                              </CalendarWeeks>
                            </CalendarDaysScrollerContent>
                          </CalendarDaysScroller>
                        </CalendarDays>
                        <CalendarMonths>
                          <CalendarMonthsGrid>
                            <CalendarMonth />
                          </CalendarMonthsGrid>
                        </CalendarMonths>
                        <CalendarYears>
                          <CalendarYearsScroller>
                            <CalendarYearsScrollerContent>
                              <CalendarYearsGrid>
                                <CalendarYear />
                              </CalendarYearsGrid>
                            </CalendarYearsScrollerContent>
                          </CalendarYearsScroller>
                        </CalendarYears>
                      </CalendarContent>
                    </DateRangeFieldCalendar>
                  </PopoverContent>
                </Popover>
              </DateRangeField>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <Button type='submit'>Show orders</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
      <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>
        {describeFilter(applied)}
      </Text>
    </div>
  );
}
