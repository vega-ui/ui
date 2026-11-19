# Toolbar Patterns

## Formatting Toolbar Of An Editor

When to use:

- A text editor, a comment box or a notes field offers formatting that applies to the current text: style, alignment, lists, a highlight.

Composition notes:

- Use a `ToggleGroup` with `multiple` for marks that combine, like bold and italic, and a `ToggleGroup` for an exclusive choice, like the alignment. Their items join the toolbar by themselves.
- Wrap a single `Toggle`, a plain `Button` with `square` and the `MenuTrigger` of a "More" menu in `ToolbarItem` with `asChild`.
- Split the groups with a vertical `Separator`, and give every icon-only item an `aria-label`.
- Use `size='xs'` or `size='sm'` for every item, the same in the whole toolbar.

Trade-offs:

- One Tab stop keeps the page fast to tab through, but the user must know the arrow keys; a screen reader announces the toolbar and its orientation, which tells them.

<!-- example: toolbar/text-editor.tsx -->
```tsx
import { useState, type CSSProperties } from 'react';
import {
  Icon,
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuItemIndicator,
  MenuTrigger,
  Separator,
  Text,
  ToggleGroup,
  ToggleGroupToggle,
  Toolbar,
  ToolbarItem,
} from '@vega-ui/react';
import {
  BoldIcon,
  CheckIcon,
  EllipsisIcon,
  ItalicIcon,
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignStartIcon,
  UnderlineIcon,
} from '@vega-ui/icons';

type Alignment = 'start' | 'center' | 'end';

export default function TextEditor() {
  const [marks, setMarks] = useState<string[]>(['bold']);
  const [alignment, setAlignment] = useState<Alignment>('start');
  const [struckThrough, setStruckThrough] = useState(false);

  const clearFormatting = () => {
    setMarks([]);
    setAlignment('start');
    setStruckThrough(false);
  };

  const decorations: string[] = [];
  if (marks.includes('underline')) decorations.push('underline');
  if (struckThrough) decorations.push('line-through');

  const preview: CSSProperties = {
    margin: 0,
    padding: 'var(--spacing-8)',
    textAlign: alignment,
    fontWeight: marks.includes('bold') ? 700 : 400,
    fontStyle: marks.includes('italic') ? 'italic' : 'normal',
    textDecoration: decorations.length === 0 ? 'none' : decorations.join(' '),
    overflowWrap: 'anywhere',
  };

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 480,
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <Toolbar aria-label='Formatting' style={{ padding: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
        <ToggleGroup aria-label='Text style' size='xs' multiple value={marks} onChangeValue={setMarks}>
          <ToggleGroupToggle value='bold' square aria-label='Bold'><Icon><BoldIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='italic' square aria-label='Italic'><Icon><ItalicIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='underline' square aria-label='Underline'><Icon><UnderlineIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Separator orientation='vertical' />
        <ToggleGroup aria-label='Alignment' size='xs' value={alignment} onChangeValue={(value) => setAlignment(value as Alignment)}>
          <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Menu placement='bottom-end' size='sm'>
          <ToolbarItem asChild>
            <MenuTrigger asChild>
              <Button square size='xs' variant='secondary' appearance='transparent' aria-label='More formatting' style={{ marginInlineStart: 'auto' }}>
                <Icon><EllipsisIcon /></Icon>
              </Button>
            </MenuTrigger>
          </ToolbarItem>
          <MenuContent>
            <MenuCheckboxItem checked={struckThrough} onChangeChecked={setStruckThrough}>
              <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
              Strikethrough
            </MenuCheckboxItem>
            <Separator />
            <MenuItem onClick={clearFormatting}>Clear formatting</MenuItem>
          </MenuContent>
        </Menu>
      </Toolbar>
      <Text asChild size={3}>
        <p style={preview}>Ship the toolbar first, then write its docs and examples.</p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Tool Palette Beside A Canvas

When to use:

- A drawing, design or map view offers a set of tools, one active at a time, next to the area they act on.

Composition notes:

- Set `orientation="vertical"` and put the tools in a `ToggleGroup` with `flexDirection: 'column'`, so the pressed tool is announced as checked.
- Put actions that run, like zoom, after a horizontal `Separator`, as `Button` items with `square`.
- Keep the active tool in the parent and show it near the canvas.

Trade-offs:

- A vertical palette keeps the canvas wide, but its arrow keys are Up and Down: a `MenuTrigger` in it takes those keys to open its menu, so keep menus out of a vertical toolbar or at its end.

<!-- example: toolbar/vertical-tools.tsx -->
```tsx
import { useState } from 'react';
import { Button, Icon, Separator, Text, ToggleGroup, ToggleGroupToggle, Toolbar, ToolbarItem } from '@vega-ui/react';
import { EraserIcon, HandIcon, MousePointer2Icon, PencilIcon, ZoomInIcon, ZoomOutIcon } from '@vega-ui/icons';

const tools = [
  { value: 'select', label: 'Select', icon: <MousePointer2Icon /> },
  { value: 'hand', label: 'Hand', icon: <HandIcon /> },
  { value: 'pencil', label: 'Pencil', icon: <PencilIcon /> },
  { value: 'eraser', label: 'Eraser', icon: <EraserIcon /> },
];

export default function VerticalTools() {
  const [tool, setTool] = useState('pencil');
  const [zoom, setZoom] = useState(100);
  const toolLabel = tools.find((item) => item.value === tool)?.label ?? '';

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 480 }}>
      <Toolbar
        aria-label='Drawing tools'
        orientation='vertical'
        style={{
          padding: 'var(--spacing-3)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
          background: 'var(--surface-primary)',
        }}
      >
        <ToggleGroup aria-label='Tool' size='sm' value={tool} onChangeValue={setTool} style={{ flexDirection: 'column' }}>
          {tools.map((item) => (
            <ToggleGroupToggle key={item.value} value={item.value} square aria-label={item.label}><Icon>{item.icon}</Icon></ToggleGroupToggle>
          ))}
        </ToggleGroup>
        <Separator orientation='horizontal' />
        <ToolbarItem asChild>
          <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Zoom in' onClick={() => setZoom(Math.min(zoom + 25, 200))}>
            <Icon><ZoomInIcon /></Icon>
          </Button>
        </ToolbarItem>
        <ToolbarItem asChild>
          <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Zoom out' onClick={() => setZoom(Math.max(zoom - 25, 50))}>
            <Icon><ZoomOutIcon /></Icon>
          </Button>
        </ToolbarItem>
      </Toolbar>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          flex: 1,
          minWidth: 0,
          borderRadius: 'var(--radius-5)',
          border: '1px dashed var(--separator-opaque)',
          backgroundImage: 'radial-gradient(var(--separator-opaque) 1px, transparent 1px)',
          backgroundSize: 'var(--spacing-10) var(--spacing-10)',
        }}
      >
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {toolLabel} · {zoom}%
        </Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Toolbar Above A List

When to use:

- A list or a table has view, sort and search controls that change how its items are shown.

Composition notes:

- Put the view choice in a `ToggleGroup`, the sort in a `Menu` with a `MenuRadioGroup`, and the search field last, with `ToolbarItem` right around the `TextFieldInput`.
- Let the field grow with `flex: 1` on the `TextField`, and give the list below a status line with the number of results.

Trade-offs:

- The field keeps the arrow keys for its caret, so it must be the last item; a toolbar with several fields is better split into a toolbar and a form.

<!-- example: toolbar/file-browser.tsx -->
```tsx
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
```
<!-- /example -->
