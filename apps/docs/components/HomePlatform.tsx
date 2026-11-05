'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import { localize } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import { HomeTitle } from './HomeTitle';
import section from './HomeSection.module.css';
import styles from './HomePlatform.module.css';

const DEMOS = {
  dialog: { tag: 'dialog', attributes: ['open', 'closedby'], states: [':modal'] },
  popover: { tag: 'div', attributes: ['popover', 'role'], states: [':popover-open'] },
  form: { tag: 'input', attributes: ['type', 'required', 'aria-invalid'], states: [':valid', ':user-invalid'] },
};

type Demo = keyof typeof DEMOS;

interface Readout {
  tag: string
  states: { name: string, value: boolean }[]
}

const read = (element: HTMLElement | null, demo: Demo): Readout => {
  const { tag, attributes, states } = DEMOS[demo];
  if (!element) return { tag: `<${tag}>`, states: [] };

  const shown = attributes
    .filter((name) => element.hasAttribute(name))
    .map((name) => {
      const value = element.getAttribute(name);
      if (value === '') return `\n  ${name}`;

      return `\n  ${name}="${value}"`;
    });

  return {
    tag: `<${tag}${shown.join('')}>`,
    states: states.map((name) => ({ name, value: element.matches(name) })),
  };
};

export const HomePlatform = () => {
  const locale = useLocale();
  const t = useDictionary().home.platform;
  const id = useId();
  const [demo, setDemo] = useState<Demo>('dialog');
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [readout, setReadout] = useState<Readout>(() => read(null, 'dialog'));
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const refs = { dialog: open ? dialogRef : null, popover: popoverRef, form: inputRef };
    const element = refs[demo]?.current ?? null;
    const update = () => {
      const next = read(element, demo);
      setReadout((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    update();
    if (!element) return;

    const observer = new MutationObserver(update);
    observer.observe(element, { attributeFilter: DEMOS[demo].attributes });
    const events = ['toggle', 'close', 'input', 'invalid', 'focusout'];
    events.forEach((name) => element.addEventListener(name, update));

    return () => {
      observer.disconnect();
      events.forEach((name) => element.removeEventListener(name, update));
    };
  }, [demo, open]);

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.focus();
    setSent(false);
    setMessage(event.currentTarget.validationMessage);
  };

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    setSent(false);
    if (message === '') return;

    setMessage(event.currentTarget.validationMessage);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id='platform' className={`${section.section}`} aria-labelledby={`${id}-title`}>
      <div className={section.intro}>
        <Text className={section.eyebrow}>{t.eyebrow}</Text>
        <HomeTitle id={`${id}-title`} text={t.title} />
        <Text className={section.text}>{t.text}</Text>
        <NextLink href={localize(locale, '/docs/architecture/')} className={section.link}>
          {t.link}
          <Icon size='xs'><ChevronRight /></Icon>
        </NextLink>
      </div>
      <div className={`${section.frame} ${section.card}`} data-label={`<${DEMOS[demo].tag}>`}>
        <div className={styles.stage}>
          <SegmentedControl size='xs' variant='secondary' name={`${id}-demo`} role='radiogroup' aria-label={t.demos} value={demo} onChange={(event) => setDemo(event.target.value as Demo)}>
            {(Object.keys(DEMOS) as Demo[]).map((value) => (
              <SegmentedControlItem key={value} value={value}>
                <SegmentedControlItemInput />
                {t.tabs[value]}
              </SegmentedControlItem>
            ))}
            <SegmentedControlIndicator />
          </SegmentedControl>
          <div className={styles.demo}>
            {demo === 'dialog' && (
              <Dialog open={open} onChangeOpen={setOpen}>
                <DialogTrigger asChild>
                  <Button size='sm' variant='secondary' appearance='ghost'>{t.dialog.trigger}</Button>
                </DialogTrigger>
                <DialogContent ref={dialogRef} blurred={false} aria-labelledby={`${id}-dialog`}>
                  <Heading id={`${id}-dialog`} as='h3' size={4} fontWeight={600}>{t.dialog.title}</Heading>
                  <Text size={3} className={styles.dialogText}>{t.dialog.text}</Text>
                  <form method='dialog' className={styles.dialogActions}>
                    <Button type='submit' size='sm' variant='secondary' appearance='ghost'>{t.dialog.cancel}</Button>
                    <Button type='submit' size='sm'>{t.dialog.confirm}</Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            {demo === 'popover' && (
              <Popover role='dialog'>
                <PopoverTrigger asChild>
                  <Button size='sm' variant='secondary' appearance='ghost'>{t.popover.trigger}</Button>
                </PopoverTrigger>
                <PopoverContent ref={popoverRef} aria-labelledby={`${id}-popover`}>
                  <div className={styles.popover}>
                    <Heading id={`${id}-popover`} as='h3' size={5} fontWeight={600}>{t.popover.title}</Heading>
                    <Text size={2} className={styles.popoverText}>{t.popover.text}</Text>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            {demo === 'form' && (
              <form className={styles.form} onSubmit={onSubmit}>
                <Label htmlFor={`${id}-email`}>{t.form.label}</Label>
                <TextField error={message !== ''}>
                  <TextFieldInput
                    ref={inputRef}
                    id={`${id}-email`}
                    type='email'
                    required
                    autoComplete='email'
                    aria-invalid={message !== ''}
                    aria-describedby={`${id}-message`}
                    onInvalid={onInvalid}
                    onInput={onInput}
                  />
                </TextField>
                <HelperText id={`${id}-message`} error={message !== ''}>
                  {message || (sent ? t.form.sent : t.form.hint)}
                </HelperText>
                <Button type='submit' size='sm' className={styles.submit}>{t.form.submit}</Button>
              </form>
            )}
          </div>
        </div>
        <div className={section.readout}>
          <span className={section.readoutLabel}>{t.readout}</span>
          <code key={readout.tag} className={styles.tag}>{readout.tag}</code>
          {demo === 'dialog' && !open && <span className={styles.note}>{t.closed}</span>}
          {readout.states.length > 0 && (
            <dl className={section.states}>
              {readout.states.map((state) => (
                <div key={`${state.name}-${state.value}`} className={section.state}>
                  <dt>{state.name}</dt>
                  <dd data-value={state.value}>{String(state.value)}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
};
