'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, IconButton, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { ChevronDown, Search, X } from '@vega-ui/icons';
import { useDictionary } from './LocaleProvider';
import styles from './Sidebar.module.css';

export interface SidebarSection {
  title: string
  links: { href: string, label: string, exact?: boolean }[]
}

const STORAGE_KEY = 'docs-sidebar-closed';

export const Sidebar = ({ sections }: { sections: SidebarSection[] }) => {
  const pathname = usePathname();
  const t = useDictionary();
  const navRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [closed, setClosed] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  const isCurrent = (link: SidebarSection['links'][number]) => link.exact ? pathname === link.href : pathname.startsWith(link.href);
  const currentSection = sections.find((section) => section.links.some(isCurrent))?.title;
  const normalize = (value: string) => value.toLocaleLowerCase().replaceAll('ё', 'е');
  const needle = normalize(query.trim());
  const visible = sections
    .map((section) => ({ ...section, links: section.links.filter((link) => normalize(link.label).includes(needle)) }))
    .filter((section) => section.links.length > 0);

  useEffect(() => {
    let stored: string[] = [];
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      stored = [];
    }
    setClosed(stored.filter((title) => title !== currentSection));
    setLoaded(true);
  }, [currentSection]);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector('[aria-current="page"]');
    if (!loaded || !nav || !link) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    if (linkRect.top >= navRect.top && linkRect.bottom <= navRect.bottom) return;

    nav.scrollTop += linkRect.top - navRect.top - (navRect.height - linkRect.height) / 2;
  }, [loaded, pathname]);

  const toggle = (title: string, open: boolean) => {
    if (needle) return;
    if (open !== closed.includes(title)) return;

    const next = open ? closed.filter((item) => item !== title) : [...closed, title];
    setClosed(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      return;
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Escape' || !query) return;

    event.preventDefault();
    event.stopPropagation();
    setQuery('');
  };

  const onSummaryClick = (event: MouseEvent) => {
    if (needle) event.preventDefault();
  };

  const clear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.sidebar}>
      <TextField size='xs' className={styles.filter}>
        <Icon size='xs' className={styles.searchIcon}><Search /></Icon>
        <TextFieldInput
          ref={inputRef}
          type='search'
          value={query}
          placeholder={t.sidebar.placeholder}
          aria-label={t.sidebar.filter}
          autoComplete='off'
          spellCheck={false}
          className={styles.input}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
        />
        {query && (
          <IconButton size='xs' variant='secondary' appearance='ghost' aria-label={t.sidebar.clear} className={styles.clear} onClick={clear}>
            <Icon size='2xs'><X strokeWidth={2.5} /></Icon>
          </IconButton>
        )}
      </TextField>
      <nav ref={navRef} aria-label={t.sidebar.label} className={styles.nav} data-filtering={needle ? true : undefined}>
        {visible.map((section) => (
          <details
            key={section.title}
            className={styles.section}
            open={Boolean(needle) || !closed.includes(section.title)}
            onToggle={(event) => toggle(section.title, event.currentTarget.open)}
          >
            <summary className={styles.summary} onClick={onSummaryClick}>
              <Text fontWeight={600} className={styles.title}>{section.title}</Text>
              <Icon size='2xs' className={styles.chevron}><ChevronDown strokeWidth={2.5} /></Icon>
            </summary>
            <ul className={styles.list}>
              {section.links.map((link) => (
                <li key={link.href}>
                  <NextLink href={link.href} className={styles.link} aria-current={isCurrent(link) ? 'page' : undefined}>
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </details>
        ))}
        <div role='status' className={styles.empty}>{visible.length === 0 && t.sidebar.empty}</div>
      </nav>
    </div>
  );
};
