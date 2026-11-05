import { ComponentsScreen, getComponentsMetadata } from '@/screens/ComponentsScreen';

export const metadata = getComponentsMetadata('en');

export default function Page() {
  return <ComponentsScreen locale='en' />;
}
