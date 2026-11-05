import { getThemeEditorMetadata, ThemeEditorScreen } from '@/screens/ThemeEditorScreen';

export const metadata = getThemeEditorMetadata('ru');

export default function Page() {
  return <ThemeEditorScreen locale='ru' />;
}
