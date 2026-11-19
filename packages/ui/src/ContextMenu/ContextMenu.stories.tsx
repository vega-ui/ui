import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '../Separator';
import { CheckIcon, ChevronRightIcon } from '@vega-ui/icons';
import { Icon } from '../Icon';
import { MenuCheckboxItem, MenuContent, MenuGroup, MenuItem, MenuItemIndicator, MenuSubmenu, MenuSubmenuTrigger } from '../Menu';
import { ContextMenu } from './ContextMenu';
import { ContextMenuTrigger } from './components';

const meta = {
  title: 'Overlay/ContextMenu',
  component: ContextMenu,
  subcomponents: {
    ContextMenuTrigger,
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
  },
  args: {
    children: [
      <ContextMenuTrigger
        key='trigger'
        style={{ display: 'grid', placeItems: 'center', width: 320, height: 200, borderRadius: 16, border: '1px dashed var(--border-color)', color: 'var(--text-color)' }}
      >
        Right click or long press here
      </ContextMenuTrigger>,
      <MenuContent key='content' aria-label='Actions'>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem disabled>Paste</MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>Share<Icon size='xs' style={{ marginInlineStart: 'auto' }}><ChevronRightIcon /></Icon></MenuSubmenuTrigger>
          <MenuContent>
            <MenuItem>Copy link</MenuItem>
            <MenuItem>Email</MenuItem>
          </MenuContent>
        </MenuSubmenu>
        <Separator />
        <MenuGroup aria-label='View'>
          <MenuCheckboxItem defaultChecked><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Show ruler</MenuCheckboxItem>
          <MenuCheckboxItem><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Show grid</MenuCheckboxItem>
        </MenuGroup>
      </MenuContent>,
    ],
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
