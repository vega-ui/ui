import type { ReactNode } from 'react';
import { getRootMetadata, RootDocument, rootViewport } from '@/components/RootDocument';

export const metadata = getRootMetadata('en');

export const viewport = rootViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument>{children}</RootDocument>;
}
