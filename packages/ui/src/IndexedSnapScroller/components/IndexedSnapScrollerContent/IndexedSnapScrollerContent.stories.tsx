import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndexedSnapScrollerContent } from './IndexedSnapScrollerContent';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof IndexedSnapScrollerContent> = {
  title: 'Utils/IndexedSnapScroller/IndexedSnapScrollerContent',
  component: IndexedSnapScrollerContent,
  args: {},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 120,
      border: '1px solid var(--color-blue-accent-700)',
      background: 'var(--color-blue-accent-50)',
      boxSizing: 'border-box',
      borderRadius: 12,
      fontSize: 24,
      color: 'var(--color-blue-accent-700)',
      fontFamily: 'var(--default-font-family)',
    },
    children: 'Hello!'
  },
};