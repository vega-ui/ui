import { getGuideMetadata, getGuideParams, GuideScreen, type GuideParams } from '@/screens/GuideScreen';

export const dynamicParams = false;

export const generateStaticParams = getGuideParams;

export const generateMetadata = ({ params }: { params: Promise<GuideParams> }) => getGuideMetadata('ru', params);

export default function Page({ params }: { params: Promise<GuideParams> }) {
  return <GuideScreen locale='ru' params={params} />;
}
