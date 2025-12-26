import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './Select.tsx';
import {
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectPortal,
  SelectValue,
} from './components';
import { Button } from '../Button';
import { Text } from '../Text';
import { Card } from '../Card';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { ChevronDown, X, Globe, Star, Check } from '@vega-ui/icons';
import { ChangeEvent, KeyboardEvent, FC, PropsWithChildren, useMemo, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseButton,
  DialogContent,
  DialogHeader,
  DialogPortal, DialogTitle,
  DialogTrigger
} from '../Dialog';
import { TextField, TextFieldInput } from '../TextField';

const meta = {
  title: 'Form/Selectors/Select/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2262&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['field', 'inline'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: [
      <SelectHiddenSelect key={0} />,
      <SelectCombobox key={1}>
        <SelectValue placeholder='Select an option' />
        <SelectIcon />
      </SelectCombobox>,
      <SelectPortal key={2}>
        <SelectListbox>
          <SelectOption value='alpha'>Alpha</SelectOption>
          <SelectOption value='beta'>Beta</SelectOption>
          <SelectOption value='gamma'>Gamma</SelectOption>
        </SelectListbox>
      </SelectPortal>,
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'grid', gap: 14, minWidth: 520 }}>{children}</div>
);

const Row: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
    {children}
  </div>
);

const Hint = ({ children }: { children: string }) => (
  <Text asChild size={2} style={{ opacity: 0.7, maxWidth: 520 }}>
    <p>{children}</p>
  </Text>
);

export const MinimalPlaceholder: Story = {
  name: 'Minimal: placeholder + default icon',
  args: {
    defaultValue: '',
    children: (
      <>
        <SelectHiddenSelect />
        <SelectCombobox>
          <SelectValue placeholder='Choose a city' />
          <SelectIcon />
        </SelectCombobox>
        <SelectPortal>
          <SelectListbox>
            <SelectOption value='moscow'>Moscow</SelectOption>
            <SelectOption value='saint-petersburg'>Saint Petersburg</SelectOption>
            <SelectOption value='novosibirsk'>Novosibirsk</SelectOption>
          </SelectListbox>
        </SelectPortal>
      </>
    ),
  },
};

export const CustomIcon: Story = {
  name: 'Custom icon',
  args: {
    defaultValue: 'saint-petersburg',
    children: (
      <>
        <SelectHiddenSelect />
        <SelectCombobox>
          <SelectValue placeholder='Choose a city' />
          <SelectIcon>
            <Globe />
          </SelectIcon>
        </SelectCombobox>
        <SelectPortal>
          <SelectListbox>
            <SelectOption value='moscow'>Moscow</SelectOption>
            <SelectOption value='saint-petersburg'>Saint Petersburg</SelectOption>
            <SelectOption value='novosibirsk'>Novosibirsk</SelectOption>
          </SelectListbox>
        </SelectPortal>
      </>
    ),
  },
};

export const WithRichOptions: Story = {
  name: 'Rich content options (icon + text)',
  args: {
    defaultValue: 'pro',
    children: (
      <>
        <SelectHiddenSelect />
        <SelectCombobox>
          <SelectValue style={{ gap: 12 }} placeholder='Select a plan' />
          <SelectIcon />
        </SelectCombobox>
        <SelectPortal>
          <SelectListbox>
            <SelectOption style={{ gap: 12 }} value='basic'>
              <Icon size='sm'><Star /></Icon>
              <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Text size={2} style={{ fontWeight: 600, lineHeight: '14px' }}>Basic</Text>
                <Text size={1} style={{ opacity: 0.7 }}>For simple use cases</Text>
              </div>
            </SelectOption>
            
            <SelectOption style={{ gap: 12 }} value='pro'>
              <Icon size='sm'><Check /></Icon>
              <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Text size={2} style={{ fontWeight: 600, lineHeight: '14px' }}>Pro</Text>
                <Text size={1} style={{ opacity: 0.7 }}>Most common choice</Text>
              </div>
            </SelectOption>
            
            <SelectOption style={{ gap: 12 }} value='enterprise'>
              <Icon size='sm'><Globe /></Icon>
              <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Text size={2} style={{ fontWeight: 600, lineHeight: '14px' }}>Enterprise</Text>
                <Text size={1} style={{ opacity: 0.7 }}>Disabled example</Text>
              </div>
            </SelectOption>
          </SelectListbox>
        </SelectPortal>
      </>
    ),
  },
};

export const InlineVariant: Story = {
  name: 'Inline variant (in a sentence)',
  args: {
    variant: 'inline',
    defaultValue: 'weekly',
    children: (
      <>
        <SelectHiddenSelect />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Text size={3} style={{ opacity: 0.85 }}>
            Notify me
          </Text>
          
          <SelectCombobox>
            <SelectValue placeholder='frequency' />
            <SelectIcon>
              <ChevronDown />
            </SelectIcon>
          </SelectCombobox>
          
          <Text size={3} style={{ opacity: 0.85 }}>
            about updates.
          </Text>
        </div>
        
        <SelectPortal>
          <SelectListbox>
            <SelectOption value='daily'>Daily</SelectOption>
            <SelectOption value='weekly'>Weekly</SelectOption>
            <SelectOption value='monthly'>Monthly</SelectOption>
          </SelectListbox>
        </SelectPortal>
      </>
    ),
  },
};

export const ControlledOpen: Story = {
  name: 'Controlled open state (external toggle)',
  render: (props) => {
    const [open, setOpen] = useState(false);
    
    return (
      <Stack>
        <Row>
          <Text size={3} style={{ fontWeight: 600 }}>
            Controlled dropdown
          </Text>
          <Button size='sm' variant='secondary' onClick={() => setOpen((v) => !v)}>
            {open ? 'Close' : 'Open'}
          </Button>
        </Row>
        
        <Select {...props} open={open} onOpenChange={setOpen} defaultValue='beta'>
          <SelectHiddenSelect />
          <SelectCombobox>
            <SelectValue placeholder='Pick an option' />
            <SelectIcon />
          </SelectCombobox>
          
          <SelectPortal>
            <SelectListbox>
              <SelectOption value='alpha'>Alpha</SelectOption>
              <SelectOption value='beta'>Beta</SelectOption>
              <SelectOption value='gamma'>Gamma</SelectOption>
            </SelectListbox>
          </SelectPortal>
        </Select>
      </Stack>
    );
  },
};

export const ControlledValueWithClear: Story = {
  name: 'Controlled value + clear action',
  render: (props) => {
    const options = useMemo(
      () => [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
      [],
    );
    
    const [value, setValue] = useState<string | number | undefined>('medium');
    
    return (
      <Stack>
        <Card>
          <Row>
            <Text size={3} style={{ fontWeight: 600 }}>
              Priority
            </Text>
            
            <IconButton
              size='sm'
              variant='secondary'
              appearance='ghost'
              aria-label='clear selection'
              disabled={value === undefined}
              onClick={() => setValue(undefined)}
            >
              <Icon>
                <X />
              </Icon>
            </IconButton>
          </Row>
          
          <Text size={2} style={{ opacity: 0.7, marginTop: 6 }}>
            Current value: <strong>{value ?? '—'}</strong>
          </Text>
        </Card>
        
        <Select {...props} value={value} onSelectValue={setValue}>
          <SelectHiddenSelect />
          <SelectCombobox>
            <SelectValue placeholder='Select priority' />
            <SelectIcon />
          </SelectCombobox>
          
          <SelectPortal>
            <SelectListbox>
              {options.map((o) => (
                <SelectOption key={o.value} value={o.value}>
                  {o.label}
                </SelectOption>
              ))}
            </SelectListbox>
          </SelectPortal>
        </Select>
        
        <Hint>
          Controlled value is useful when you need: reset/clear, sync with URL/query params, submit logic, or validation.
        </Hint>
      </Stack>
    );
  },
};

export const DisabledAndReadOnlyStates: Story = {
  name: 'Disabled and read-only states',
  render: (props) => {
    return (
      <Stack>
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <Text size={2} style={{ opacity: 0.7 }}>
              Disabled
            </Text>
            <Select {...props} disabled defaultValue='alpha'>
              <SelectHiddenSelect />
              <SelectCombobox>
                <SelectValue placeholder='Select' />
                <SelectIcon />
              </SelectCombobox>
              <SelectPortal>
                <SelectListbox>
                  <SelectOption value='alpha'>Alpha</SelectOption>
                  <SelectOption value='beta'>Beta</SelectOption>
                  <SelectOption value='gamma'>Gamma</SelectOption>
                </SelectListbox>
              </SelectPortal>
            </Select>
          </div>
          
          <div style={{ display: 'grid', gap: 6 }}>
            <Text size={2} style={{ opacity: 0.7 }}>
              Read-only
            </Text>
            <Select {...props} readOnly defaultValue='beta'>
              <SelectHiddenSelect />
              <SelectCombobox>
                <SelectValue placeholder='Select' />
                <SelectIcon />
              </SelectCombobox>
              <SelectPortal>
                <SelectListbox>
                  <SelectOption value='alpha'>Alpha</SelectOption>
                  <SelectOption value='beta'>Beta</SelectOption>
                  <SelectOption value='gamma'>Gamma</SelectOption>
                </SelectListbox>
              </SelectPortal>
            </Select>
          </div>
        </div>
      </Stack>
    );
  },
};

export const LongListScroll: Story = {
  name: 'Long list (scroll / navigation)',
  args: {
    defaultValue: 'item-12',
    children: (
      <>
        <SelectHiddenSelect />
        <SelectCombobox>
          <SelectValue placeholder='Select an item' />
          <SelectIcon />
        </SelectCombobox>
        
        <SelectPortal>
          <SelectListbox style={{ maxHeight: 280, overflow: 'auto' }}>
            {Array.from({ length: 40 }).map((_, i) => {
              const value = `item-${i + 1}`;
              return (
                <SelectOption key={value} value={value}>
                  Item #{i + 1}
                </SelectOption>
              );
            })}
          </SelectListbox>
        </SelectPortal>
      </>
    ),
  },
};

export const NestedDialogFlow: Story = {
  name: 'Complex: Select inside a dialog + nested dialog',
  render: (props) => {
    const [selected, setSelected] = useState<string | number | undefined>();
    
    return (
      <Stack>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open flow</Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configure option</DialogTitle>
                  <DialogCloseButton />
                </DialogHeader>
                
                <Text size={2} style={{ opacity: 0.7, marginTop: 6 }}>
                  Select remains fully composable and can be embedded into complex layouts.
                </Text>
                
                <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
                  <Select {...props} value={selected} onSelectValue={setSelected}>
                    <SelectHiddenSelect />
                    <SelectCombobox>
                      <SelectValue placeholder='Select a template' />
                      <SelectIcon />
                    </SelectCombobox>
                    
                    <SelectPortal>
                      <SelectListbox>
                        <SelectOption value='template-a'>Template A</SelectOption>
                        <SelectOption value='template-b'>Template B</SelectOption>
                        <SelectOption value='template-c'>Template C</SelectOption>
                      </SelectListbox>
                    </SelectPortal>
                  </Select>
                  
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Button fullWidth disabled={!selected}>
                      Continue
                    </Button>
                  </div>
                  
                  <Hint>
                    This story is useful to verify focus restoration, layering/portal root behavior, and keyboard navigation
                    when the Select is used inside overlays.
                  </Hint>
                </div>
              </DialogContent>
            </DialogBackdrop>
          </DialogPortal>
        </Dialog>
      </Stack>
    );
  },
};

export const WithFilterSearch: Story = {
  args: {
    typeMatchEnabled: false
  },
  render(props) {
    const [selected, setSelected] = useState<string | number | undefined>('')
    const [search, setSearch] = useState('')
    
    const options = Array.from({ length: 40 }, (_, i) => ({
      value: `item-${i + 1}`,
      label: `Item ${i + 1}`
    }))
    
    const filtered = useMemo(() => options.filter(v => v.label.includes(search)), [options, search])
    
    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value)
    }
    
    const onOpenChange = (open: boolean) => {
      if (!open) setSearch('')
    }
    
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation()
    }
    
    return (
      <Select {...props} onOpenChange={onOpenChange} onSelectValue={setSelected} value={selected}>
        <SelectHiddenSelect />
        <SelectCombobox>
          <SelectValue placeholder='Select an item'>
            {options.find(v => v.value === selected)?.label}
          </SelectValue>
          <SelectIcon />
        </SelectCombobox>
        
        <SelectPortal>
          <SelectListbox style={{ maxHeight: 280, overflow: 'auto' }}>
            <TextField>
              <TextFieldInput onKeyDown={onKeyDown} placeholder='Search' onChange={onSearch} value={search} />
            </TextField>
            {filtered.map(({ label, value }) => (
              <SelectOption key={value} value={value}>
                {label}
              </SelectOption>
            ))}
          </SelectListbox>
        </SelectPortal>
      </Select>
    )
  }
};
