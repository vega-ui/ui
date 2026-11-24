import { useState } from 'react';
import { Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const monthNames = Array.from({ length: 12 }, (_, month) => new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2000, month, 1)));
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const years = Array.from({ length: 97 }, (_, index) => 1930 + index);

const daysIn = (month: number, year: number) => new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

export default function BirthDate() {
  const [month, setMonth] = useState(2);
  const [day, setDay] = useState(14);
  const [year, setYear] = useState(1995);

  const changeMonth = (next: number) => {
    setMonth(next);
    setDay((current) => Math.min(current, daysIn(next, year)));
  };

  const changeYear = (next: number) => {
    setYear(next);
    setDay((current) => Math.min(current, daysIn(month, next)));
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text id='birth-date-label' size={3} fontWeight={600}>Date of birth</Text>
      <WheelPicker aria-labelledby='birth-date-label'>
        <WheelPickerColumn aria-label='Month' loop value={month} onChangeValue={changeMonth} style={{ minInlineSize: '7.5em' }}>
          {monthNames.map((name, index) => <WheelPickerOption key={name} value={index}><WheelPickerFace>{name}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Day' loop value={day} onChangeValue={setDay}>
          {days.map((value) => <WheelPickerOption key={value} value={value} disabled={value > daysIn(month, year)}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Year' value={year} onChangeValue={changeYear}>
          {years.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
      </WheelPicker>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {`${monthNames[month]} ${day}, ${year}`}
      </Text>
    </div>
  );
}
