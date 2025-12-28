import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Dialog, DialogBackdrop, DialogContent, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from '../Dialog';
import { TextField, TextFieldInput } from '../TextField';
import { TooltipArrow, TooltipContent, TooltipTrigger } from './components';
import { HeartIcon, InfoIcon } from '@vega-ui/icons';
import { Icon } from '../Icon';
import { Text } from '../Text';

const meta = {
  title: 'Overlay/Tooltip/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1763&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <Button>Tooltip!</Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <Text size={2}>Hello! I'm a tooltip</Text>
        </TooltipContent>
      </>
    )
  },
};

export const WithIconButton: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <IconButton><Icon><HeartIcon /></Icon></IconButton>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <Text size={2}>Support</Text>
        </TooltipContent>
      </>
    )
  },
};

export const InsideModal: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <IconButton><Icon><InfoIcon /></Icon></IconButton>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <Text size={2}>Info</Text>
        </TooltipContent>
      </>
    )
  },
  render(props) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogBackdrop>
            <DialogContent>
              <DialogHeader style={{ marginBottom: 12 }}>
                <DialogTitle>Form</DialogTitle>
              </DialogHeader>
              <TextField>
                <TextFieldInput />
                <Tooltip {...props}>
                  <TooltipTrigger asChild>
                    <IconButton appearance='transparent'><Icon><InfoIcon /></Icon></IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipArrow />
                    <Text size={2}>Info</Text>
                  </TooltipContent>
                </Tooltip>
              </TextField>
            </DialogContent>
          </DialogBackdrop>
        </DialogPortal>
      </Dialog>
    )
  }
};