import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Fieldset,
  FieldsetLegend,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressTrack,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import { CalendarDays as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, ListChecks, Plus, SearchIcon, XIcon } from '@vega-ui/icons';
import './task-board.css';

type Status = 'todo' | 'progress' | 'review' | 'done';
type LabelName = 'design' | 'frontend' | 'bug' | 'research';

interface Task {
  id: string
  title: string
  description: string
  status: Status
  assignee: string
  due: string
  labels: LabelName[]
  subtasks: { done: number, total: number }
}

const TODAY = '2026-11-04';
const NARROW = 640;

const columns: { status: Status, title: string }[] = [
  { status: 'todo', title: 'To do' },
  { status: 'progress', title: 'In progress' },
  { status: 'review', title: 'Review' },
  { status: 'done', title: 'Done' },
];

const people: Record<string, { name: string, initials: string }> = {
  ana: { name: 'Ana Souza', initials: 'AS' },
  omar: { name: 'Omar Haddad', initials: 'OH' },
  lena: { name: 'Lena Fischer', initials: 'LF' },
  kenji: { name: 'Kenji Watanabe', initials: 'KW' },
};

const labels: Record<LabelName, { title: string, variant: 'info' | 'success' | 'error' | 'warning' }> = {
  design: { title: 'Design', variant: 'info' },
  frontend: { title: 'Frontend', variant: 'success' },
  bug: { title: 'Bug', variant: 'error' },
  research: { title: 'Research', variant: 'warning' },
};

const initialTasks: Task[] = [
  { id: 't1', title: 'Audit empty states in checkout', description: '', status: 'todo', assignee: 'ana', due: '2026-11-12', labels: ['design'], subtasks: { done: 0, total: 4 } },
  { id: 't2', title: 'Write the migration guide for Select 3.0', description: '', status: 'todo', assignee: 'kenji', due: '2026-11-18', labels: ['frontend'], subtasks: { done: 0, total: 3 } },
  { id: 't3', title: 'Interview five teams that churned in October', description: '', status: 'todo', assignee: 'lena', due: '2026-11-03', labels: ['research'], subtasks: { done: 1, total: 5 } },
  { id: 't4', title: 'Sticky order summary on mobile', description: '', status: 'progress', assignee: 'omar', due: '2026-11-06', labels: ['design', 'frontend'], subtasks: { done: 3, total: 5 } },
  { id: 't5', title: 'Tax row jumps when the country changes', description: '', status: 'progress', assignee: 'kenji', due: '2026-11-02', labels: ['bug', 'frontend'], subtasks: { done: 2, total: 3 } },
  { id: 't6', title: 'Collapse the promo code field by default', description: '', status: 'progress', assignee: 'ana', due: '2026-11-10', labels: ['frontend'], subtasks: { done: 1, total: 2 } },
  { id: 't7', title: 'Dark theme contrast pass', description: '', status: 'review', assignee: 'lena', due: '2026-11-04', labels: ['design'], subtasks: { done: 4, total: 4 } },
  { id: 't8', title: 'Retry failed card payments', description: '', status: 'review', assignee: 'omar', due: '2026-11-07', labels: ['bug'], subtasks: { done: 5, total: 6 } },
  { id: 't9', title: 'Checkout v3 usability sessions', description: '', status: 'done', assignee: 'lena', due: '2026-10-30', labels: ['research'], subtasks: { done: 6, total: 6 } },
  { id: 't10', title: 'Address autocomplete', description: '', status: 'done', assignee: 'kenji', due: '2026-10-28', labels: ['frontend'], subtasks: { done: 3, total: 3 } },
];

const dueFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

const field = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;
const dialogHeader = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' } as const;
const ghost = { variant: 'secondary', appearance: 'ghost' } as const;
const quiet = { variant: 'secondary', appearance: 'transparent' } as const;
const meta = { display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' } as const;

const columnTitle = (status: Status) => columns.find((column) => column.status === status)?.title ?? '';

const dueLabel = (date: string) => {
  if (date === TODAY) return 'Today';

  return dueFormat.format(Date.parse(date));
};

export default function TaskBoard() {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<{ id: string, part: 'card' | 'prev' | 'next' } | null>(null);
  const nextId = useRef(11);
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState('');
  const [assignees, setAssignees] = useState<string[]>([]);
  const [narrow, setNarrow] = useState(false);
  const [expanded, setExpanded] = useState<Status[]>(['progress']);
  const [announcement, setAnnouncement] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<'title' | 'due', string>>>({});
  const [draftStatus, setDraftStatus] = useState<Status>('todo');
  const [draftAssignee, setDraftAssignee] = useState('ana');
  const [draftDue, setDraftDue] = useState('');

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new ResizeObserver(([entry]) => setNarrow(entry.contentRect.width < NARROW));
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;

    pendingFocus.current = null;
    const card = rootRef.current?.querySelector<HTMLElement>(`[data-task='${pending.id}']`);
    if (!card) return;

    const button = pending.part === 'card' ? null : card.querySelector<HTMLButtonElement>(`[data-move='${pending.part}']:not(:disabled)`);
    (button ?? card).focus();
  }, [tasks, expanded]);

  const search = query.trim().toLowerCase();
  const filtering = search !== '' || assignees.length > 0;
  const visible = tasks.filter((task) => {
    if (assignees.length > 0 && !assignees.includes(task.assignee)) return false;

    return task.title.toLowerCase().includes(search);
  });

  const toggleAssignee = (person: string) => {
    if (assignees.includes(person)) {
      setAssignees(assignees.filter((item) => item !== person));
      return;
    }

    setAssignees([...assignees, person]);
  };

  const clearFilters = () => {
    setQuery('');
    setAssignees([]);
  };

  const move = (task: Task, step: number, part: 'card' | 'prev' | 'next') => {
    const index = columns.findIndex((column) => column.status === task.status);
    const target = columns[index + step];
    if (!target) return;

    pendingFocus.current = { id: task.id, part };
    setTasks((current) => [...current.filter((item) => item.id !== task.id), { ...task, status: target.status }]);
    setExpanded((current) => current.includes(target.status) ? current : [...current, target.status]);
    setAnnouncement(`Moved “${task.title}” to ${target.title}.`);
  };

  const onCardKeyDown = (event: KeyboardEvent<HTMLElement>, task: Task) => {
    if (!event.shiftKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;

    event.preventDefault();
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const forward = (event.key === 'ArrowRight') !== rtl;
    move(task, forward ? 1 : -1, 'card');
  };

  const changeCreateOpen = (open: boolean) => {
    setCreateOpen(open);

    if (!open) return;

    setErrors({});
    setDraftStatus('todo');
    setDraftAssignee('ana');
    setDraftDue('');
  };

  const createTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get('title')).trim();
    const nextErrors: Partial<Record<'title' | 'due', string>> = {};

    if (title === '') nextErrors.title = 'Give the task a title.';
    if (title.length > 80) nextErrors.title = 'Keep the title under 80 characters.';
    if (draftDue !== '' && draftDue < TODAY) nextErrors.due = 'Pick today or a later date.';

    setErrors(nextErrors);

    const invalid = (['title', 'due'] as const).find((name) => nextErrors[name]);
    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    const task: Task = {
      id: `t${nextId.current++}`,
      title,
      description: String(data.get('description')).trim(),
      status: draftStatus,
      assignee: draftAssignee,
      due: draftDue,
      labels: data.getAll('labels').map(String) as LabelName[],
      subtasks: { done: 0, total: 0 },
    };

    setTasks((current) => [...current, task]);
    setExpanded((current) => current.includes(draftStatus) ? current : [...current, draftStatus]);
    setAnnouncement(`Created “${title}” in ${columnTitle(draftStatus)}.`);
    setCreateOpen(false);
  };

  const describe = (name: 'title' | 'due') => errors[name] ? `${id}-${name}-error` : undefined;

  const renderCard = (task: Task) => {
    const index = columns.findIndex((column) => column.status === task.status);
    const prev = columns[index - 1];
    const next = columns[index + 1];
    const done = task.status === 'done';
    const overdue = !done && task.due !== '' && task.due < TODAY;
    const person = people[task.assignee];

    return (
      <li key={task.id}>
        <article
          tabIndex={0}
          data-task={task.id}
          className='tb-card'
          aria-labelledby={`${id}-${task.id}-title`}
          aria-describedby={`${id}-${task.id}-meta ${id}-hint`}
          onKeyDown={(event) => onCardKeyDown(event, task)}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
            <Text
              id={`${id}-${task.id}-title`}
              size={3}
              fontWeight={500}
              style={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere', color: done ? 'var(--label-secondary)' : undefined }}
            >
              {task.title}
            </Text>
            <Avatar size='sm' role='img' aria-label={`Assigned to ${person.name}`} title={person.name} style={{ flexShrink: 0 }}>
              <AvatarFallback>{person.initials}</AvatarFallback>
            </Avatar>
          </div>
          {task.description !== '' && (
            <Text size={2} className='tb-description'>{task.description}</Text>
          )}
          {task.labels.length > 0 && (
            <ul aria-label='Labels' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
              {task.labels.map((label) => (
                <li key={label}><Badge size='xs' variant={labels[label].variant}>{labels[label].title}</Badge></li>
              ))}
            </ul>
          )}
          {task.subtasks.total > 0 && (
            <Progress
              size='sm'
              value={task.subtasks.done}
              max={task.subtasks.total}
              valueText={`${task.subtasks.done} of ${task.subtasks.total} subtasks done`}
              aria-label='Subtasks'
              fullWidth
            >
              <ProgressTrack />
            </Progress>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <span id={`${id}-${task.id}-meta`} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-1) var(--spacing-6)', flex: 1, minWidth: 0 }}>
              {task.due !== '' && (
                <Text size={2} style={{ ...meta, color: overdue ? 'var(--color-error)' : 'var(--label-secondary)', fontWeight: overdue ? 500 : undefined }}>
                  <Icon size='xs' aria-hidden='true'><CalendarIcon /></Icon>
                  <VisuallyHidden asChild><span>{overdue ? 'Overdue, was due' : 'Due'}</span></VisuallyHidden>
                  {dueLabel(task.due)}
                </Text>
              )}
              {task.subtasks.total > 0 && (
                <Text size={2} style={{ ...meta, color: 'var(--label-secondary)' }}>
                  <Icon size='xs' aria-hidden='true'><ListChecks /></Icon>
                  <VisuallyHidden asChild><span>Subtasks</span></VisuallyHidden>
                  {`${task.subtasks.done}/${task.subtasks.total}`}
                </Text>
              )}
            </span>
            <span style={{ display: 'flex', gap: 'var(--spacing-1)', flexShrink: 0, marginInlineStart: 'auto' }}>
              <IconButton
                size='xs'
                type='button'
                {...quiet}
                data-move='prev'
                disabled={!prev}
                aria-label={prev ? `Move to ${prev.title}` : 'Already in the first column'}
                onClick={() => move(task, -1, 'prev')}
              >
                <Icon size='sm' className='tb-mirror'><ChevronLeft /></Icon>
              </IconButton>
              <IconButton
                size='xs'
                type='button'
                {...quiet}
                data-move='next'
                disabled={!next}
                aria-label={next ? `Move to ${next.title}` : 'Already in the last column'}
                onClick={() => move(task, 1, 'next')}
              >
                <Icon size='sm' className='tb-mirror'><ChevronRight /></Icon>
              </IconButton>
            </span>
          </div>
        </article>
      </li>
    );
  };

  const renderColumn = (status: Status, title: string) => {
    const items = visible.filter((task) => task.status === status);
    const headingId = `${id}-${status}`;

    const count = (
      <Badge size='xs' variant='info' appearance='surface' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {items.length}
        <VisuallyHidden asChild><span>{items.length === 1 ? ' task' : ' tasks'}</span></VisuallyHidden>
      </Badge>
    );

    const list = items.length === 0
      ? <Text size={2} className='tb-empty'>{filtering ? 'No matching tasks' : 'No tasks yet'}</Text>
      : <ul className='tb-list'>{items.map(renderCard)}</ul>;

    if (narrow) {
      const open = expanded.includes(status);

      return (
        <section key={status} className='tb-column' aria-labelledby={headingId}>
          <Collapsible
            open={open}
            onChangeOpen={(value) => setExpanded(value ? [...expanded, status] : expanded.filter((item) => item !== status))}
          >
            <h2 id={headingId} style={{ margin: 0 }}>
              <CollapsibleTrigger className='tb-toggle'>
                <Text size={3} fontWeight={600}>{title}</Text>
                {count}
                <Icon size='sm' aria-hidden='true' className='tb-chevron' style={{ marginInlineStart: 'auto' }}><ChevronDown /></Icon>
              </CollapsibleTrigger>
            </h2>
            <CollapsibleContent>
              <div style={{ paddingBlockStart: 'var(--spacing-4)' }}>{list}</div>
            </CollapsibleContent>
          </Collapsible>
        </section>
      );
    }

    return (
      <section key={status} className='tb-column' aria-labelledby={headingId}>
        <h2 id={headingId} className='tb-column-header'>
          <Text size={3} fontWeight={600}>{title}</Text>
          {count}
        </h2>
        {list}
      </section>
    );
  };

  return (
    <div ref={rootRef} className='tb-root' style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 1120, marginInline: 'auto' }}>
      <header style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--spacing-8) var(--spacing-12)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: '1 1 280px' }}>
          <Heading as='h1' size={7} fontWeight={700}>Checkout v3</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Sprint 24 · Nov 2 – Nov 13</Text>
        </div>
        <Dialog open={createOpen} onChangeOpen={changeCreateOpen}>
          <DialogTrigger asChild>
            <Button size='xs' style={{ gap: 'var(--spacing-2)' }}>
              <Icon size='xs' aria-hidden='true'><Plus strokeWidth={2.5} /></Icon>
              New task
            </Button>
          </DialogTrigger>
          <DialogContent aria-labelledby={`${id}-create-title`} style={{ width: 'min(480px, 100%)', boxSizing: 'border-box' }}>
            <div style={dialogHeader}>
              <Heading id={`${id}-create-title`} as='h2' size={4} fontWeight={600}>New task</Heading>
              <DialogClose asChild>
                <IconButton size='xs' aria-label='Close' {...ghost} style={closeButton}>
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </DialogClose>
            </div>
            <form noValidate onSubmit={createTask} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-10)' }}>
              <div style={field}>
                <Label htmlFor={`${id}-title`}>Title</Label>
                <TextField error={errors.title !== undefined}>
                  <TextFieldInput
                    id={`${id}-title`}
                    name='title'
                    autoComplete='off'
                    placeholder='Reserve height for the tax row'
                    aria-invalid={errors.title !== undefined}
                    aria-describedby={describe('title')}
                    onChange={() => setErrors({ ...errors, title: undefined })}
                  />
                </TextField>
                {errors.title && <HelperText id={`${id}-title-error`} error>{errors.title}</HelperText>}
              </div>
              <div style={field}>
                <Label htmlFor={`${id}-description`}>Description (optional)</Label>
                <TextArea id={`${id}-description`} name='description' rows={3} fullWidth placeholder='What does done look like?' />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 'var(--spacing-8)' }}>
                <div style={field}>
                  <Label htmlFor={`${id}-status`}>Column</Label>
                  <Select value={draftStatus} onChangeValue={(value) => setDraftStatus(value ?? 'todo')}>
                    <SelectCombobox id={`${id}-status`}>
                      <SelectValue />
                      <SelectIcon />
                    </SelectCombobox>
                    <SelectListbox>
                      {columns.map((column) => <SelectOption key={column.status} value={column.status}>{column.title}</SelectOption>)}
                    </SelectListbox>
                  </Select>
                </div>
                <div style={field}>
                  <Label htmlFor={`${id}-assignee`}>Assignee</Label>
                  <Select value={draftAssignee} onChangeValue={(value) => setDraftAssignee(value ?? 'ana')}>
                    <SelectCombobox id={`${id}-assignee`}>
                      <SelectValue />
                      <SelectIcon />
                    </SelectCombobox>
                    <SelectListbox>
                      {Object.entries(people).map(([key, person]) => <SelectOption key={key} value={key}>{person.name}</SelectOption>)}
                    </SelectListbox>
                  </Select>
                </div>
              </div>
              <div style={field}>
                <Label htmlFor={`${id}-due`}>Due date (optional)</Label>
                <DateField
                  format='MM/dd/yyyy'
                  separator='/'
                  error={errors.due !== undefined}
                  value={draftDue}
                  onChangeValue={(value) => {
                    setDraftDue(value);
                    setErrors({ ...errors, due: undefined });
                  }}
                >
                  <DateFieldInput
                    id={`${id}-due`}
                    name='due'
                    placeholder='mm/dd/yyyy'
                    aria-invalid={errors.due !== undefined}
                    aria-describedby={describe('due')}
                  />
                  <Popover placement='bottom-end'>
                    <PopoverTrigger asChild>
                      <DateFieldTriggerIconButton aria-label='Choose due date' />
                    </PopoverTrigger>
                    <PopoverContent>
                      <DateFieldCalendar>
                        <CalendarHeader>
                          <CalendarPrevButton aria-label='Previous month' />
                          <CalendarViewButtonGroup>
                            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                          </CalendarViewButtonGroup>
                          <CalendarNextButton aria-label='Next month' />
                        </CalendarHeader>
                        <CalendarContent>
                          <CalendarDays>
                            <CalendarWeekdays>
                              <CalendarWeekday />
                            </CalendarWeekdays>
                            <CalendarWeeks>
                              <CalendarDay />
                            </CalendarWeeks>
                          </CalendarDays>
                          <CalendarMonths>
                            <CalendarMonth />
                          </CalendarMonths>
                          <CalendarYears>
                            <CalendarYear />
                          </CalendarYears>
                        </CalendarContent>
                      </DateFieldCalendar>
                    </PopoverContent>
                  </Popover>
                </DateField>
                {errors.due && <HelperText id={`${id}-due-error`} error>{errors.due}</HelperText>}
              </div>
              <Fieldset>
                <FieldsetLegend size={3} style={{ marginBlockEnd: 'var(--spacing-5)' }}>Labels</FieldsetLegend>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-5) var(--spacing-10)' }}>
                  {(Object.keys(labels) as LabelName[]).map((label) => (
                    <Checkbox key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                      <CheckboxInput name='labels' value={label} />
                      <CheckboxIndicator>
                        <CheckboxCheckedIcon />
                      </CheckboxIndicator>
                      {labels[label].title}
                    </Checkbox>
                  ))}
                </div>
              </Fieldset>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
                <DialogClose asChild>
                  <Button size='xs' type='button' {...ghost}>Cancel</Button>
                </DialogClose>
                <Button size='xs' type='submit'>Create task</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
        <div role='search' style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-6) var(--spacing-10)' }}>
          <TextField size='xs' style={{ flex: '1 1 220px', maxWidth: 320 }}>
            <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
              <SearchIcon />
            </Icon>
            <TextFieldInput
              type='search'
              className='tb-search'
              aria-label='Search tasks'
              placeholder='Search tasks'
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
            />
          </TextField>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
            <div role='group' aria-label='Filter by assignee' style={{ display: 'flex', alignItems: 'center' }}>
              {Object.entries(people).map(([key, person]) => (
                <button
                  key={key}
                  type='button'
                  className='tb-person'
                  aria-pressed={assignees.includes(key)}
                  aria-label={person.name}
                  title={person.name}
                  onClick={() => toggleAssignee(key)}
                >
                  <Avatar size='md' aria-hidden='true'>
                    <AvatarFallback>{person.initials}</AvatarFallback>
                  </Avatar>
                </button>
              ))}
            </div>
            {filtering && <Button size='xs' type='button' {...ghost} onClick={clearFilters}>Clear filters</Button>}
          </div>
        </div>
        <Text id={`${id}-hint`} size={2} style={{ color: 'var(--label-tertiary)' }}>
          Focus a card and press Shift + ← or → to move it between columns.
        </Text>
      </div>

      <div className='tb-board' data-narrow={narrow}>
        {columns.map((column) => renderColumn(column.status, column.title))}
      </div>

      <VisuallyHidden asChild>
        <div aria-live='polite'>{announcement}</div>
      </VisuallyHidden>
    </div>
  );
}
