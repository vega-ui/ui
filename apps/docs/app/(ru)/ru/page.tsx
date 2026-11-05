import { getHomeMetadata, HomeScreen } from '@/screens/HomeScreen';

export const metadata = getHomeMetadata('ru');

export default function Page() {
  return <HomeScreen />;
}
