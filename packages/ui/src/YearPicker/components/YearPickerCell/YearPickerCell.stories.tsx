import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';
import { YearPickerCell } from './YearPickerCell';
import { YearPicker } from '../../YearPicker';
import { YearPickerLayout } from '../YearPickerLayout';
import { useYearPickerCellContext } from '../../contexts';

const meta: Meta<typeof YearPickerCell> = {
  title: 'Data/YearPicker/YearPickerCell',
  component: YearPickerCell,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  decorators(Story) {
    return (
      <YearPicker>
        <YearPickerLayout>
          <Story />
        </YearPickerLayout>
      </YearPicker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The cell takes its year, column and label from the layout it is placed in.
 */
export const Default: Story = {
  args: {},
};

const getLeapYearNote = (year: number) => {
  if (year % 400 === 0) return 'leap';
  if (year % 100 === 0) return '';
  if (year % 4 === 0) return 'leap';
  return '';
};

const LeapYear: FC = () => {
  const { label, fields } = useYearPickerCellContext();

  return (
    <YearPickerCell style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBlock: 6 }}>
      <span>{label}</span>
      <span style={{ fontSize: 12, color: 'var(--color-gray-accent-600)' }}>{fields ? getLeapYearNote(fields.year) : ''}</span>
    </YearPickerCell>
  );
};

/**
 * Children replace the label. Read the year with `useYearPickerCellContext()`
 * to build custom content; here leap years are marked.
 */
export const CustomContent: Story = {
  render: () => <LeapYear />,
};
