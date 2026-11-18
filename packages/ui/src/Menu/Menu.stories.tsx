import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Separator } from '../Separator';
import { Menu } from './Menu';
import { MenuCheckboxItem, MenuContent, MenuGroup, MenuItem, MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuTrigger } from './components';

const meta = {
  title: 'Overlay/Menu',
  component: Menu,
  subcomponents: {
    MenuTrigger,
    MenuContent,
    MenuItem,
    MenuCheckboxItem,
    MenuRadioGroup,
    MenuRadioItem,
    MenuGroup,
    MenuItemIndicator,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'right-start', 'left-start'],
    },
  },
  args: {
    children: [
      <MenuTrigger key='trigger' asChild><Button appearance='ghost' variant='secondary'>Edit</Button></MenuTrigger>,
      <MenuContent key='content'>
        <MenuItem>Undo</MenuItem>
        <MenuItem disabled>Redo</MenuItem>
        <Separator />
        <MenuGroup aria-label='View'>
          <MenuCheckboxItem defaultChecked><MenuItemIndicator />Ruler</MenuCheckboxItem>
          <MenuCheckboxItem><MenuItemIndicator />Grid</MenuCheckboxItem>
        </MenuGroup>
        <Separator />
        <MenuRadioGroup aria-label='Zoom' defaultValue='fit'>
          <MenuRadioItem value='fit'><MenuItemIndicator />Fit to window</MenuRadioItem>
          <MenuRadioItem value='100'><MenuItemIndicator />Actual size</MenuRadioItem>
          <MenuRadioItem value='200' disabled><MenuItemIndicator />200%</MenuRadioItem>
        </MenuRadioGroup>
        <Separator />
        <MenuItem asChild><a href='#help'>Help</a></MenuItem>
      </MenuContent>,
    ],
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
