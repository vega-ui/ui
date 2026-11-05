type Styled = Element & ElementCSSInlineStyle;

export interface Resolved {
  kind: 'color' | 'length' | 'time'
  value: string
  hex?: string
  alpha?: number
}

const RESOLVERS = [
  { kind: 'color', name: '--docs-resolve-color', syntax: '<color>', initial: 'rgb(1, 2, 3)' },
  { kind: 'length', name: '--docs-resolve-length', syntax: '<length>', initial: '-12345px' },
  { kind: 'time', name: '--docs-resolve-time', syntax: '<time>', initial: '-12345s' },
] as const;

let registered = false;

let context: CanvasRenderingContext2D | null = null;

const register = () => {
  if (registered) return;

  registered = true;
  for (const resolver of RESOLVERS) {
    try {
      CSS.registerProperty({ name: resolver.name, syntax: resolver.syntax, inherits: false, initialValue: resolver.initial });
    } catch {
      continue;
    }
  }
};

const toHex = (color: string) => {
  context ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!context) return {};

  context.clearRect(0, 0, 1, 1);
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
  const hex = `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;

  return { hex, alpha: alpha / 255 };
};

export const definingElement = (name: string, elements: Styled[]) => elements.find((element) => getComputedStyle(element).getPropertyValue(name).trim());

export const resolveValue = (value: string, element: Styled, scope: HTMLElement): Resolved | null => {
  if (!value.trim()) return null;

  register();
  scope.dataset.probing = '';

  const results = RESOLVERS.map((resolver) => {
    element.style.setProperty(resolver.name, value);
    const result = getComputedStyle(element).getPropertyValue(resolver.name).trim();
    element.style.removeProperty(resolver.name);

    return result && result !== resolver.initial ? { kind: resolver.kind, value: result } : null;
  });

  scope.getBoundingClientRect();
  delete scope.dataset.probing;

  const found = results.find(Boolean);
  if (!found) return null;
  if (found.kind === 'color') return { ...found, ...toHex(found.value) };

  return found;
};
