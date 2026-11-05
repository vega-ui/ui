import { getTemplateMetadata, getTemplateParams, TemplateScreen, type TemplateParams } from '@/screens/TemplateScreen';

export const dynamicParams = false;

export const generateStaticParams = getTemplateParams;

export const generateMetadata = ({ params }: { params: Promise<TemplateParams> }) => getTemplateMetadata('ru', params);

export default function Page({ params }: { params: Promise<TemplateParams> }) {
  return <TemplateScreen locale='ru' params={params} />;
}
