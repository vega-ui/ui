import type { ReactNode } from 'react';
import { LocaleDocument } from '@/components/RootDocument';

export default function Layout({ children }: { children: ReactNode }) {
  return <LocaleDocument locale='en'>{children}</LocaleDocument>;
}
