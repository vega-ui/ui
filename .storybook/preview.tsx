import '../packages/theme/src/index.css'
import '../packages/responsive-ui/src/index.css'
import './style.css'

import { withThemeByClassName } from '@storybook/addon-themes';

const preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    })
  ],
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
  },
};

export default preview;
