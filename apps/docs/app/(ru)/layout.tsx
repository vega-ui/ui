import type { ReactNode } from 'react';
import { getRootMetadata, LocaleDocument } from '@/components/RootDocument';

export const metadata = getRootMetadata('ru');

export default function Layout({ children }: { children: ReactNode }) {
  return <LocaleDocument locale='ru'>{children}</LocaleDocument>;
}
