import type { ArgTypes } from '@storybook/react-vite';

interface DocgenProp {
  description?: string
  defaultValue?: { value: string } | null
  type?: { name: string, raw?: string, value?: { value: string }[] }
}

interface Documented {
  displayName?: string
  __docgenInfo?: { displayName?: string, props?: Record<string, DocgenProp> }
}

const unquote = (value: string) => value.replace(/^["']|["']$/g, '');

const toControl = (type: DocgenProp['type']) => {
  if (!type) return {};
  if (type?.name === 'boolean') return { control: 'boolean' as const };
  if (type?.name === 'number') return { control: 'number' as const };
  if (type?.name === 'string') return { control: 'text' as const };
  if (type?.name === 'enum' && type.value) return { control: 'radio' as const, options: type.value.map((option) => unquote(option.value)) };

  return { control: false as const };
};

export const subcomponentArgs = <K extends string>(component: Documented, names: readonly K[]) => {
  const docgen = component.__docgenInfo;
  const category = component.displayName ?? docgen?.displayName;

  const argTypes = Object.fromEntries(names.map((name) => {
    const prop = docgen?.props?.[name];
    const summary = prop?.type?.raw ?? prop?.type?.name;

    return [name, {
      name,
      description: prop?.description,
      ...toControl(prop?.type),
      table: {
        category,
        type: summary ? { summary } : undefined,
        defaultValue: prop?.defaultValue ? { summary: prop.defaultValue.value } : undefined,
      },
    }];
  })) as ArgTypes;

  const split = <A extends Partial<Record<K, unknown>>>(args: A) => {
    const own = Object.fromEntries(names.map((name) => [name, args[name]])) as Pick<A, K>;
    const rest = Object.fromEntries(Object.entries(args).filter(([key]) => !names.includes(key as K))) as Omit<A, K>;

    return [own, rest] as const;
  };

  return { argTypes, split };
};
