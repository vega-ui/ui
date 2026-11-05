export type Target = { role: string, name?: string | RegExp, nth?: number };

export type Step =
  | { focus: Target }
  | { click: Target }
  | { press: string };

export type Expectation =
  | { focused: Target }
  | { active: Target }
  | { visible: Target }
  | { hidden: Target }
  | { checked: boolean, of: Target }
  | { attr: string, of: Target, is: string | null }
  | { value: string, of: Target };

export interface Check {
  example: string
  dir?: 'ltr' | 'rtl'
  steps: Step[]
  press: string
  before?: Expectation[]
  expect: Expectation[]
}

export interface Row {
  keys: string[]
  en: string
  ru: string
  checks: Check[]
}

export type KeyboardSpec = Row[];
