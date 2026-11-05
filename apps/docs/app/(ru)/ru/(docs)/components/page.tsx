import { ComponentsScreen, getComponentsMetadata } from '@/screens/ComponentsScreen';

export const metadata = getComponentsMetadata('ru');

export default function Page() {
  return <ComponentsScreen locale='ru' />;
}
