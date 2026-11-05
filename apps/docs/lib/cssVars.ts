export interface VariableRow {
  name: string
  usedBy: string
  purpose: string
}

export interface Effect {
  element: Element
  label: string
  properties: string[]
}

type Styled = Element & ElementCSSInlineStyle;

type Snapshot = Record<string, string>[];

const PSEUDOS = ['', '::before', '::after'];

const LOGICAL = /(^|-)(inline|block|start|end)(-|$)/;

const SIDES = /-(top|right|bottom|left)/g;

const DERIVED = ['transform-origin', 'perspective-origin', 'grid-template-rows', 'grid-template-columns'];

const RANGE = /^(--[a-z0-9-]+-)(\d+) \.\.\. --[a-z0-9-]+-(\d+)$/;

export const variableNames = (text: string) => (text.match(/--[a-z0-9-]*[a-z0-9](?![\w*-])(?: \.\.\. --[a-z0-9-]+)?/g) ?? []).flatMap((match) => {
  const range = match.match(RANGE);
  if (!range) return [match.split(' ')[0]];

  const [, prefix, from, to] = range;

  return Array.from({ length: Number(to) - Number(from) + 1 }, (_, index) => `${prefix}${Number(from) + index}`);
});

export const currentValue = (name: string, elements: Element[]) => elements
  .map((element) => getComputedStyle(element).getPropertyValue(name).trim())
  .find(Boolean) ?? '';

const probeValue = (name: string, value: string) => {
  if (CSS.supports('color', value)) return 'rgb(255, 0, 170)';
  if (!value && /color|background|fill|stroke/.test(name)) return 'rgb(255, 0, 170)';
  if (/^-?[\d.]+m?s$/.test(value)) return '1234ms';
  if (/^\d+$/.test(value)) return value === '100' ? '200' : '100';
  if (/^-?[\d.]+$/.test(value)) return value === '0.37' ? '0.5' : '0.37';
  if (!value || CSS.supports('width', value)) return '13px';

  return 'fantasy';
};

export const mergeEffects = (known: Effect[], found: Effect[]) => {
  const merged = new Map(known.map((effect) => [effect.element, effect]));

  for (const effect of found) {
    const previous = merged.get(effect.element);
    const properties = previous ? [...new Set([...previous.properties, ...effect.properties])] : effect.properties;
    merged.set(effect.element, { ...effect, properties });
  }

  return [...merged.values()];
};

export const summarize = (effects: Effect[]) => {
  const parts = new Map<string, Set<string>>();

  for (const effect of effects) {
    parts.set(effect.label, new Set([...(parts.get(effect.label) ?? []), ...effect.properties]));
  }

  return [...parts].map(([label, properties]) => ({ label, properties: [...properties] }));
};

const readStyle = (element: Element, pseudo: string) => {
  const style = getComputedStyle(element, pseudo || null);
  const values: Record<string, string> = {};

  if (pseudo && (style.content === 'none' || style.content === 'normal')) return values;

  for (const property of style) {
    if (!property.startsWith('--')) values[property] = style.getPropertyValue(property);
  }

  return values;
};

const snapshot = (elements: Element[]): Snapshot[] => elements.map((element) => PSEUDOS.map((pseudo) => readStyle(element, pseudo)));

const partName = (element: Element) => [...element.classList]
  .map((name) => name.match(/^_([a-z][a-zA-Z]*)_/)?.[1])
  .find(Boolean);

const changedProperties = (before: Record<string, string>, after: Record<string, string>) => {
  const changed = Object.keys(after).filter((property) => before[property] !== after[property] && !LOGICAL.test(property) && !DERIVED.includes(property));
  const followsColor = (property: string) => property !== 'color' && changed.includes('color') && after[property] === after.color && before[property] === before.color;

  return [...new Set(changed.filter((property) => !followsColor(property)).map((property) => property.replace(SIDES, '')))];
};

export const measure = (name: string, scope: HTMLElement): Effect[] => {
  const elements = [...scope.querySelectorAll<Styled>('*')];
  const previous = elements.map((element) => element.style.getPropertyValue(name));
  const probe = probeValue(name, currentValue(name, elements));

  scope.dataset.probing = '';
  const before = snapshot(elements);
  elements.forEach((element) => element.style.setProperty(name, probe));
  const after = snapshot(elements);
  elements.forEach((element, index) => {
    if (previous[index]) element.style.setProperty(name, previous[index]);
    else element.style.removeProperty(name);
  });
  scope.getBoundingClientRect();
  delete scope.dataset.probing;

  return elements.flatMap((element, index) => PSEUDOS.flatMap((pseudo, slot) => {
    const part = partName(element);
    if (!part) return [];

    const parent = element.parentElement ? elements.indexOf(element.parentElement as Styled) : -1;
    const inherited = (property: string) => parent !== -1 && slot === 0 && after[parent][0][property] === after[index][0][property] && before[parent][0][property] !== after[parent][0][property];
    const properties = changedProperties(before[index][slot], after[index][slot]).filter((property) => !inherited(property));

    return properties.length > 0 ? [{ element, label: `${part}${pseudo}`, properties }] : [];
  }));
};
