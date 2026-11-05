import { getTemplatesMetadata, TemplatesScreen } from '@/screens/TemplatesScreen';

export const metadata = getTemplatesMetadata('en');

export default function Page() {
  return <TemplatesScreen locale='en' />;
}
