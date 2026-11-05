import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';
import { TooltipArrow, TooltipContent, TooltipTrigger } from './components';
import { Button } from '../Button';
import { Text } from '../Text';

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  subcomponents: {
    TooltipTrigger,
    TooltipContent,
    TooltipArrow,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1763&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
  args: {
    delayOpen: 500,
    delayClose: 0,
    children: [
      <TooltipTrigger key='trigger' asChild>
        <Button variant='secondary'>Save draft</Button>
      </TooltipTrigger>,
      <TooltipContent key='content'>
        <TooltipArrow />
        <Text size={2}>Drafts are saved automatically every minute</Text>
      </TooltipContent>,
    ],
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
