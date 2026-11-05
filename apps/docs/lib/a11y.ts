import type { KeyboardRow } from './content';

const INPUT_ROLES: Record<string, string> = {
  checkbox: 'checkbox',
  radio: 'radio',
  range: 'slider',
  number: 'spinbutton',
  search: 'searchbox',
  button: 'button',
  submit: 'button',
  reset: 'button',
};

const TAG_ROLES: Record<string, string> = {
  button: 'button',
  select: 'combobox',
  textarea: 'textbox',
  dialog: 'dialog',
  ul: 'list',
  ol: 'list',
  li: 'listitem',
  table: 'table',
  progress: 'progressbar',
  meter: 'meter',
  fieldset: 'group',
};

const STATES = ['aria-expanded', 'aria-checked', 'aria-selected', 'aria-pressed', 'aria-current', 'aria-invalid', 'aria-required', 'aria-disabled', 'aria-readonly'];

const KEY_LABELS: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  PageUp: 'Page Up',
  PageDown: 'Page Down',
  ' ': 'Space',
};

const MODIFIERS = ['Control', 'Meta', 'Alt', 'Shift'];

export interface Announcement {
  tag: string
  name: string
  role: string
  state: string[]
  active?: string
}

export interface AriaNode {
  tag: string
  role: string
  attributes: string[]
  count: number
}

export const getRole = (element: Element) => {
  const role = element.getAttribute('role');
  if (role) return role;
  if (element instanceof HTMLInputElement) return INPUT_ROLES[element.type] ?? 'textbox';
  if (element instanceof HTMLAnchorElement && element.hasAttribute('href')) return 'link';

  return TAG_ROLES[element.localName] ?? '';
};

const readText = (element: Element | null) => element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

export const getName = (element: Element) => {
  const label = element.getAttribute('aria-label');
  if (label) return label;

  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) return labelledBy.split(' ').map((id) => readText(document.getElementById(id))).join(' ');

  const labels = element instanceof HTMLInputElement || element instanceof HTMLButtonElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement ? element.labels : null;
  if (labels && labels.length > 0) return readText(labels[0]);

  return readText(element).slice(0, 60);
};

const readState = (element: Element) => {
  const state = STATES
    .filter((name) => element.hasAttribute(name))
    .map((name) => `${name.slice(5)}=${element.getAttribute(name)}`);

  if (element instanceof HTMLButtonElement && element.popoverTargetElement && !element.hasAttribute('aria-expanded')) state.push(`expanded=${element.popoverTargetElement.matches(':popover-open')}`);
  if (element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio')) state.push(`checked=${element.checked}`);
  if (element instanceof HTMLInputElement && element.type === 'range') state.push(`value=${element.getAttribute('aria-valuetext') ?? element.value}`);
  if (element.matches(':disabled')) state.push('disabled');
  if (element.matches(':required')) state.push('required');

  return state;
};

export const describe = (element: Element): Announcement => {
  const activeId = element.getAttribute('aria-activedescendant');
  const active = activeId ? document.getElementById(activeId) : null;
  const role = element.getAttribute('role');

  return {
    tag: `<${element.localName}${role ? ` role="${role}"` : ''}>`,
    name: getName(element),
    role: getRole(element),
    state: readState(element),
    active: active ? `${readText(active)} · ${getRole(active)}` : undefined,
  };
};

export const scanAria = (roots: Element[]) => {
  const nodes = new Map<string, AriaNode>();

  for (const element of roots.flatMap((root) => [root, ...root.querySelectorAll<Element>('*')])) {
    const attributes = [...element.attributes]
      .filter((attribute) => attribute.name.startsWith('aria-'))
      .map((attribute) => `${attribute.name}="${attribute.value}"`);
    if (attributes.length === 0 && !element.hasAttribute('role')) continue;

    const node = { tag: element.localName, role: getRole(element), attributes, count: 1 };
    const key = `${node.tag} ${node.role} ${attributes.join(' ')}`;
    const seen = nodes.get(key);
    if (seen) seen.count += 1;
    else nodes.set(key, node);
  }

  return [...nodes.values()];
};

export const toKeyLabel = (event: KeyboardEvent) => {
  if (MODIFIERS.includes(event.key)) return '';

  const main = KEY_LABELS[event.key] ?? event.key;
  const modifiers = [event.ctrlKey || event.metaKey ? 'Ctrl' : '', event.altKey ? 'Alt' : '', event.shiftKey && main.length > 1 ? 'Shift' : ''].filter(Boolean);

  return [...modifiers, main].join(' + ');
};

export const matchRows = (rows: KeyboardRow[], label: string) => {
  const exact = rows.flatMap((row, index) => row.keys.includes(label) ? [index] : []);
  if (exact.length > 0 || label.length !== 1) return exact;

  return rows.flatMap((row, index) => row.keys.some((key) => key.length === 1) ? [index] : []);
};
