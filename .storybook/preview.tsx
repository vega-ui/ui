import './style.css'

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

const withDirectionAndLocale: Decorator = (Story, { globals, argTypes, args }) => {
  const { direction, locale } = globals;

  document.documentElement.dir = direction;

  if (locale) document.documentElement.lang = locale;
  else document.documentElement.removeAttribute('lang');

  if (!locale || !('locale' in argTypes)) return <Story />;

  return <Story args={{ ...args, locale }} />;
};

const preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark'
      },
      defaultTheme: 'light',
    }),
    withDirectionAndLocale,
  ],
  globalTypes: {
    direction: {
      description: 'Text direction',
      toolbar: {
        icon: 'transfer',
        dynamicTitle: true,
        items: [
          { value: 'ltr', title: 'Left to right' },
          { value: 'rtl', title: 'Right to left' },
        ],
      },
    },
    locale: {
      description: 'Locale of components with a locale prop',
      toolbar: {
        icon: 'globe',
        dynamicTitle: true,
        items: [
          { value: '', title: 'Runtime locale' },
          { value: 'en-US', title: 'English (US)' },
          { value: 'ru-RU', title: 'Русский' },
          { value: 'de-DE', title: 'Deutsch' },
          { value: 'ja-JP', title: '日本語' },
          { value: 'ar-EG', title: 'العربية' },
          { value: 'he-IL', title: 'עברית' },
          { value: 'fa-IR', title: 'فارسی' },
        ],
      },
    },
  },
  initialGlobals: {
    direction: 'ltr',
    locale: '',
  },
  parameters: {
    docs: {
      codePanel: true,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {},
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
