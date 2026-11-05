import type { ReactNode } from 'react';
import { DocsShell } from '@/components/DocsShell';

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsShell locale='ru'>{children}</DocsShell>;
}
