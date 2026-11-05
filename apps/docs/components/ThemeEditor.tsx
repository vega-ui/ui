'use client';

import { useEffect, useId, useState, type CSSProperties } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  Meter,
  MeterTrack,
  Radio,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
  TextField,
  TextFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import { Check, Download, Link, XIcon } from '@vega-ui/icons';
import { ACCENTS } from '@/lib/accent';
import { DEFAULT_THEME, DENSITIES, exportCss, parseTheme, previewVars, RADII, RADIUS_VALUES, radiusStep, siteCss, themeQuery, type Scheme, type ThemeSettings } from '@/lib/theme';
import { CodeBlock } from './CodeBlock';
import { useDictionary } from './LocaleProvider';
import styles from './ThemeEditor.module.css';

const CLOSE_STYLE = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

const applyToSite = (settings: ThemeSettings) => {
  const root = document.documentElement;
  const step = radiusStep(settings.radius);
  const css = siteCss(settings);

  root.dataset.accent = settings.accent;
  localStorage.setItem('accent', settings.accent);
  root.dataset.radius = step ?? 'custom';
  localStorage.setItem('radius', step ?? 'custom');

  document.getElementById('site-theme')?.remove();

  if (!css) {
    localStorage.removeItem('theme-css');
    return;
  }

  const style = document.createElement('style');
  style.id = 'site-theme';
  style.textContent = css;
  document.head.append(style);
  localStorage.setItem('theme-css', css);
};

export const ThemeEditor = () => {
  const t = useDictionary();
  const e = t.themeEditor;
  const id = useId();
  const [settings, setSettings] = useState(DEFAULT_THEME);
  const [scheme, setScheme] = useState<Scheme>('light');
  const [applied, setApplied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linked = params.get('scheme');

    setSettings(parseTheme(params));

    if (linked === 'light' || linked === 'dark') {
      setScheme(linked);
      return;
    }

    if (document.documentElement.classList.contains('dark')) setScheme('dark');
  }, []);

  useEffect(() => {
    if (!applied) return;

    const timer = setTimeout(() => setApplied(false), 1500);

    return () => clearTimeout(timer);
  }, [applied]);

  const update = (patch: Partial<ThemeSettings>) => setSettings({ ...settings, ...patch });

  const apply = () => {
    applyToSite(settings);
    setApplied(true);
  };

  const css = exportCss(settings);

  const copyLink = async () => {
    const url = new URL(window.location.href);
    url.search = themeQuery(settings, scheme);
    url.hash = '';

    try {
      await navigator.clipboard.writeText(url.href);
    } catch {
      return;
    }

    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([`${css}\n`], { type: 'text/css' }));
    const link = document.createElement('a');

    link.href = url;
    link.download = 'vega-theme.css';
    link.click();
    URL.revokeObjectURL(url);
  };

  const scope = `${styles.scope} ${scheme}`;
  const vars = previewVars(settings, scheme) as CSSProperties;
  const step = radiusStep(settings.radius) ?? '';
  const customColor = `oklch(0.61 0.22 ${settings.hue})`;

  return (
    <div className={styles.editor}>
      <section aria-label={e.controls} className={styles.controls}>
        <div className={styles.group}>
          <Text id={`${id}-accent`} size={2} fontWeight={500}>{e.accent}</Text>
          <div role='radiogroup' aria-labelledby={`${id}-accent`} className={styles.swatches}>
            {ACCENTS.map((color) => (
              <Radio
                key={color}
                name={`${id}-accent`}
                value={color}
                aria-label={t.colors[color]}
                checked={settings.accent === color}
                onChange={() => update({ accent: color })}
                className={styles.swatch}
                style={{ '--swatch': `var(--color-${color}-accent-500)` } as CSSProperties}
              />
            ))}
            <Radio
              name={`${id}-accent`}
              value='custom'
              aria-label={e.custom}
              checked={settings.accent === 'custom'}
              onChange={() => update({ accent: 'custom' })}
              className={`${styles.swatch} ${styles.custom}`}
              style={{ '--swatch': customColor } as CSSProperties}
            />
          </div>
          <div className={styles.row}>
            <Label htmlFor={`${id}-hue`} className={styles.rowLabel}>{e.hue}</Label>
            <Text size={2} className={styles.value} aria-hidden='true'>{settings.hue}°</Text>
          </div>
          <Slider min={0} max={360} step={1} variant='secondary' value={settings.hue} onChangeValue={(hue: number) => update({ hue, accent: 'custom' })}>
            <SliderTrack className={styles.hueTrack} />
            <SliderThumb>
              <SliderThumbInput id={`${id}-hue`} aria-valuetext={`${settings.hue}°`} />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </div>

        <div className={styles.group}>
          <div className={styles.row}>
            <Text id={`${id}-radius`} size={2} fontWeight={500}>{e.radius}</Text>
            <Text size={2} className={styles.value}>{t.radii[step || 'custom']}</Text>
          </div>
          <SegmentedControl
            size='sm'
            variant='secondary'
            name={`${id}-radius`}
            role='radiogroup'
            aria-labelledby={`${id}-radius`}
            value={step}
            onChange={(event) => update({ radius: RADIUS_VALUES[event.target.value as keyof typeof RADIUS_VALUES] })}
          >
            {RADII.map((value) => (
              <SegmentedControlItem key={value} value={value}>
                <SegmentedControlItemInput aria-label={t.radii[value]} />
                <span className={styles.glyph} style={{ '--glyph-radius': `${RADIUS_VALUES[value] * 1.5}px` } as CSSProperties} />
              </SegmentedControlItem>
            ))}
            <SegmentedControlIndicator />
          </SegmentedControl>
          <div className={styles.row}>
            <Label htmlFor={`${id}-fine`} className={styles.rowLabel}>{e.fineRadius}</Label>
            <Text size={2} className={styles.value} aria-hidden='true'>{settings.radius}px</Text>
          </div>
          <Slider min={0} max={10} step={0.5} value={settings.radius} onChangeValue={(radius: number) => update({ radius })}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput id={`${id}-fine`} aria-valuetext={`${settings.radius}px`} />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </div>

        <div className={styles.group}>
          <Text id={`${id}-density`} size={2} fontWeight={500}>{e.density}</Text>
          <SegmentedControl
            size='sm'
            variant='secondary'
            name={`${id}-density`}
            role='radiogroup'
            aria-labelledby={`${id}-density`}
            value={settings.density}
            onChange={(event) => update({ density: event.target.value as ThemeSettings['density'] })}
          >
            {DENSITIES.map((value) => (
              <SegmentedControlItem key={value} value={value}>
                <SegmentedControlItemInput />
                {e.densities[value]}
              </SegmentedControlItem>
            ))}
            <SegmentedControlIndicator />
          </SegmentedControl>
        </div>

        <div className={styles.group}>
          <Text id={`${id}-scheme`} size={2} fontWeight={500}>{e.scheme}</Text>
          <SegmentedControl
            size='sm'
            variant='secondary'
            name={`${id}-scheme`}
            role='radiogroup'
            aria-labelledby={`${id}-scheme`}
            value={scheme}
            onChange={(event) => setScheme(event.target.value as Scheme)}
          >
            <SegmentedControlItem value='light'>
              <SegmentedControlItemInput />
              {e.light}
            </SegmentedControlItem>
            <SegmentedControlItem value='dark'>
              <SegmentedControlItemInput />
              {e.dark}
            </SegmentedControlItem>
            <SegmentedControlIndicator />
          </SegmentedControl>
        </div>

        <div className={styles.actions}>
          <Button size='sm' onClick={apply}>{applied ? e.applied : e.apply}</Button>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setSettings(DEFAULT_THEME)}>{e.reset}</Button>
        </div>
      </section>

      <section aria-label={e.preview} className={`${styles.canvas} ${scope}`} style={vars}>
        <Card size='md' appearance='outline' className={styles.card}>
          <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <div className={styles.cardHeader}>
              <Heading as='h2' size={4} fontWeight={600}>{e.card.title}</Heading>
              <Text size={2} className={styles.muted}>{e.card.description}</Text>
            </div>
            <div className={styles.field}>
              <Label htmlFor={`${id}-name`}>{e.card.name}</Label>
              <TextField>
                <TextFieldInput id={`${id}-name`} placeholder={e.card.namePlaceholder} />
              </TextField>
            </div>
            <div className={styles.field}>
              <Label htmlFor={`${id}-url`}>{e.card.url}</Label>
              <TextField>
                <TextFieldInput id={`${id}-url`} defaultValue='acme' />
                <Text size={2} className={styles.suffix}>.vega.app</Text>
              </TextField>
            </div>
            <div className={styles.field}>
              <Label htmlFor={`${id}-region`}>{e.card.region}</Label>
              <Select>
                <SelectCombobox id={`${id}-region`}>
                  <SelectValue placeholder={e.card.regionPlaceholder} />
                  <SelectIcon />
                </SelectCombobox>
                <SelectListbox>
                  {e.card.regions.map((region) => (
                    <SelectOption key={region} value={region}>{region}</SelectOption>
                  ))}
                </SelectListbox>
              </Select>
            </div>
            <div className={styles.field}>
              <Text id={`${id}-plan`} size={2} fontWeight={500}>{e.card.plan}</Text>
              <SegmentedControl name={`${id}-plan`} role='radiogroup' aria-labelledby={`${id}-plan`} defaultValue='Pro'>
                {e.card.plans.map((plan) => (
                  <SegmentedControlItem key={plan} value={plan}>
                    <SegmentedControlItemInput />
                    {plan}
                  </SegmentedControlItem>
                ))}
                <SegmentedControlIndicator />
              </SegmentedControl>
            </div>
            <div className={styles.toggle}>
              <Label htmlFor={`${id}-reports`}>{e.card.reports}</Label>
              <Switch>
                <SwitchInput id={`${id}-reports`} defaultChecked />
                <SwitchIndicator />
              </Switch>
            </div>
            <Checkbox className={styles.checkbox}>
              <CheckboxInput defaultChecked />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
              </CheckboxIndicator>
              {e.card.terms}
            </Checkbox>
            <div className={styles.buttons}>
              <Button type='button' variant='secondary' appearance='ghost'>{e.card.cancel}</Button>
              <Button type='submit'>{e.card.submit}</Button>
            </div>
          </form>
        </Card>

        <div className={styles.side}>
          <nav aria-label={e.tabs.label} className={styles.tabs}>
            {e.tabs.items.map((item, index) => (
              <Button
                key={item}
                size='sm'
                variant={index === 1 ? 'primary' : 'secondary'}
                appearance={index === 1 ? 'ghost' : 'transparent'}
                aria-current={index === 1 ? 'page' : undefined}
              >
                {item}
              </Button>
            ))}
          </nav>

          <Alert variant='warning'>
            <AlertIcon />
            <AlertMain>
              <AlertTitle>{e.alert.title}</AlertTitle>
              <AlertContent>{e.alert.description}</AlertContent>
            </AlertMain>
          </Alert>

          <div className={styles.tableWrap}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeading scope='col'>{e.table.member}</TableHeading>
                  <TableHeading scope='col'>{e.table.role}</TableHeading>
                  <TableHeading scope='col'>{e.table.status}</TableHeading>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableData>
                    <div className={styles.member}>
                      <Avatar size='sm' aria-hidden='true'><AvatarFallback>AP</AvatarFallback></Avatar>
                      <div className={styles.memberText}>
                        <Text size={2} fontWeight={500}>{e.table.name}</Text>
                        <Text size={1} className={styles.muted}>{e.table.email}</Text>
                      </div>
                    </div>
                  </TableData>
                  <TableData>{e.table.admin}</TableData>
                  <TableData><Badge size='sm' variant='success'>{e.table.active}</Badge></TableData>
                </TableRow>
                <TableRow>
                  <TableData>
                    <div className={styles.member}>
                      <Avatar size='sm' variant='secondary' aria-hidden='true'><AvatarFallback>LM</AvatarFallback></Avatar>
                      <div className={styles.memberText}>
                        <Text size={2} fontWeight={500}>{e.table.second}</Text>
                        <Text size={1} className={styles.muted}>{e.table.secondEmail}</Text>
                      </div>
                    </div>
                  </TableData>
                  <TableData>{e.table.editor}</TableData>
                  <TableData><Badge size='sm' variant='info'>{e.table.invited}</Badge></TableData>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className={styles.field}>
            <div className={styles.row}>
              <Text id={`${id}-usage`} size={2} fontWeight={500}>{e.usage.label}</Text>
              <Text size={2} className={styles.muted}>{e.usage.value}</Text>
            </div>
            <Meter value={64} max={100} valueText={e.usage.value} aria-labelledby={`${id}-usage`} fullWidth>
              <MeterTrack />
            </Meter>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost' className={styles.danger}>{e.dialog.trigger}</Button>
            </DialogTrigger>
            <DialogContent aria-labelledby={`${id}-dialog`} aria-describedby={`${id}-dialog-text`} className={scope} style={vars}>
              <div className={styles.dialogHeader}>
                <Heading id={`${id}-dialog`} as='h2' size={4} fontWeight={600}>{e.dialog.title}</Heading>
                <DialogClose asChild>
                  <IconButton aria-label={e.dialog.close} variant='secondary' appearance='ghost' style={CLOSE_STYLE}>
                    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                  </IconButton>
                </DialogClose>
              </div>
              <Text id={`${id}-dialog-text`} size={3} className={styles.muted}>{e.dialog.description}</Text>
              <div className={`${styles.buttons} ${styles.dialogActions}`}>
                <DialogClose asChild>
                  <Button variant='secondary' appearance='ghost'>{e.dialog.cancel}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>{e.dialog.confirm}</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section aria-labelledby={`${id}-css`} className={styles.export}>
        <div className={styles.exportHeader}>
          <Heading id={`${id}-css`} as='h2' size={4} fontWeight={600}>{e.css}</Heading>
          <Text size={2} className={styles.hint}>{e.cssHint}</Text>
          <div className={styles.share}>
            <Button size='xs' variant='secondary' appearance='ghost' onClick={copyLink}>
              <Icon size='xs'>{linkCopied ? <Check /> : <Link />}</Icon>
              {linkCopied ? e.linkCopied : e.copyLink}
            </Button>
            <Button size='xs' variant='secondary' appearance='ghost' onClick={download}>
              <Icon size='xs'><Download /></Icon>
              {e.download}
            </Button>
            <VisuallyHidden asChild>
              <span role='status'>{linkCopied ? e.linkCopied : ''}</span>
            </VisuallyHidden>
          </div>
        </div>
        <CodeBlock code={css} />
      </section>
    </div>
  );
};
