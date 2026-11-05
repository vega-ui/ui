import { getHomeMetadata, HomeScreen } from '@/screens/HomeScreen';

export const metadata = getHomeMetadata('en');

export default function Page() {
  return <HomeScreen />;
}
