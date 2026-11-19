import { useState, type ReactNode } from 'react';
import {
  Icon,
  Button,
  Menu,
  MenuContent,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  Separator,
  Text,
  TextField,
  TextFieldInput,
  ToggleGroup,
  ToggleGroupToggle,
  Toolbar,
  ToolbarItem,
} from '@vega-ui/react';
import {
  ArrowDownWideNarrowIcon,
  CheckIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  ImageIcon,
  LayoutGridIcon,
  LayoutListIcon,
  PresentationIcon,
  SearchIcon,
} from '@vega-ui/icons';

interface FileEntry {
  name: string
  edited: string
  order: number
  icon: ReactNode
}

const files: FileEntry[] = [
  { name: 'Q3 report.pdf', edited: 'Today', order: 4, icon: <FileTextIcon /> },
  { name: 'Budget 2027.xlsx', edited: 'Yesterday', order: 3, icon: <FileSpreadsheetIcon /> },
  { name: 'Kickoff deck.key', edited: '12 Nov', order: 2, icon: <PresentationIcon /> },
  { name: 'Team photo.jpg', edited: '3 Nov', order: 1, icon: <ImageIcon /> },
];

export default function FileBrowser() {
  const [view, setView] = useState('list');
  const [sort, setSort] = useState('edited');
  const [query, setQuery] = useState('');

  const shown = files
    .filter((file) => file.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((first, second) => (sort === 'name' ? first.name.localeCompare(second.name) : second.order - first.order));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 480 }}>
      <Toolbar aria-label='Files'>
        <ToggleGroup aria-label='View' size='sm' value={view} onChangeValue={setView}>
          <ToggleGroupToggle value='list' square aria-label='List'><Icon><LayoutListIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='grid' square aria-label='Grid'><Icon><LayoutGridIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Menu placement='bottom-start' size='sm'>
          <ToolbarItem asChild>
            <MenuTrigger asChild>
              <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Sort'>
                <Icon><ArrowDownWideNarrowIcon /></Icon>
              </Button>
            </MenuTrigger>
          </ToolbarItem>
          <MenuContent>
            <MenuRadioGroup aria-label='Sort by' value={sort} onChangeValue={setSort}>
              <MenuRadioItem value='edited'><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Last edited</MenuRadioItem>
              <MenuRadioItem value='name'><MenuItemIndicator><CheckIcon /></MenuItemIndicator>Name</MenuRadioItem>
            </MenuRadioGroup>
          </MenuContent>
        </Menu>
        <Separator orientation='vertical' />
        <TextField size='sm' style={{ flex: 1, minWidth: 0 }}>
          <Icon size='sm' aria-hidden style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-5)', color: 'var(--label-secondary)' }}>
            <SearchIcon />
          </Icon>
          <ToolbarItem asChild>
            <TextFieldInput
              type='search'
              aria-label='Search files'
              placeholder='Search files'
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
            />
          </ToolbarItem>
        </TextField>
      </Toolbar>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(96px, 1fr))' : '1fr',
          gap: 'var(--spacing-2)',
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        {shown.map((file) => (
          <li
            key={file.name}
            style={{
              display: 'flex',
              flexDirection: view === 'grid' ? 'column' : 'row',
              alignItems: 'center',
              gap: view === 'grid' ? 'var(--spacing-3)' : 'var(--spacing-6)',
              padding: view === 'grid' ? 'var(--spacing-8) var(--spacing-4)' : 'var(--spacing-4) var(--spacing-6)',
              borderRadius: 'var(--radius-4)',
              background: 'var(--fills-quaternary)',
              textAlign: view === 'grid' ? 'center' : 'start',
            }}
          >
            <Icon size={view === 'grid' ? 'lg' : 'sm'} style={{ flexShrink: 0, color: 'var(--label-secondary)' }}>{file.icon}</Icon>
            <Text size={2} style={{ flex: view === 'grid' ? undefined : 1, minWidth: 0, overflowWrap: 'anywhere' }}>{file.name}</Text>
            {view === 'list' && <Text size={2} style={{ flexShrink: 0, color: 'var(--label-secondary)' }}>{file.edited}</Text>}
          </li>
        ))}
      </ul>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {shown.length === 0 ? 'No files match your search' : `${shown.length} of ${files.length} files`}
      </Text>
    </div>
  );
}
