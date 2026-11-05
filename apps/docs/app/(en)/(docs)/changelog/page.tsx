import { ChangelogScreen, getChangelogMetadata } from '@/screens/ChangelogScreen';

export const metadata = getChangelogMetadata('en');

export default function Page() {
  return <ChangelogScreen locale='en' />;
}
