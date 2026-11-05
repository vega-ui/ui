import { ComponentScreen, getComponentMetadata, getComponentParams, type ComponentParams } from '@/screens/ComponentScreen';

export const dynamicParams = false;

export const generateStaticParams = getComponentParams;

export const generateMetadata = ({ params }: { params: Promise<ComponentParams> }) => getComponentMetadata('en', params);

export default function Page({ params }: { params: Promise<ComponentParams> }) {
  return <ComponentScreen locale='en' params={params} />;
}
