import { ChangelogScreen, getChangelogMetadata } from '@/screens/ChangelogScreen';

export const metadata = getChangelogMetadata('ru');

export default function Page() {
  return <ChangelogScreen locale='ru' />;
}
