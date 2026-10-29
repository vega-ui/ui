import { ComponentType, SVGProps } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
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

  it('renders every asset as an svg', async () => {
    const screen = await render(
      <>
        {ASSET_NAMES.map((name) => {
          const Icon = exports[name] as IconComponent;
          return <Icon key={name} data-testid={name} />;
        })}
      </>
    );

    const notSvg = ASSET_NAMES.filter((name) => screen.getByTestId(name).element().tagName !== 'svg');

    expect(notSvg).toEqual([]);
  });

  it('aliases FlagBQ to the Dutch flag', () => {
    expect(Icons.FlagBQ).toBe(Icons.FlagNL);
  });

  it('re-exports lucide icons', async () => {
    const screen = await render(<Icons.Check data-testid='check' />);

    expect(screen.getByTestId('check').element().tagName).toBe('svg');
  });
});
