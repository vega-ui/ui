'use client';

import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Icon } from '@vega-ui/react';
import { ArrowLeft, ArrowRight } from '@vega-ui/icons';
import { isPageShortcut } from '@/lib/shortcuts';
import { useDictionary } from './LocaleProvider';
import styles from './Pager.module.css';

interface PagerLink {
  href: string
  label: string
}

interface PagerProps {
  label: string
  previous?: PagerLink
  next?: PagerLink
}

export const Pager = ({ label, previous, next }: PagerProps) => {
  const t = useDictionary();
  const router = useRouter();
  const previousHref = previous?.href;
  const nextHref = next?.href;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey || !isPageShortcut(event)) return;

      const hrefs: Record<string, string | undefined> = { BracketLeft: previousHref, BracketRight: nextHref };
      const href = hrefs[event.code];
      if (!href) return;

      event.preventDefault();
      router.push(href);
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [router, previousHref, nextHref]);

  return (
    <nav aria-label={label} className={styles.pager}>
      {previous && (
        <Button asChild size='sm' variant='secondary' appearance='ghost'>
          <NextLink href={previous.href} aria-keyshortcuts='[' aria-label={`${t.doc.previous}: ${previous.label}`}>
            <Icon size='xs'><ArrowLeft /></Icon>
            {previous.label}
          </NextLink>
        </Button>
      )}
      {next && (
        <Button asChild size='sm' variant='secondary' appearance='ghost' className={styles.next}>
          <NextLink href={next.href} aria-keyshortcuts=']' aria-label={`${t.doc.next}: ${next.label}`}>
            {next.label}
            <Icon size='xs'><ArrowRight /></Icon>
          </NextLink>
        </Button>
      )}
    </nav>
  );
};
