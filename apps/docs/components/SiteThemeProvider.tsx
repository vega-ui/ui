import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export const SiteThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute='class' enableColorScheme={false}>
    {children}
  </ThemeProvider>
);
