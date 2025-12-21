import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dialog } from './Dialog.tsx';
import { Button } from '../Button';
import { Text } from '../Text';
import { DialogHeader, DialogTrigger, DialogContent } from './components';

const meta = {
  title: 'Overlay/Dialog/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1644&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <Text size={3}>Привет! Я - Dialog</Text>
          <Button variant='secondary' appearance='transparent'>Согласен</Button>
        </DialogContent>
      </>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader title='Hello' />
          <Text size={3}>Привет! Я - Dialog</Text>
          <Button variant='secondary' appearance='transparent'>Согласен</Button>
        </DialogContent>
      </>
    ),
  },
};

export const Fluid: Story = {
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <Button>Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <Text size={3}>Привет! Я - Dialog</Text>
          <Button variant='secondary' appearance='transparent'>Согласен</Button>
        </DialogContent>
      </>
    ),
  },
};