'use client';

import { useCallback, useEffect, useId, useMemo, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogContent, DialogTrigger, Icon, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { BookOpen, Box, CornerDownLeft, Hash, SearchIcon } from '@vega-ui/icons';
import { localize } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import styles from './Search.module.css';

interface SearchEntry {
  group: string
  title: string
  context: string
  href: string
  summary?: string
  keywords?: string
}

interface IndexedEntry extends SearchEntry {
  folded: string
  starts: boolean[]
  keywordText: string
  rest: string
}

interface SearchResult {
  entry: IndexedEntry
  score: number
  ranges: [number, number][]
}

const GROUPS = ['components', 'sections', 'guides'];
const GROUP_LIMIT = 8;

const ICONS: Record<string, ReactNode> = {
  components: <Box />,
  sections: <Hash />,
  guides: <BookOpen />,
};

const fold = (text: string) => text.split('').map((char) => char.toLowerCase().normalize('NFD')[0]).join('');

const isWordChar = (char: string) => /[\p{L}\p{N}]/u.test(char);

const wordStarts = (text: string) => text.split('').map((char, index) => {
  if (index === 0) return true;

  const previous = text[index - 1];
  if (!isWordChar(previous)) return true;

  return char !== char.toLowerCase() && previous === previous.toLowerCase();
});

const toWords = (text: string) => ` ${fold(text).replace(/[^\p{L}\p{N}]+/gu, ' ')}`;

const stem = (word: string) => word.length < 4 ? word : word.replace(/[аеиоуыэюяь]$/, '');

const toIndexed = (entry: SearchEntry): IndexedEntry => ({
  ...entry,
  folded: fold(entry.title),
  starts: wordStarts(entry.title),
  keywordText: toWords(entry.keywords ?? ''),
  rest: toWords(`${entry.context} ${entry.summary ?? ''}`),
});

const findWordStart = (entry: IndexedEntry, word: string) => {
  let index = entry.folded.indexOf(word);

  while (index !== -1) {
    if (entry.starts[index]) return index;
    index = entry.folded.indexOf(word, index + 1);
  }

  return -1;
};

const match = (entry: IndexedEntry, words: string[]): SearchResult | null => {
  const ranges: [number, number][] = [];
  let score = 0;

  for (const word of words) {
    const index = findWordStart(entry, word);

    if (index !== -1) {
      ranges.push([index, index + word.length]);
      if (index !== 0) score += 1;
      continue;
    }

    if (entry.keywordText.includes(` ${word}`)) {
      score += 1;
      continue;
    }

    if (!entry.rest.includes(` ${word}`)) return null;
    score += 3;
  }

  if (ranges.length === 0 && entry.group !== 'components') return null;

  return { entry, score, ranges };
};

const search = (entries: IndexedEntry[], query: string) => {
  const words = fold(query).split(/\s+/).filter(Boolean).map(stem);
  if (words.length === 0) return [];

  const results = entries.flatMap((entry) => match(entry, words) ?? []);

  return GROUPS
    .map((group) => ({
      group,
      results: results
        .filter((result) => result.entry.group === group)
        .sort((a, b) => a.score - b.score || a.entry.title.length - b.entry.title.length)
        .slice(0, GROUP_LIMIT),
    }))
    .filter((group) => group.results.length > 0);
};

const highlight = (title: string, ranges: [number, number][]) => {
  const marked = title.split('').map((_, index) => ranges.some(([start, end]) => index >= start && index < end));
  const parts: ReactNode[] = [];
  let from = 0;

  for (let index = 1; index <= title.length; index++) {
    if (index < title.length && marked[index] === marked[from]) continue;

    const text = title.slice(from, index);
    parts.push(marked[from] ? <mark key={from} className={styles.mark}>{text}</mark> : text);
    from = index;
  }

  return parts;
};

const loadIndex = (locale: string) => locale === 'ru' ? import('@/generated/search.ru.json') : import('@/generated/search.en.json');

const isTyping = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
};

const subscribe = () => () => {};

const shortcutLabel = () => /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K';

export const Search = () => {
  const t = useDictionary();
  const locale = useLocale();
  const router = useRouter();
  const id = useId();
  const shortcut = useSyncExternalStore(subscribe, shortcutLabel, () => '');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [entries, setEntries] = useState<IndexedEntry[]>([]);

  useEffect(() => {
    if (!open || entries.length > 0) return;

    loadIndex(locale).then((module) => setEntries(module.default.map(toIndexed)));
  }, [open, entries.length, locale]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }

      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;

      event.preventDefault();
      setOpen(true);
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const groups = useMemo(() => search(entries, query), [entries, query]);
  const flat = groups.flatMap((group) => group.results);
  const activeId = flat.length > 0 ? `${id}-option-${active}` : undefined;

  useEffect(() => {
    if (!activeId) return;

    document.getElementById(activeId)?.scrollIntoView({ block: 'nearest' });
  }, [activeId]);

  const selectInput = useCallback((node: HTMLInputElement | null) => node?.select(), []);

  const go = (result: SearchResult) => {
    setOpen(false);
    router.push(localize(locale, result.entry.href));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (flat.length === 0) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActive((active + step + flat.length) % flat.length);
      return;
    }

    if (event.key !== 'Enter') return;

    event.preventDefault();
    go(flat[active]);
  };

  const words = query.trim();

  return (
    <Dialog open={open} onChangeOpen={setOpen}>
      <DialogTrigger asChild>
        <Button size='xs' variant='secondary' appearance='transparent' aria-label={t.search.open} aria-keyshortcuts='Meta+K Control+K /' className={styles.trigger}>
          <Icon size='xs'><SearchIcon /></Icon>
          <span className={styles.triggerLabel}>{t.search.open}</span>
          {shortcut && <kbd className={styles.shortcut}>{shortcut}</kbd>}
        </Button>
      </DialogTrigger>
      <DialogContent closedBy='any' blurred={false} aria-label={t.search.label} className={styles.dialog}>
        <TextField className={styles.field}>
          <Icon size='sm' className={styles.fieldIcon}><SearchIcon /></Icon>
          <TextFieldInput
            ref={selectInput}
            type='text'
            role='combobox'
            aria-label={t.search.label}
            aria-autocomplete='list'
            aria-expanded={flat.length > 0}
            aria-controls={`${id}-list`}
            aria-activedescendant={activeId}
            autoComplete='off'
            spellCheck={false}
            enterKeyHint='go'
            placeholder={t.search.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            className={styles.input}
          />
        </TextField>
        <div id={`${id}-list`} role='listbox' aria-label={t.search.results} className={styles.list}>
          {groups.map((group) => (
            <div key={group.group} role='group' aria-labelledby={`${id}-${group.group}`} className={styles.group}>
              <Text id={`${id}-${group.group}`} className={styles.groupLabel}>{t.search.groups[group.group]}</Text>
              {group.results.map((result) => {
                const index = flat.indexOf(result);

                return (
                  <div
                    key={result.entry.href}
                    id={`${id}-option-${index}`}
                    role='option'
                    aria-selected={index === active}
                    className={styles.option}
                    onPointerMove={() => setActive(index)}
                    onClick={() => go(result)}
                  >
                    <Icon size='xs' className={styles.optionIcon}>{ICONS[group.group]}</Icon>
                    <span className={styles.optionText}>
                      <span className={styles.optionTitle}>{highlight(result.entry.title, result.ranges)}</span>
                      <span className={styles.optionContext}>{result.entry.context}</span>
                    </span>
                    <Icon size='xs' className={styles.optionEnter}><CornerDownLeft /></Icon>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {words && flat.length === 0 && entries.length > 0 && (
          <div className={styles.state}>
            <Text className={styles.stateTitle}>{t.search.none.replace('{query}', words)}</Text>
            <Text className={styles.stateText}>{t.search.noneHint}</Text>
          </div>
        )}
        {!words && (
          <div className={styles.state}>
            <Text className={styles.stateText}>{t.search.empty}</Text>
          </div>
        )}
        <div className={styles.footer} aria-hidden='true'>
          <span><kbd className={styles.key}>↑</kbd><kbd className={styles.key}>↓</kbd>{t.search.move}</span>
          <span><kbd className={styles.key}>↵</kbd>{t.search.select}</span>
          <span><kbd className={styles.key}>esc</kbd>{t.search.close}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
