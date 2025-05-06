import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from './Popover.tsx';
import { Button } from '../Button';
import { Text } from '../Text';
import { PopoverContent, PopoverTrigger } from './components';

const meta = {
  title: 'UI-Core/Popover/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-1686&t=2RYEGgF9z3n5SpP5-4',
    },
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