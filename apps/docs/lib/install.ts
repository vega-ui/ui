const MANAGERS = [
  { manager: 'pnpm', command: 'pnpm add' },
  { manager: 'npm', command: 'npm install' },
  { manager: 'yarn', command: 'yarn add' },
  { manager: 'bun', command: 'bun add' },
];

export interface InstallVariant {
  manager: string
  code: string
}

export const getInstallVariants = (code: string): InstallVariant[] | null => {
  const packages = code.match(/^pnpm add (.+)$/)?.[1];
  if (!packages) return null;

  return MANAGERS.map(({ manager, command }) => ({ manager, code: `${command} ${packages}` }));
};
