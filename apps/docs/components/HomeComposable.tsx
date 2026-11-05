'use client';

import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Icon,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';
import { ChevronRight, Thermometer, Volume2 } from '@vega-ui/icons';
import { localize } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import { HomeTitle } from './HomeTitle';
import section from './HomeSection.module.css';
import styles from './HomeComposable.module.css';

const DURATION = 225;

const TREE = [
  { part: 'slider', depth: 0, text: '<Slider>' },
  { part: 'track', depth: 1, text: '<SliderTrack>' },
  { part: 'range', depth: 2, text: '<SliderRange />' },
  { part: 'track', depth: 1, text: '</SliderTrack>' },
  { part: 'thumb', depth: 1, text: '<SliderThumb>' },
  { part: 'input', depth: 2, text: '<SliderThumbInput />' },
  { part: 'indicator', depth: 2, text: '<SliderThumbIndicator />' },
  { part: 'thumb', depth: 1, text: '</SliderThumb>' },
  { part: 'slider', depth: 0, text: '</Slider>' },
] as const;

type Part = typeof TREE[number]['part'];

const CALLOUTS: { part: Part, text: string }[] = [
  { part: 'slider', text: 'Slider' },
  { part: 'range', text: 'SliderRange' },
  { part: 'track', text: 'SliderTrack' },
  { part: 'thumb', text: 'SliderThumb' },
  { part: 'input', text: 'SliderThumbInput' },
  { part: 'indicator', text: 'SliderThumbIndicator' },
];

interface TileProps {
  label: string
  title: string
  code: string
  snippet: { tsx: string, css: string }
  children: ReactNode
}

const Tile = ({ label, title, code, snippet, children }: TileProps) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <figure className={`${section.frame} ${styles.tile}`}>
      <figcaption className={styles.caption}>
        <span className={styles.title}>
          {title}
          <code className={styles.class}>{label}</code>
        </span>
        <Button size='xs' variant='secondary' appearance='ghost' aria-pressed={showCode} onClick={() => setShowCode(!showCode)}>{code}</Button>
      </figcaption>
      {showCode && (
        <div tabIndex={0} className={styles.code}>
          <div dangerouslySetInnerHTML={{ __html: snippet.tsx }} />
          <div dangerouslySetInnerHTML={{ __html: snippet.css }} />
        </div>
      )}
      {!showCode && <div className={styles.stage}>{children}</div>}
    </figure>
  );
};

interface HomeComposableProps {
  snippets: { tsx: string, css: string }[]
}

export const HomeComposable = ({ snippets }: HomeComposableProps) => {
  const locale = useLocale();
  const t = useDictionary().home.composable;
  const id = useId();
  const [part, setPart] = useState<Part | null>(null);
  const [level, setLevel] = useState(60);
  const [progress, setProgress] = useState(83);
  const [size, setSize] = useState(3);
  const [temperature, setTemperature] = useState(21);
  const [control, music, settings, home] = t.items;
  const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  const hover = (target: Part) => ({
    onMouseEnter: () => setPart(target),
    onMouseLeave: () => setPart(null),
    onFocus: () => setPart(target),
    onBlur: () => setPart(null),
  });

  return (
    <section id='composable' className={`${section.section}`} aria-labelledby={`${id}-title`}>
      <div className={section.intro}>
        <Text className={section.eyebrow}>{t.eyebrow}</Text>
        <HomeTitle id={`${id}-title`} text={t.title} />
        <Text className={section.text}>{t.text}</Text>
        <NextLink href={localize(locale, '/docs/styling/')} className={section.link}>
          {t.link}
          <Icon size='xs'><ChevronRight /></Icon>
        </NextLink>
      </div>
      <div className={`${section.frame} ${section.card}`} data-label='@vega-ui/react/Slider'>
        <div className={styles.anatomy} data-part={part ?? undefined}>
          <div className={styles.diagram} style={{ '--level': level } as CSSProperties}>
            {CALLOUTS.map((callout) => (
              <button
                key={callout.part}
                type='button'
                className={styles.callout}
                data-part={callout.part}
                data-active={part === callout.part}
                {...hover(callout.part)}
              >
                {callout.text}
              </button>
            ))}
            <Slider value={level} onChangeValue={setLevel} className={styles.partSlider}>
              <SliderTrack className={styles.partTrack}>
                <SliderRange className={styles.partRange} />
              </SliderTrack>
              <SliderThumb>
                <SliderThumbInput aria-label={control.label} />
                <SliderThumbIndicator className={styles.partIndicator} />
              </SliderThumb>
            </Slider>
          </div>
        </div>
        <div className={section.readout}>
          <span className={section.readoutLabel}>{t.anatomy}</span>
          <ul className={styles.tree}>
            {TREE.map((line, index) => (
              <li key={index}>
                <button
                  type='button'
                  className={styles.line}
                  data-active={part === line.part}
                  style={{ paddingInlineStart: `calc(${line.depth} * 2ch)` }}
                  {...hover(line.part)}
                >
                  {line.text}
                </button>
              </li>
            ))}
          </ul>
          <Text className={styles.description}>{part ? t.parts[part] : t.hint}</Text>
        </div>
      </div>
      <div className={styles.grid}>
        <Tile label='.sound' title={control.title} code={t.code} snippet={snippets[0]}>
          <div className={styles.module}>
            <span className={styles.moduleTitle}>{control.caption}</span>
            <Slider defaultValue={60} className={styles.apple}>
              <SliderTrack>
                <SliderRange className={styles.appleRange} />
                <Icon size='xs' className={styles.appleIcon}><Volume2 /></Icon>
              </SliderTrack>
              <SliderThumb>
                <SliderThumbInput aria-label={control.label} />
                <SliderThumbIndicator />
              </SliderThumb>
            </Slider>
          </div>
        </Tile>

        <Tile label='.scrubber' title={music.title} code={t.code} snippet={snippets[1]}>
          <div className={styles.module}>
            <div className={styles.nowPlaying}>
              <span className={styles.artwork} />
              <span className={styles.song}>
                {music.caption}
                <span className={styles.artist}>Neon Coast</span>
              </span>
            </div>
            <Slider max={DURATION} value={progress} onChangeValue={setProgress} className={styles.music}>
              <SliderTrack className={styles.musicTrack}>
                <SliderRange />
              </SliderTrack>
              <SliderThumb>
                <SliderThumbInput aria-label={music.label} aria-valuetext={time(progress)} />
                <SliderThumbIndicator className={styles.musicThumb} />
              </SliderThumb>
            </Slider>
            <div className={styles.times} aria-hidden>
              <span>{time(progress)}</span>
              <span>{`-${time(DURATION - progress)}`}</span>
            </div>
          </div>
        </Tile>

        <Tile label='.steps' title={settings.title} code={t.code} snippet={snippets[2]}>
          <div className={styles.module}>
            <span className={styles.sample} style={{ fontSize: 12 + size * 2 }}>{settings.caption}</span>
            <div className={styles.textSize}>
              <span className={styles.small} aria-hidden>A</span>
              <Slider max={6} value={size} onChangeValue={setSize} className={styles.settings}>
                <SliderTrack className={styles.steps}>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb>
                  <SliderThumbInput aria-label={settings.label} />
                  <SliderThumbIndicator />
                </SliderThumb>
              </Slider>
              <span className={styles.large} aria-hidden>A</span>
            </div>
          </div>
        </Tile>

        <Tile label='.home' title={home.title} code={t.code} snippet={snippets[3]}>
          <div className={styles.home}>
            <div className={styles.homeInfo}>
              <Icon className={styles.thermometer}><Thermometer /></Icon>
              <span className={styles.homeCaption}>{home.caption}</span>
              <span className={styles.homeTemp}>{`${temperature}°`}</span>
            </div>
            <Slider orientation='vertical' min={10} max={30} value={temperature} onChangeValue={setTemperature} className={styles.homeSlider}>
              <SliderTrack className={styles.homeTrack}>
                <SliderRange className={styles.homeRange} />
              </SliderTrack>
              <SliderThumb>
                <SliderThumbInput aria-label={home.label} aria-valuetext={`${temperature}°C`} />
                <SliderThumbIndicator className={styles.homeThumb} />
              </SliderThumb>
            </Slider>
          </div>
        </Tile>
      </div>
    </section>
  );
};
