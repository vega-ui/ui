import { getTemplatesMetadata, TemplatesScreen } from '@/screens/TemplatesScreen';

export const metadata = getTemplatesMetadata('ru');

export default function Page() {
  return <TemplatesScreen locale='ru' />;
}
