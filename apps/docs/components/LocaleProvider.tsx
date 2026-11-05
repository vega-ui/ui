'use client';

import { createContext, use, type ReactNode } from 'react';
import { getDictionary, type Locale } from '@/lib/i18n';

const LocaleContext = createContext<Locale>('en');

export const LocaleProvider = ({ locale, children }: { locale: Locale, children: ReactNode }) => (
  <LocaleContext value={locale}>{children}</LocaleContext>
);

export const useLocale = () => use(LocaleContext);

export const useDictionary = () => getDictionary(useLocale());
