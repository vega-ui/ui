import { getThemeEditorMetadata, ThemeEditorScreen } from '@/screens/ThemeEditorScreen';

export const metadata = getThemeEditorMetadata('en');

export default function Page() {
  return <ThemeEditorScreen locale='en' />;
}
