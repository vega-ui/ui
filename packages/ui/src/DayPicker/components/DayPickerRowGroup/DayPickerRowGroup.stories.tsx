import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerRowGroup } from './DayPickerRowGroup.tsx';
import { DayPickerItem } from '../DayPickerItem';
import { DayPickerRow } from '../DayPickerRow';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPickerRowGroup> = {
  title: 'Data/Pickers/DayPicker/DayPickerRowGroup',
  component: DayPickerRowGroup,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <DayPickerRow row={0}>
        <DayPickerItem col={0}>1</DayPickerItem>
        <DayPickerItem col={1}>2</DayPickerItem>
        <DayPickerItem col={2}>3</DayPickerItem>
        <DayPickerItem col={3}>4</DayPickerItem>
        <DayPickerItem col={4}>5</DayPickerItem>
        <DayPickerItem col={5}>6</DayPickerItem>
        <DayPickerItem col={6}>7</DayPickerItem>
      </DayPickerRow>,
      <DayPickerRow row={1}>
        <DayPickerItem col={0}>8</DayPickerItem>
        <DayPickerItem col={1}>9</DayPickerItem>
        <DayPickerItem col={2}>10</DayPickerItem>
        <DayPickerItem col={3}>11</DayPickerItem>
        <DayPickerItem col={4}>12</DayPickerItem>
        <DayPickerItem col={5}>13</DayPickerItem>
        <DayPickerItem col={6}>14</DayPickerItem>
      </DayPickerRow>
    ]
  },
};