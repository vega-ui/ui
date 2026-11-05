export type PreviewState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'invalid';

type Pseudo = 'hover' | 'active' | 'focus' | 'invalid';

interface ForcedRule {
  css: string
  selector: string
}

const PSEUDOS: [Pseudo, RegExp][] = [
  ['hover', /:hover(?![\w-])/g],
  ['active', /:active(?![\w-])/g],
  ['focus', /:focus-visible|:focus(?![\w-])/g],
  ['invalid', /\[data-error=(['"])true\1\]/g],
];

const FORCED: Record<PreviewState, Pseudo[]> = {
  default: [],
  hover: ['hover'],
  active: ['hover', 'active'],
  focus: ['focus'],
  disabled: [],
  invalid: ['invalid'],
};

const STYLE_ID = 'preview-states';

const CONTROLS = 'input, button, select, textarea, fieldset';

const PSEUDO_ELEMENT = /::[\w-]+(\([^)]*\))?/g;

const marker = (pseudo: Pseudo) => `data-preview-${pseudo}`;

const rewrite = (selector: string) => PSEUDOS.reduce((text, [pseudo, pattern]) => text.replace(pattern, `[${marker(pseudo)}]`), selector);

const collect = (rules: CSSRuleList, wrap: (css: string) => string): ForcedRule[] => [...rules].flatMap((rule) => {
  if (rule instanceof CSSStyleRule) {
    const parts = rule.selectorText.split(/,(?![^(]*\))/).filter((part) => rewrite(part) !== part).map(rewrite);
    if (parts.length === 0) return [];

    const selector = parts.join(', ');

    return [{ css: wrap(`${selector} { ${rule.style.cssText} }`), selector }];
  }

  if (rule instanceof CSSMediaRule) return collect(rule.cssRules, (css) => wrap(`@media ${rule.conditionText} { ${css} }`));
  if (rule instanceof CSSSupportsRule) return collect(rule.cssRules, (css) => wrap(`@supports ${rule.conditionText} { ${css} }`));
  if (rule instanceof CSSLayerBlockRule) return collect(rule.cssRules, (css) => wrap(`@layer ${rule.name} { ${css} }`));

  return [];
});

const readSheet = (sheet: CSSStyleSheet) => {
  if (sheet.ownerNode instanceof Element && sheet.ownerNode.id === STYLE_ID) return [];

  try {
    return collect(sheet.cssRules, (css) => css);
  } catch {
    return [];
  }
};

const matchesInside = (scene: HTMLElement, selector: string) => {
  try {
    return scene.querySelector(selector.replace(PSEUDO_ELEMENT, '')) !== null;
  } catch {
    return false;
  }
};

export const installPreviewStates = (scene: HTMLElement): PreviewState[] => {
  const rules = [...document.styleSheets].flatMap(readSheet);
  const style = document.getElementById(STYLE_ID) ?? document.head.appendChild(Object.assign(document.createElement('style'), { id: STYLE_ID }));
  style.textContent = rules.map((rule) => rule.css).join('\n');

  const elements = [...scene.querySelectorAll('*')];
  elements.forEach((element) => PSEUDOS.forEach(([pseudo]) => element.setAttribute(marker(pseudo), '')));
  const forced = PSEUDOS
    .map(([pseudo]) => pseudo)
    .filter((pseudo) => rules.some((rule) => rule.selector.includes(marker(pseudo)) && matchesInside(scene, rule.selector)));
  elements.forEach((element) => PSEUDOS.forEach(([pseudo]) => element.removeAttribute(marker(pseudo))));

  const states: PreviewState[] = ['default'];
  if (forced.includes('hover')) states.push('hover');
  if (forced.includes('active')) states.push('active');
  if (forced.includes('focus')) states.push('focus');
  if (scene.querySelector(CONTROLS)) states.push('disabled');
  if (forced.includes('invalid')) states.push('invalid');

  return states;
};

export const applyPreviewState = (scene: HTMLElement, state: PreviewState) => {
  for (const element of scene.querySelectorAll('*')) {
    PSEUDOS.forEach(([pseudo]) => element.toggleAttribute(marker(pseudo), FORCED[state].includes(pseudo)));
  }

  for (const control of scene.querySelectorAll('[data-preview-disabled]')) {
    control.removeAttribute('disabled');
    control.removeAttribute('data-preview-disabled');
  }

  if (state === 'disabled') {
    for (const control of scene.querySelectorAll(`:is(${CONTROLS}):not([disabled])`)) {
      control.setAttribute('disabled', '');
      control.setAttribute('data-preview-disabled', '');
    }
  }
};
