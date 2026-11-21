'use client';

import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertContent,
  AlertIcon,
  Avatar,
  AvatarFallback,
  AvatarStack,
  AvatarStackItem,
  Badge,
  Button,
  ButtonBase,
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  CalendarYearsGrid,
  Card,
  Checkbox,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  CheckboxInput,
  Code,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  ContextMenu,
  ContextMenuTrigger,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTrigger,
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Fieldset,
  FieldsetLegend,
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  Heading,
  HelperText,
  Icon,
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Label,
  Link,
  Listbox,
  ListboxOption,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Meter,
  MeterStack,
  MeterStackSegment,
  MeterTrack,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Option,
  PageControl,
  PageControlItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
  PhoneField,
  PhoneFieldInput,
  PinField,
  PinFieldInput,
  PinFieldSlot,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressTrack,
  Radio,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  SnapScroller,
  SnapScrollerContent,
  Spinner,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
  TimeField,
  TimeFieldInput,
  Toast,
  ToastClose,
  ToastRegion,
  Toggle,
  ToggleGroup,
  ToggleGroupToggle,
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  createToastQueue,
  useIndexedSnapScrollerContext,
  useToastContext,
  VisuallyHidden,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import {
  Bell,
  BoldIcon,
  CalendarIcon,
  Check,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  EyeIcon,
  EyeOffIcon,
  Heart,
  ItalicIcon,
  MicOffIcon,
  MinusIcon,
  PlusIcon,
  Search,
  Star,
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignStartIcon,
  UnderlineIcon,
  XIcon,
} from '@vega-ui/icons';
import styles from './ComponentPreviews.module.css';

export interface Preview {
  node: ReactNode
}

const MONTHS = ['November 2026', 'December 2026', 'January 2027'];

const CLOSE_STYLE = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;

const STORAGE = [
  { label: 'Photos', value: 24, color: 'var(--color-blue-500)' },
  { label: 'Apps', value: 14, color: 'var(--color-purple-500)' },
  { label: 'System', value: 8, color: 'var(--color-gray-500)' },
];

const IndexedSlide = () => {
  const { index } = useIndexedSnapScrollerContext();

  return <IndexedSnapScrollerContent className={styles.slide}>{MONTHS[index] ?? `Month ${index + 1}`}</IndexedSnapScrollerContent>;
};

const PREVIEW_TOASTS = createToastQueue<string>();

const PreviewToast = () => {
  const { content } = useToastContext<string>();

  return (
    <Toast className={styles.row}>
      <Text size={2} fontWeight={500} style={{ flex: 1, paddingBlock: 'var(--spacing-2)' }}>{content}</Text>
      <ToastClose asChild><Button size='xs' variant='primary' appearance='ghost'>Undo</Button></ToastClose>
      <ToastClose asChild>
        <Button square size='xs' aria-label='Dismiss' variant='secondary' appearance='ghost' style={CLOSE_STYLE}>
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
};

const CITIES = ['Amsterdam', 'Athens', 'Berlin', 'Lisbon', 'Madrid', 'Prague', 'Vienna'];

const ComboboxPreview = () => {
  const id = useId();
  const [query, setQuery] = useState('');
  const matches = CITIES.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className={styles.field}>
      <Label htmlFor={id}>City</Label>
      <Combobox>
        <TextField>
          <ComboboxInput id={id} placeholder='Start typing a city' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger square aria-label='Show cities'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Cities'>
          {matches.map((city) => <ListboxOption key={city} value={city}>{city}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
};

export const PREVIEWS: Record<string, Preview> = {
  accordion: {
    node: (
      <Accordion defaultOpened={['shipping']} className={styles.wide}>
        <AccordionItem value='shipping'>
          <AccordionHeader as='h2'>
            <AccordionTrigger>
              Shipping
              <AccordionIcon><ChevronDownIcon /></AccordionIcon>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent><Text size={2} className={styles.secondary}>Orders ship in 2–5 business days.</Text></AccordionContent>
          <Separator />
        </AccordionItem>
        <AccordionItem value='returns'>
          <AccordionHeader as='h2'>
            <AccordionTrigger>
              Returns
              <AccordionIcon><ChevronDownIcon /></AccordionIcon>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent><Text size={2} className={styles.secondary}>Free returns within 30 days.</Text></AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  button: {
    node: (
      <div className={styles.row}>
        <Button variant='secondary' appearance='ghost'>Cancel</Button>
        <Button>Save</Button>
      </div>
    ),
  },
  'button-base': { node: <ButtonBase type='button' variant='secondary' appearance='ghost' className={styles.base}>Reset filters</ButtonBase> },
  collapsible: {
    node: (
      <div className={styles.stack}>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost' className={styles.start}>Billing details</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Text size={2} className={styles.secondary}>VAT ID, invoice email and legal address.</Text>
          </CollapsibleContent>
        </Collapsible>
      </div>
    ),
  },
  checkbox: {
    node: (
      <div className={styles.list}>
        <Checkbox>
          <CheckboxInput defaultChecked />
          <CheckboxIndicator>
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
          </CheckboxIndicator>
          <Text size={3}>Product updates</Text>
        </Checkbox>
        <Checkbox>
          <CheckboxInput />
          <CheckboxIndicator>
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
          </CheckboxIndicator>
          <Text size={3}>Weekly digest</Text>
        </Checkbox>
      </div>
    ),
  },
  'checkbox-card': {
    node: (
      <CheckboxCard className={styles.wide}>
        <CheckboxCardContent>
          <CheckboxCardTitle as='h2'>Daily backups</CheckboxCardTitle>
          <CheckboxCardDescription>Snapshots are kept for 30 days.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='preview-backups' defaultChecked />
          <CheckboxIndicator>
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    ),
  },
  'date-field': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-due-date'>Due date</Label>
        <DateField format='dd.MM.yyyy' separator='.' defaultValue='2026-11-03'>
          <DateFieldInput id='preview-due-date' placeholder='dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose due date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
                  <CalendarHeading>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarHeading>
                  <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
                    <CalendarWeekdays>
                      <CalendarWeekday />
                    </CalendarWeekdays>
                    <CalendarDaysScroller>
                      <CalendarDaysScrollerContent>
                        <CalendarWeeks>
                          <CalendarDay />
                        </CalendarWeeks>
                      </CalendarDaysScrollerContent>
                    </CalendarDaysScroller>
                  </CalendarDays>
                  <CalendarMonths>
                    <CalendarMonthsGrid>
                      <CalendarMonth />
                    </CalendarMonthsGrid>
                  </CalendarMonths>
                  <CalendarYears>
                    <CalendarYearsScroller>
                      <CalendarYearsScrollerContent>
                        <CalendarYearsGrid>
                          <CalendarYear />
                        </CalendarYearsGrid>
                      </CalendarYearsScrollerContent>
                    </CalendarYearsScroller>
                  </CalendarYears>
                </CalendarContent>
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
      </div>
    ),
  },
  'date-range-field': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-stay'>Stay</Label>
        <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' – ' defaultValue={['2026-07-10', '2026-07-14']}>
          <DateRangeFieldInput id='preview-stay' placeholder='dd.mm.yyyy – dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTrigger square aria-label='Choose stay dates'><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
                  <CalendarHeading>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarHeading>
                  <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
                    <CalendarWeekdays>
                      <CalendarWeekday />
                    </CalendarWeekdays>
                    <CalendarDaysScroller>
                      <CalendarDaysScrollerContent>
                        <CalendarWeeks>
                          <CalendarDay />
                        </CalendarWeeks>
                      </CalendarDaysScrollerContent>
                    </CalendarDaysScroller>
                  </CalendarDays>
                  <CalendarMonths>
                    <CalendarMonthsGrid>
                      <CalendarMonth />
                    </CalendarMonthsGrid>
                  </CalendarMonths>
                  <CalendarYears>
                    <CalendarYearsScroller>
                      <CalendarYearsScrollerContent>
                        <CalendarYearsGrid>
                          <CalendarYear />
                        </CalendarYearsGrid>
                      </CalendarYearsScrollerContent>
                    </CalendarYearsScroller>
                  </CalendarYears>
                </CalendarContent>
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
      </div>
    ),
  },
  'date-time-field': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-starts-at'>Starts at</Label>
        <DateTimeField dateFormat='dd.MM.yyyy' dateSeparator='.' separator=', ' timeFormat='HH:mm' defaultValue='2026-07-15T18:30'>
          <DateTimeFieldInput id='preview-starts-at' placeholder='dd.mm.yyyy, hh:mm' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose start date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateTimeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
                  <CalendarHeading>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarHeading>
                  <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
                    <CalendarWeekdays>
                      <CalendarWeekday />
                    </CalendarWeekdays>
                    <CalendarDaysScroller>
                      <CalendarDaysScrollerContent>
                        <CalendarWeeks>
                          <CalendarDay />
                        </CalendarWeeks>
                      </CalendarDaysScrollerContent>
                    </CalendarDaysScroller>
                  </CalendarDays>
                  <CalendarMonths>
                    <CalendarMonthsGrid>
                      <CalendarMonth />
                    </CalendarMonthsGrid>
                  </CalendarMonths>
                  <CalendarYears>
                    <CalendarYearsScroller>
                      <CalendarYearsScrollerContent>
                        <CalendarYearsGrid>
                          <CalendarYear />
                        </CalendarYearsGrid>
                      </CalendarYearsScrollerContent>
                    </CalendarYearsScroller>
                  </CalendarYears>
                </CalendarContent>
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
    ),
  },
  fieldset: {
    node: (
      <Fieldset appearance='outlined' className={styles.wide}>
        <FieldsetLegend>Notify me by</FieldsetLegend>
        <div className={styles.list}>
          <Checkbox>
            <CheckboxInput defaultChecked />
            <CheckboxIndicator>
              <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
              <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
            </CheckboxIndicator>
            <Text size={3}>Email</Text>
          </Checkbox>
          <Checkbox>
            <CheckboxInput />
            <CheckboxIndicator>
              <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
              <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
            </CheckboxIndicator>
            <Text size={3}>Push notifications</Text>
          </Checkbox>
        </div>
      </Fieldset>
    ),
  },
  'helper-text': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-helper-password'>Password</Label>
        <TextField>
          <TextFieldInput id='preview-helper-password' type='password' defaultValue='secret' aria-describedby='preview-helper-hint' />
        </TextField>
        <HelperText id='preview-helper-hint'>At least 8 characters.</HelperText>
      </div>
    ),
  },
  label: {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-label'>Work email</Label>
        <TextField><TextFieldInput id='preview-label' type='email' placeholder='maria@northwind.io' /></TextField>
      </div>
    ),
  },
  listbox: {
    node: (
      <Listbox aria-label='Delivery method' defaultValue='courier' className={styles.listbox}>
        <ListboxOption value='pickup'>Pickup point</ListboxOption>
        <ListboxOption value='courier'>Courier to the door</ListboxOption>
        <ListboxOption value='locker'>Parcel locker</ListboxOption>
      </Listbox>
    ),
  },
  'number-field': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-guests'>Guests</Label>
        <NumberField min={1} max={10} defaultValue={2}>
          <NumberFieldDecrementButton square aria-label='Remove guest'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
          <NumberFieldInput id='preview-guests' />
          <NumberFieldIncrementButton square aria-label='Add guest'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
        </NumberField>
      </div>
    ),
  },
  'password-field': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-password'>Password</Label>
        <PasswordField>
          <PasswordFieldInput id='preview-password' defaultValue='hunter22' />
          <PasswordFieldToggle square aria-label='Show password'>
            <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
            <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
          </PasswordFieldToggle>
        </PasswordField>
      </div>
    ),
  },
  'phone-field': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-phone'>Phone</Label>
        <PhoneField country='US'>
          <PhoneFieldInput id='preview-phone' placeholder='+1 (___) ___-____' />
        </PhoneField>
      </div>
    ),
  },
  'pin-field': {
    node: (
      <PinField maxLength={4} defaultValue='42'>
        <PinFieldInput aria-label='Verification code' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
    ),
  },
  radio: {
    node: (
      <div role='radiogroup' aria-label='Billing period' className={styles.list}>
        <label className={styles.row}><Radio name='preview-billing' value='monthly' defaultChecked /><Text size={3}>Monthly</Text></label>
        <label className={styles.row}><Radio name='preview-billing' value='yearly' /><Text size={3}>Yearly</Text></label>
      </div>
    ),
  },
  'segmented-control': {
    node: (
      <SegmentedControl size='sm' name='preview-view' defaultValue='week' aria-label='Calendar view'>
        {['Day', 'Week', 'Month'].map((label) => (
          <SegmentedControlItem key={label} value={label.toLowerCase()}>
            <SegmentedControlItemInput />
            {label}
          </SegmentedControlItem>
        ))}
        <SegmentedControlIndicator />
      </SegmentedControl>
    ),
  },
  combobox: { node: <ComboboxPreview /> },
  select: {
    node: (
      <div className={styles.field}>
        <Label id='preview-framework-label'>Framework</Label>
        <Select defaultValue='react' className={styles.wide}>
          <SelectCombobox aria-labelledby='preview-framework-label'>
            <SelectValue placeholder='Choose a framework' />
            <SelectIcon><ChevronDownIcon /></SelectIcon>
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='react'>React</SelectOption>
            <SelectOption value='vue'>Vue</SelectOption>
            <SelectOption value='svelte'>Svelte</SelectOption>
          </SelectListbox>
        </Select>
      </div>
    ),
  },
  slider: {
    node: (
      <Slider defaultValue={40} className={styles.wide}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput aria-label='Volume' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    ),
  },
  switch: {
    node: (
      <div className={styles.setting}>
        <Text asChild size={3}><label htmlFor='preview-notifications'>Notifications</label></Text>
        <Switch>
          <SwitchInput id='preview-notifications' defaultChecked />
          <SwitchIndicator />
        </Switch>
      </div>
    ),
  },
  'text-area': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-issue'>What went wrong?</Label>
        <TextArea id='preview-issue' placeholder='Steps to reproduce, expected and actual result' rows={3} className={styles.wide} />
      </div>
    ),
  },
  'text-field': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-email'>Email</Label>
        <TextField>
          <TextFieldInput id='preview-email' type='email' placeholder='name@company.com' />
        </TextField>
      </div>
    ),
  },
  'time-field': {
    node: (
      <div className={styles.field}>
        <Label htmlFor='preview-time'>Reminder</Label>
        <TimeField defaultValue='09:30'>
          <TimeFieldInput id='preview-time' placeholder='hh:mm' />
        </TimeField>
      </div>
    ),
  },
  dialog: {
    node: (
      <Dialog>
        <DialogTrigger asChild><Button variant='secondary' appearance='ghost'>Leave workspace</Button></DialogTrigger>
        <DialogContent aria-labelledby='preview-dialog-title' aria-describedby='preview-dialog-text'>
          <div className={styles.header}>
            <Heading id='preview-dialog-title' as='h2' size={4} fontWeight={600}>Leave Northwind Studio?</Heading>
            <DialogClose asChild>
              <Button square aria-label='Close' variant='secondary' appearance='ghost' style={CLOSE_STYLE}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </DialogClose>
          </div>
          <Text id='preview-dialog-text' size={3} className={styles.body}>You will lose access to 14 projects until an admin invites you again.</Text>
        </DialogContent>
      </Dialog>
    ),
  },
  drawer: {
    node: (
      <Drawer position='end'>
        <DrawerTrigger asChild><Button variant='secondary' appearance='ghost'>Team members</Button></DrawerTrigger>
        <DrawerContent aria-labelledby='preview-drawer-title' className={styles.drawer}>
          <div className={styles.header}>
            <Heading id='preview-drawer-title' as='h2' size={4} fontWeight={600}>Team members</Heading>
            <DrawerClose asChild>
              <Button square aria-label='Close' variant='secondary' appearance='ghost' style={CLOSE_STYLE}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </DrawerClose>
          </div>
          <Text size={3} className={styles.body}>Manage roles and pending invitations.</Text>
        </DrawerContent>
      </Drawer>
    ),
  },
  popover: {
    node: (
      <Popover role='dialog'>
        <PopoverTrigger asChild><Button variant='secondary' appearance='ghost'>Storage · 82% used</Button></PopoverTrigger>
        <PopoverContent aria-labelledby='preview-popover-title'>
          <div className={styles.popover}>
            <Heading id='preview-popover-title' as='h2' size={5} fontWeight={600}>16.4 GB of 20 GB used</Heading>
            <Text size={2} className={styles.secondary}>Old exports are removed after 90 days.</Text>
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
  menu: {
    node: (
      <Menu>
        <MenuTrigger asChild><Button variant='secondary' appearance='ghost'>Edit</Button></MenuTrigger>
        <MenuContent>
          <MenuItem>Undo</MenuItem>
          <MenuItem disabled>Redo</MenuItem>
          <Separator />
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
        </MenuContent>
      </Menu>
    ),
  },
  toolbar: {
    node: (
      <Toolbar aria-label='Formatting'>
        <ToggleGroup multiple size='sm' aria-label='Text style' defaultValue={['bold']}>
          <ToggleGroupToggle value='bold' square aria-label='Bold'><Icon><BoldIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='italic' square aria-label='Italic'><Icon><ItalicIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='underline' square aria-label='Underline'><Icon><UnderlineIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Separator orientation='vertical' />
        <ToggleGroup size='sm' aria-label='Alignment' defaultValue='start'>
          <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
      </Toolbar>
    ),
  },
  'toggle': {
    node: (
      <Toggle defaultPressed>
        <Icon size='sm'><MicOffIcon /></Icon>
        Mute
      </Toggle>
    ),
  },
  'toggle-group': {
    node: (
      <ToggleGroup size='sm' aria-label='Alignment' defaultValue='start'>
        <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
        <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
        <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
      </ToggleGroup>
    ),
  },
  'context-menu': {
    node: (
      <ContextMenu>
        <ContextMenuTrigger className={styles.contextArea}>
          <Text size={2} className={styles.secondary}>Right click here</Text>
        </ContextMenuTrigger>
        <MenuContent aria-label='Edit'>
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem disabled>Paste</MenuItem>
          <Separator />
          <MenuItem>Select all</MenuItem>
        </MenuContent>
      </ContextMenu>
    ),
  },
  sheet: {
    node: (
      <Sheet>
        <SheetTrigger asChild><Button>Order summary</Button></SheetTrigger>
        <SheetContent aria-labelledby='preview-sheet-title'>
          <SheetHandle aria-label='Resize sheet' />
          <div className={styles.header}>
            <Heading id='preview-sheet-title' as='h2' size={4} fontWeight={600}>Order summary</Heading>
            <SheetClose asChild>
              <Button square aria-label='Close' variant='secondary' appearance='ghost' style={CLOSE_STYLE}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </SheetClose>
          </div>
          <Text size={3} className={styles.secondary}>2 × Flat white, 1 × Almond croissant · $13.40</Text>
        </SheetContent>
      </Sheet>
    ),
  },
  tooltip: {
    node: (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button square variant='secondary' appearance='ghost' aria-label='Notifications'><Icon><Bell /></Icon></Button>
        </TooltipTrigger>
        <TooltipContent>
          <Text size={2}>Notifications</Text>
        </TooltipContent>
      </Tooltip>
    ),
  },
  link: { node: <Link href='#'>Billing settings</Link> },
  'page-control': {
    node: (
      <PageControl aria-label='Onboarding pages'>
        <PageControlItem index={0} aria-label='Welcome' />
        <PageControlItem index={1} aria-label='Connect your calendar' />
        <PageControlItem index={2} aria-label='Invite your team' />
        <PageControlItem index={3} aria-label='Start working' />
      </PageControl>
    ),
  },
  pagination: {
    node: (
      <Pagination aria-label='Pagination'>
        <PaginationList>
          {[1, 2, 3, 4].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink asChild current={page === 2}>
                <button type='button'>{page}</button>
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationList>
      </Pagination>
    ),
  },
  'snap-scroller': {
    node: (
      <SnapScroller tabIndex={0} aria-label='Dashboard sections' className={styles.scroller}>
        {['Overview', 'Metrics', 'Billing'].map((section, index) => (
          <SnapScrollerContent key={section} index={index} className={styles.slide}>{section}</SnapScrollerContent>
        ))}
      </SnapScroller>
    ),
  },
  'indexed-snap-scroller': {
    node: (
      <IndexedSnapScroller defaultIndex={0} tabIndex={0} aria-label='Months' className={styles.scroller}>
        <IndexedSlide />
      </IndexedSnapScroller>
    ),
  },
  calendar: {
    node: (
      <Calendar locale='en-US' defaultValue='2026-11-03'>
        <CalendarHeader>
          <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
          <CalendarHeading>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarHeading>
          <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeekdays><CalendarWeekday /></CalendarWeekdays>
            <CalendarDaysScroller><CalendarDaysScrollerContent><CalendarWeeks><CalendarDay /></CalendarWeeks></CalendarDaysScrollerContent></CalendarDaysScroller>
          </CalendarDays>
          <CalendarMonths><CalendarMonthsGrid><CalendarMonth /></CalendarMonthsGrid></CalendarMonths>
          <CalendarYears><CalendarYearsScroller><CalendarYearsScrollerContent><CalendarYearsGrid><CalendarYear /></CalendarYearsGrid></CalendarYearsScrollerContent></CalendarYearsScroller></CalendarYears>
        </CalendarContent>
      </Calendar>
    ),
  },
  'day-picker': {
    node: (
      <DayPicker aria-label='November 2026' locale='en-GB' defaultValue='2026-11-03'>
        <DayPickerLayout><DayPickerCell /></DayPickerLayout>
      </DayPicker>
    ),
  },
  'month-picker': {
    node: (
      <MonthPicker aria-label='Month, 2026' locale='en-US' defaultValue='2026-11-01' className={styles.wide}>
        <MonthPickerLayout><MonthPickerCell /></MonthPickerLayout>
      </MonthPicker>
    ),
  },
  'year-picker': {
    node: (
      <YearPicker aria-label='Year' defaultValue='2026-01-01' className={styles.wide}>
        <YearPickerLayout><YearPickerCell /></YearPickerLayout>
      </YearPicker>
    ),
  },
  'grid': {
    node: (
      <Grid aria-label='Release checklist' className={styles.sheet}>
        <GridRowGroup>
          <GridRow row={0}>
            <GridCell col={0}>Design</GridCell>
            <GridCell col={1}>Build</GridCell>
            <GridCell col={2}>Ship</GridCell>
          </GridRow>
          <GridRow row={1}>
            <GridCell col={0}>Done</GridCell>
            <GridCell col={1}>Review</GridCell>
            <GridCell col={2}>Planned</GridCell>
          </GridRow>
        </GridRowGroup>
      </Grid>
    ),
  },
  table: {
    node: (
      <Table fullWidth className={styles.numbers}>
        <TableHead>
          <TableRow><TableHeading>Plan</TableHeading><TableHeading className={styles.end}>Per month</TableHeading></TableRow>
        </TableHead>
        <TableBody>
          <TableRow><TableData>Starter</TableData><TableData className={styles.end}>$9</TableData></TableRow>
          <TableRow><TableData>Team</TableData><TableData className={styles.end}>$29</TableData></TableRow>
        </TableBody>
      </Table>
    ),
  },
  tabs: {
    node: (
      <Tabs size='sm' defaultValue='overview' className={styles.wide}>
        <TabsList aria-label='Project'>
          <TabsTab value='overview'>Overview</TabsTab>
          <TabsTab value='activity'>Activity</TabsTab>
          <TabsTab value='settings'>Settings</TabsTab>
        </TabsList>
        <TabsPanel value='overview'><Text size={2}>12 of 18 launch tasks done</Text></TabsPanel>
        <TabsPanel value='activity'><Text size={2}>Mira moved a task to review</Text></TabsPanel>
        <TabsPanel value='settings'><Text size={2}>Visible to the workspace</Text></TabsPanel>
      </Tabs>
    ),
  },
  alert: {
    node: (
      <Alert variant='success' appearance='surface' className={styles.wide}>
        <AlertIcon><CircleCheckIcon /></AlertIcon>
        <AlertContent>Changes saved</AlertContent>
      </Alert>
    ),
  },
  toast: {
    node: (
      <>
        <Button variant='secondary' appearance='ghost' onClick={() => PREVIEW_TOASTS.add('Conversation archived', { timeout: 6000 })}>Archive</Button>
        <ToastRegion queue={PREVIEW_TOASTS} aria-label='Notifications'>
          <PreviewToast />
        </ToastRegion>
      </>
    ),
  },
  meter: {
    node: (
      <div className={styles.field}>
        <div className={styles.caption}>
          <Text id='preview-meter-label' size={2} fontWeight={500}>Cloud storage</Text>
          <Text size={2} className={styles.value}>36 of 50 GB</Text>
        </div>
        <Meter value={36} max={50} valueText='36 GB of 50 GB used' aria-labelledby='preview-meter-label' fullWidth>
          <MeterTrack />
        </Meter>
      </div>
    ),
  },
  'meter-stack': {
    node: (
      <div className={styles.field}>
        <div className={styles.caption}>
          <Text id='preview-meter-stack-label' size={2} fontWeight={500}>Storage</Text>
          <Text size={2} className={styles.value}>46 of 64 GB</Text>
        </div>
        <MeterStack value={46} max={64} aria-labelledby='preview-meter-stack-label' fullWidth>
          {STORAGE.map((item) => (
            <MeterStackSegment
              key={item.label}
              value={item.value}
              aria-label={item.label}
              aria-valuetext={`${item.value} GB`}
              style={{ '--meter-stack-segment-color': item.color } as CSSProperties}
            />
          ))}
        </MeterStack>
      </div>
    ),
  },
  progress: {
    node: (
      <div className={styles.field}>
        <div className={styles.caption}>
          <Text id='preview-progress-label' size={2} fontWeight={500}>Uploading report.pdf</Text>
          <Text size={2} className={styles.value}>64%</Text>
        </div>
        <Progress value={64} aria-labelledby='preview-progress-label' fullWidth><ProgressTrack /></Progress>
      </div>
    ),
  },
  spinner: { node: <Spinner size={6} aria-label='Loading' /> },
  avatar: { node: <Avatar size='lg'><AvatarFallback>JD</AvatarFallback></Avatar> },
  'avatar-stack': {
    node: (
      <AvatarStack>
        {['AL', 'BK', 'CM'].map((initials) => <AvatarStackItem key={initials}><AvatarFallback>{initials}</AvatarFallback></AvatarStackItem>)}
      </AvatarStack>
    ),
  },
  badge: {
    node: (
      <div className={styles.row}>
        <Badge variant='success'>Active</Badge>
        <Badge variant='warning' appearance='surface'>Beta</Badge>
      </div>
    ),
  },
  card: {
    node: (
      <Card aria-labelledby='preview-card-title' className={styles.card}>
        <Heading id='preview-card-title' as='h2' size={4} fontWeight={600}>Weekly report</Heading>
        <Text size={2} className={styles.secondary}>Sent every Monday at 9:00 to 4 people.</Text>
      </Card>
    ),
  },
  icon: {
    node: (
      <div className={styles.icons}>
        <Icon><Check /></Icon>
        <Icon><Heart /></Icon>
        <Icon><Star /></Icon>
        <Icon><Bell /></Icon>
      </div>
    ),
  },
  separator: {
    node: (
      <div className={styles.field}>
        <Text size={3}>Profile</Text>
        <Separator />
        <Text size={3}>Billing</Text>
        <Separator />
        <Text size={3}>Security</Text>
      </div>
    ),
  },
  code: { node: <Code size={3}>pnpm add @vega-ui/react</Code> },
  heading: { node: <Heading as='h2' size={6} fontWeight={700}>Aa</Heading> },
  text: { node: <Text size={3} className={styles.center}>The quick brown fox jumps over the lazy dog.</Text> },
  option: {
    node: (
      <div role='listbox' aria-label='Issue status' className={styles.options}>
        <Option>Backlog</Option>
        <Option selected>In progress</Option>
        <Option>Done</Option>
      </div>
    ),
  },
  slot: {
    node: (
      <ButtonBase asChild variant='secondary' appearance='ghost' className={styles.base}>
        <a href='#'>Open billing</a>
      </ButtonBase>
    ),
  },
  'visually-hidden': {
    node: (
      <Button square aria-labelledby='visually-hidden-preview' variant='secondary' appearance='ghost'>
        <Icon><Search /></Icon>
        <VisuallyHidden id='visually-hidden-preview'>Search</VisuallyHidden>
      </Button>
    ),
  },
};
