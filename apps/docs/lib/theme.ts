import { ACCENTS } from './accent';

export const RADII = ['sharp', 'small', 'default', 'large', 'full'] as const;

export type RadiusStep = typeof RADII[number];

export const RADIUS_VALUES: Record<RadiusStep, number> = { sharp: 0, small: 2, default: 4, large: 6, full: 8 };

export const DENSITIES = ['compact', 'default', 'comfortable'] as const;

export type Density = typeof DENSITIES[number];

export const DENSITY_VALUES: Record<Density, number> = { compact: 1.75, default: 2, comfortable: 2.25 };

export const RATIO_VARS = [
  '--button-br-ratio',
  '--icon-button-br-ratio',
  '--input-br-ratio',
  '--textarea-br-ratio',
  '--checkbox-br-ratio',
  '--option-br-ratio',
  '--select-br-ratio',
  '--segmented-control-br-ratio',
  '--data-grid-picker-item-br-ratio',
  '--badge-border-radius-ratio',
];

const STEPS = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const LIGHTNESS = [0.97, 0.94, 0.86, 0.74, 0.68, 0.61, 0.55, 0.51, 0.41, 0.29, 0.24];

const CHROMA = [0.018, 0.04, 0.08, 0.15, 0.19, 0.22, 0.2, 0.18, 0.14, 0.08, 0.06];

const RADIUS_MULTIPLES = [1, 2, 3, 4, 5, 6, 8];

const SPACING_MULTIPLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 19, 20, 21, 22, 24, 26, 27, 28, 30, 32, 36, 40, 44, 48, 52];

export const DEFAULT_HUE = 250;

export type Scheme = 'light' | 'dark';

export interface ThemeSettings {
  accent: string
  hue: number
  radius: number
  density: Density
}

export const DEFAULT_THEME: ThemeSettings = { accent: 'blue', hue: DEFAULT_HUE, radius: RADIUS_VALUES.default, density: 'default' };

const round = (value: number) => Math.round(value * 1000) / 1000;

export const radiusRatio = (radius: number) => {
  if (radius <= 4) return round(radius / 4 * 0.333);

  return round(Math.min(0.5, 0.333 + (radius - 4) / 4 * 0.167));
};

export const radiusStep = (radius: number) => RADII.find((step) => RADIUS_VALUES[step] === radius);

const scale = (hue: number, scheme: Scheme) => {
  const colors = STEPS.map((_, index) => `oklch(${LIGHTNESS[index]} ${CHROMA[index]} ${hue})`);
  if (scheme === 'dark') return colors.reverse();

  return colors;
};

const primaryVars = (settings: ThemeSettings, scheme: Scheme): [string, string][] => {
  if (settings.accent === 'custom') {
    const colors = scale(settings.hue, scheme);

    return [...STEPS.map((step, index): [string, string] => [`--color-primary-${step}`, colors[index]]), ['--focus-color', colors[3]]];
  }

  return [
    ...STEPS.map((step): [string, string] => [`--color-primary-${step}`, `var(--color-${settings.accent}-accent-${step})`]),
    ['--focus-color', `var(--color-${settings.accent}-accent-300)`],
  ];
};

export const previewVars = (settings: ThemeSettings, scheme: Scheme) => {
  const spacing = DENSITY_VALUES[settings.density];
  const entries: [string, string | number][] = [
    ...primaryVars(settings, scheme),
    ['--radius', `${settings.radius}px`],
    ...RADIUS_MULTIPLES.map((multiple): [string, string] => [`--radius-${multiple}`, `${settings.radius * multiple}px`]),
    ['--spacing', `${spacing}px`],
    ...SPACING_MULTIPLES.map((multiple): [string, string] => [`--spacing-${multiple}`, `${round(spacing * multiple)}px`]),
    ['--theme-ratio', radiusRatio(settings.radius)],
  ];

  return Object.fromEntries(entries);
};

const block = (selector: string, entries: [string, string | number][]) => `${selector} {\n${entries.map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}`;

export const exportCss = (settings: ThemeSettings) => {
  const blocks = ['/* Vega UI theme */'];
  const root: [string, string][] = [];

  if (settings.radius !== RADIUS_VALUES.default) root.push(['--radius', `${settings.radius}px`]);
  if (settings.density !== 'default') root.push(['--spacing', `${DENSITY_VALUES[settings.density]}px`]);
  if (root.length) blocks.push(block(':root', root));

  if (settings.accent === 'custom') {
    blocks.push(block('.light', primaryVars(settings, 'light')), block('.dark', primaryVars(settings, 'dark')));
  }

  if (settings.accent !== 'custom' && settings.accent !== 'blue') {
    blocks.push(block('.light,\n.dark', primaryVars(settings, 'light')));
  }

  if (settings.radius !== RADIUS_VALUES.default) {
    blocks.push(block('[class]', RATIO_VARS.map((name) => [name, radiusRatio(settings.radius)])));
  }

  return blocks.join('\n\n');
};

export const siteCss = (settings: ThemeSettings) => {
  const blocks: string[] = [];
  const root: [string, string | number][] = [];

  if (!radiusStep(settings.radius)) {
    const ratio = radiusRatio(settings.radius);
    root.push(['--radius', `${settings.radius}px`], ['--site-br-ratio', ratio], ['--site-radius-scale', round(ratio / 0.333)]);
  }

  if (settings.density !== 'default') root.push(['--spacing', `${DENSITY_VALUES[settings.density]}px`]);
  if (root.length) blocks.push(block(':root', root));

  if (settings.accent === 'custom') {
    blocks.push(block('.light', primaryVars(settings, 'light')), block('.dark', primaryVars(settings, 'dark')));
  }

  return blocks.join('\n\n');
};

export const themeQuery = (settings: ThemeSettings, scheme: Scheme) => {
  const params = new URLSearchParams();

  if (settings.accent !== DEFAULT_THEME.accent) params.set('accent', settings.accent);
  if (settings.accent === 'custom') params.set('hue', String(settings.hue));
  if (settings.radius !== DEFAULT_THEME.radius) params.set('radius', String(settings.radius));
  if (settings.density !== DEFAULT_THEME.density) params.set('density', settings.density);
  params.set('scheme', scheme);

  return params.toString();
};

const readNumber = (value: string | null, max: number, step: number) => {
  if (!value || !/^\d+(\.\d+)?$/.test(value)) return undefined;

  const number = Number(value);
  if (number > max || number % step !== 0) return undefined;

  return number;
};

export const parseTheme = (params: URLSearchParams): ThemeSettings => {
  const accent = params.get('accent') ?? '';
  const density = DENSITIES.find((value) => value === params.get('density'));

  return {
    accent: accent === 'custom' || ACCENTS.includes(accent) ? accent : DEFAULT_THEME.accent,
    hue: readNumber(params.get('hue'), 360, 1) ?? DEFAULT_THEME.hue,
    radius: readNumber(params.get('radius'), 10, 0.5) ?? DEFAULT_THEME.radius,
    density: density ?? DEFAULT_THEME.density,
  };
};
