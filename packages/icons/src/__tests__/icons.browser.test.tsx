import { ComponentType, SVGProps } from 'react';
import { describe, expect, it } from 'vitest';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import * as Icons from '../index';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const exports = Icons as unknown as Record<string, IconComponent | undefined>;

const pascalCase = (name: string) => name
  .split(/[^a-zA-Z0-9]+/)
  .filter(Boolean)
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join('');

const getExportName = (path: string) => {
  const [, dir, base] = path.match(/assets\/(icons|flags)\/(.+)\.svg$/) ?? [];
  if (dir === 'icons') return `${pascalCase(base)}Icon`;
  return `Flag${base.replace(/-/g, '')}`;
};

const ASSET_NAMES = Object.keys(import.meta.glob('../assets/**/*.svg')).map(getExportName);

describe('icons', () => {
  it('exports a component for every asset', () => {
    const missing = ASSET_NAMES.filter((name) => exports[name] === undefined);

    expect(ASSET_NAMES.length).toBeGreaterThan(0);
    expect(missing).toEqual([]);
  });

  describe('Edge Cases', () => {
    it('keeps the references of each flag inside its own copy when the flag is shown twice', () => {
      const flags = ASSET_NAMES.filter((name) => name.startsWith('Flag')).map((name) => exports[name]!);
      const host = document.createElement('div');
      document.body.append(host);
      const root = createRoot(host);
      flushSync(() => root.render(flags.map((Flag, index) => (
        <div key={index}>
          <div style={{ display: 'none' }}><Flag /></div>
          <Flag />
        </div>
      ))));

      const ids = [...host.querySelectorAll('[id]')].map((element) => element.id);
      const foreign = [...host.querySelectorAll('svg')].flatMap((svg) => [...svg.querySelectorAll('*')].flatMap((element) => [...element.attributes]
        .flatMap((attribute) => {
          if (attribute.name.endsWith('href')) return [attribute.value.slice(1)];

          const [, id] = attribute.value.match(/^url\(#(.+)\)$/) ?? [];
          return id === undefined ? [] : [id];
        })
        .filter((id) => host.querySelector(`[id="${id}"]`) !== null && svg.querySelector(`[id="${id}"]`) === null)));
      root.unmount();
      host.remove();

      expect(ids.length).toBeGreaterThan(0);
      expect(new Set(ids).size).toBe(ids.length);
      expect(foreign).toEqual([]);
    });
  });
});
