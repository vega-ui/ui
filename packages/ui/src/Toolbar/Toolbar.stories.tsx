import type { Meta, StoryObj } from '@storybook/react-vite';

import { EllipsisIcon, ImageIcon, LinkIcon, Redo2Icon, Undo2Icon } from '@vega-ui/icons';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../Menu';
import { Separator } from '../Separator';
import { Toolbar } from './Toolbar';
import { ToolbarItem } from './components';

const meta = {
  title: 'Actions/Toolbar',
  component: Toolbar,
  subcomponents: {
    ToolbarItem,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    'aria-label': 'Editing',
    children: [
      <ToolbarItem key='undo' asChild>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Undo'><Icon><Undo2Icon /></Icon></Button>
      </ToolbarItem>,
      <ToolbarItem key='redo' asChild disabled>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Redo'><Icon><Redo2Icon /></Icon></Button>
      </ToolbarItem>,
      <Separator key='separator' orientation='vertical' />,
      <ToolbarItem key='link' asChild>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Insert link'><Icon><LinkIcon /></Icon></Button>
      </ToolbarItem>,
      <ToolbarItem key='image' asChild>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Insert image'><Icon><ImageIcon /></Icon></Button>
      </ToolbarItem>,
      <Menu key='more' placement='bottom-end' size='sm'>
        <ToolbarItem asChild>
          <MenuTrigger asChild>
            <Button square size='sm' variant='secondary' appearance='transparent' aria-label='More'><Icon><EllipsisIcon /></Icon></Button>
          </MenuTrigger>
        </ToolbarItem>
        <MenuContent>
          <MenuItem>Insert table</MenuItem>
          <MenuItem>Insert divider</MenuItem>
        </MenuContent>
      </Menu>,
    ],
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = {
  render: () => (
    <Toolbar aria-label='Editing' orientation='vertical'>
      <ToolbarItem asChild>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Undo'><Icon><Undo2Icon /></Icon></Button>
      </ToolbarItem>
      <ToolbarItem asChild disabled>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Redo'><Icon><Redo2Icon /></Icon></Button>
      </ToolbarItem>
      <Separator orientation='horizontal' />
      <ToolbarItem asChild>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Insert link'><Icon><LinkIcon /></Icon></Button>
      </ToolbarItem>
    </Toolbar>
  ),
};
