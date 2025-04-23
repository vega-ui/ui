import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from './Popover.tsx';
import { Button } from '../Button';
import { Text } from '../Text';
import { PopoverContent, PopoverTrigger } from './components';

const meta = {
  title: 'UI-Core/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text size={3}>Привет! Я - Popover</Text>
          <Button onClick={(e) => console.log(e)} variant='secondary' appearance='transparent'>Кнопка</Button>
        </PopoverContent>
      </>
    )
  },
};