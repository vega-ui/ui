'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Button, Code, SegmentedControl, SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput, TextField, TextFieldInput } from '@vega-ui/react';
import { currentValue, measure, mergeEffects, summarize, variableNames, type Effect, type VariableRow } from '@/lib/cssVars';
import { applyPreviewState, installPreviewStates, type PreviewState } from '@/lib/previewStates';
import { definingElement, resolveValue, type Resolved } from '@/lib/resolveValue';
import { PREVIEWS } from './ComponentPreviews';
import { useDictionary } from './LocaleProvider';
import styles from './VariablesInspector.module.css';

interface Box {
  label: string
  top: number
  left: number
  width: number
  height: number
}

interface VariableValueProps {
  name: string
  value: string
  resolved?: Resolved | null
  placeholder: string
  pickLabel: string
  onChange(value: string): void
}

const VariableValue = ({ name, value, resolved, placeholder, pickLabel, onChange }: VariableValueProps) => {
  const isColor = resolved?.kind === 'color' && resolved.hex;
  const alpha = resolved?.alpha ?? 1;
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  const colorHint = alpha < 1 ? `${resolved?.hex} · ${Math.round(alpha * 100)}%` : resolved?.hex;
  const hint = isColor ? colorHint : resolved?.value;

  return (
    <div className={styles.valueField}>
      <div className={styles.valueRow}>
        {isColor && (
          <span className={styles.swatch} style={{ background: resolved.value }}>
            <input
              type='color'
              aria-label={`${name}, ${pickLabel}`}
              className={styles.picker}
              value={resolved.hex}
              onChange={(event) => onChange(alpha < 1 ? `${event.target.value}${alphaHex}` : event.target.value)}
            />
          </span>
        )}
        <TextField size='sm' className={styles.input}>
          <TextFieldInput
            aria-label={name}
            spellCheck={false}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </TextField>
      </div>
      {hint && hint !== value.trim() && <span className={styles.resolved}>= {hint}</span>}
    </div>
  );
};

const renderInline = (text: string) => text.split('`').map((part, index) => index % 2 === 1 ? <Code key={index} size={2}>{part}</Code> : part);

export const VariablesInspector = ({ slug, variables }: { slug: string, variables: string }) => {
  const rows = useMemo<VariableRow[]>(() => JSON.parse(variables), [variables]);
  const t = useDictionary().cssVars;
  const scope = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const runRef = useRef(0);
  const [effects, setEffects] = useState<Record<string, Effect[]>>({});
  const [initial, setInitial] = useState<Record<string, string>>({});
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [states, setStates] = useState<PreviewState[]>(['default']);
  const [state, setState] = useState<PreviewState>('default');
  const [resolved, setResolved] = useState<Record<string, Resolved | null>>({});
  const preview = PREVIEWS[slug]?.node;

  const measureAll = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    const run = ++runRef.current;
    const queue = [...rows];

    const next = () => {
      const scene = sceneRef.current;
      if (!scene || run !== runRef.current) return;

      const running = scene.getAnimations({ subtree: true }).filter((animation) => animation instanceof CSSTransition);
      if (running.length > 0) {
        Promise.allSettled(running.map((animation) => animation.finished)).then(() => {
          frameRef.current = requestAnimationFrame(next);
        });
        return;
      }

      const row = queue.shift();
      if (!row) return;

      const found = variableNames(row.name).flatMap((name) => measure(name, scene));
      setEffects((known) => ({ ...known, [row.name]: mergeEffects(known[row.name] ?? [], found) }));
      frameRef.current = requestAnimationFrame(next);
    };

    frameRef.current = requestAnimationFrame(next);
  }, [rows]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const elements = [...scene.querySelectorAll('*')];
    const names = rows.flatMap((row) => variableNames(row.name));
    setInitial(Object.fromEntries(names.map((name) => [name, currentValue(name, elements)])));
    setStates(installPreviewStates(scene));
  }, [rows]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    applyPreviewState(scene, state);
    setEffects({});
    measureAll();

    return () => {
      cancelAnimationFrame(frameRef.current);
      applyPreviewState(scene, 'default');
    };
  }, [state, measureAll]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const elements = [...scene.querySelectorAll<HTMLElement>('*')];
    setResolved(Object.fromEntries(Object.keys(initial).map((name) => {
      const element = definingElement(name, elements);

      return [name, element ? resolveValue(edits[name] ?? initial[name], element, scene) : null];
    })));
  }, [initial, edits, state]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !active) {
      setBoxes([]);
      return;
    }

    const origin = stage.getBoundingClientRect();
    setBoxes((effects[active] ?? [])
      .filter((effect) => stage.contains(effect.element))
      .map((effect) => {
        const rect = effect.element.getBoundingClientRect();

        return { label: effect.label, top: rect.top - origin.top, left: rect.left - origin.left, width: rect.width, height: rect.height };
      })
      .filter((box) => box.width > 0 && box.height > 0));
  }, [active, effects, edits]);

  const changed = Object.entries(edits).filter(([name, value]) => value.trim() && value !== initial[name]);
  const overrides = changed.map(([name, value]) => `${name}: ${value.replace(/[;{}<>]/g, '')} !important;`).join(' ');
  const declarations = changed.map(([name, value]) => `${name}: ${value};`).join('\n');

  return (
    <div className={styles.inspector}>
      {preview && states.length > 1 && (
        <div className={styles.toolbar}>
          <SegmentedControl
            size='xs'
            name={`${scope}-state`}
            aria-label={t.state}
            value={state}
            onChange={(event) => setState(event.target.value as PreviewState)}
          >
            {states.map((item) => (
              <SegmentedControlItem key={item} value={item}>
                <SegmentedControlItemInput />
                {t.states[item]}
              </SegmentedControlItem>
            ))}
            <SegmentedControlIndicator />
          </SegmentedControl>
        </div>
      )}
      {preview && (
        <div ref={stageRef} className={styles.stage} onFocus={measureAll}>
          <style>{`[data-vars-scene='${scope}']:not([data-probing]) :is(*, *::before, *::after) { ${overrides} }`}</style>
          <div ref={sceneRef} data-vars-scene={scope} className={styles.scene}>{preview}</div>
          {boxes.map((box, index) => (
            <span key={index} aria-hidden='true' className={styles.box} style={{ top: box.top, left: box.left, width: box.width, height: box.height }}>
              <span className={styles.tag}>{box.label}</span>
            </span>
          ))}
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope='col'>{t.variable}</th>
            {preview && <th scope='col'>{t.value}</th>}
            {preview && <th scope='col'>{t.affects}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const names = variableNames(row.name);
            const editable = preview && names.length === 1;

            return (
              <tr
                key={row.name}
                data-active={active === row.name}
                className={styles.row}
                onPointerEnter={() => setActive(row.name)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(row.name)}
                onBlur={() => setActive(null)}
              >
                <td className={styles.name}>
                  <button type='button' className={styles.variable} onClick={() => navigator.clipboard.writeText(row.name)}>
                    <Code size={2}>{row.name}</Code>
                  </button>
                  <span className={styles.purpose}>{renderInline(row.purpose)}</span>
                  {row.usedBy && <span className={styles.used}>{renderInline(row.usedBy)}</span>}
                </td>
                {preview && (
                  <td className={styles.value}>
                    {editable && (
                      <VariableValue
                        name={row.name}
                        value={edits[names[0]] ?? initial[names[0]] ?? ''}
                        resolved={resolved[names[0]]}
                        placeholder={t.unset}
                        pickLabel={t.pickColor}
                        onChange={(value) => setEdits((previous) => ({ ...previous, [names[0]]: value }))}
                      />
                    )}
                    {!editable && <span className={styles.none}>—</span>}
                  </td>
                )}
                {preview && (
                  <td className={styles.affects}>
                    {names.length === 0 && <span className={styles.none}>—</span>}
                    {names.length > 0 && (effects[row.name] ?? []).length === 0 && <span className={styles.none}>{t.none}</span>}
                    {summarize(effects[row.name] ?? []).map((effect) => (
                      <span key={effect.label} className={styles.effect}>
                        <span className={styles.part}>{effect.label}</span>
                        {' '}
                        {effect.properties.join(', ')}
                      </span>
                    ))}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {preview && (
        <div className={styles.footer}>
          <p className={styles.hint}>{t.hint}</p>
          {changed.length > 0 && (
            <div className={styles.actions}>
              <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setEdits({})}>{t.reset}</Button>
              <Button size='xs' variant='secondary' appearance='ghost' onClick={() => navigator.clipboard.writeText(declarations)}>{t.copy}</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
