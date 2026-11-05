'use client';

import { useId, useState, type FormEvent, type SyntheticEvent } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Icon,
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import { localize } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import { HomeTitle } from './HomeTitle';
import section from './HomeSection.module.css';
import styles from './HomeAccess.module.css';

const ROLES: Record<string, string> = { checkbox: 'checkbox', range: 'slider', text: 'textbox', submit: 'button' };

type States = Record<'on' | 'off' | 'checked' | 'unchecked' | 'required' | 'empty', string>;

interface Announcement {
  tag: string
  name: string
  role: string
  state: string[]
}

const readState = (element: HTMLInputElement, role: string, states: States) => {
  if (role === 'switch') return [element.checked ? states.on : states.off];
  if (role === 'checkbox') return [element.checked ? states.checked : states.unchecked];
  if (role === 'slider') return [element.getAttribute('aria-valuetext') ?? element.value];
  if (!element.required) return [element.value || states.empty];

  return [element.value || states.empty, states.required];
};

const describe = (element: HTMLInputElement | HTMLButtonElement, states: States): Announcement => {
  const role = element.getAttribute('role') ?? ROLES[element.type];
  const attributes = ['type', 'role']
    .filter((name) => element.hasAttribute(name))
    .map((name) => ` ${name}="${element.getAttribute(name)}"`);

  return {
    tag: `<${element.localName}${attributes.join('')}>`,
    name: element.labels?.[0]?.textContent ?? element.textContent ?? '',
    role,
    state: element instanceof HTMLInputElement ? readState(element, role, states) : [],
  };
};

export const HomeAccess = () => {
  const locale = useLocale();
  const t = useDictionary().home.access;
  const id = useId();
  const [volume, setVolume] = useState(40);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  const onUpdate = (event: SyntheticEvent<HTMLFormElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLButtonElement)) return;

    setAnnouncement(describe(target, t.states));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id='access' className={section.section} aria-labelledby={`${id}-title`}>
      <div className={section.intro}>
        <Text className={section.eyebrow}>{t.eyebrow}</Text>
        <HomeTitle id={`${id}-title`} text={t.title} />
        <Text className={section.text}>{t.text}</Text>
        <NextLink href={localize(locale, '/components/switch/accessibility/')} className={section.link}>
          {t.link}
          <Icon size='xs'><ChevronRight /></Icon>
        </NextLink>
      </div>
      <div className={`${section.frame} ${section.card}`} data-label={announcement?.tag ?? '<form>'}>
        <div className={styles.stage}>
          <form className={styles.form} onFocus={onUpdate} onChange={onUpdate} onSubmit={onSubmit}>
            <div className={styles.field}>
              <Label htmlFor={`${id}-name`}>{t.form.name}</Label>
              <TextField>
                <TextFieldInput id={`${id}-name`} type='text' required autoComplete='nickname' />
              </TextField>
            </div>
            <div className={styles.row}>
              <Label htmlFor={`${id}-notifications`}>{t.form.notifications}</Label>
              <Switch>
                <SwitchInput id={`${id}-notifications`} defaultChecked />
                <SwitchIndicator />
              </Switch>
            </div>
            <Checkbox className={styles.checkbox}>
              <CheckboxInput />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
              </CheckboxIndicator>
              {t.form.digest}
            </Checkbox>
            <div className={styles.field}>
              <Label htmlFor={`${id}-volume`}>{t.form.volume}</Label>
              <Slider value={volume} onChangeValue={setVolume}>
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb>
                  <SliderThumbInput id={`${id}-volume`} aria-valuetext={`${volume}%`} />
                  <SliderThumbIndicator />
                </SliderThumb>
              </Slider>
            </div>
            <Button type='submit' size='sm' className={styles.submit}>{t.form.save}</Button>
          </form>
        </div>
        <div className={section.readout}>
          <span className={section.readoutLabel}>{t.readout}</span>
          {announcement ? (
            <>
              <q key={[announcement.name, announcement.role, ...announcement.state].join()} className={styles.speech}>
                {[announcement.name, announcement.role, ...announcement.state].join(', ')}
              </q>
              <dl className={section.states}>
                <div className={section.state}>
                  <dt>{t.name}</dt>
                  <dd>{announcement.name}</dd>
                </div>
                <div className={section.state}>
                  <dt>{t.role}</dt>
                  <dd>{announcement.role}</dd>
                </div>
                <div className={section.state}>
                  <dt>{t.state}</dt>
                  <dd>{announcement.state.join(', ') || '—'}</dd>
                </div>
              </dl>
            </>
          ) : (
            <span className={styles.hint}>{t.hint}</span>
          )}
        </div>
      </div>
    </section>
  );
};
