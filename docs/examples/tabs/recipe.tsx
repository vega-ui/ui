import { Tabs, TabsList, TabsPanel, TabsTab, Text, type TabsProps } from '@vega-ui/react';
import type { ReactNode } from 'react';

interface MyTab {
  value: string
  label: ReactNode
  content: ReactNode
}

interface MyTabsProps extends TabsProps {
  listLabel: string
  tabs: MyTab[]
}

export function MyTabs({ listLabel, tabs, ...props }: MyTabsProps) {
  return (
    <Tabs {...props}>
      <TabsList aria-label={listLabel}>
        {tabs.map((tab) => <TabsTab key={tab.value} value={tab.value}>{tab.label}</TabsTab>)}
      </TabsList>
      {tabs.map((tab) => <TabsPanel key={tab.value} value={tab.value}>{tab.content}</TabsPanel>)}
    </Tabs>
  );
}

const productTabs: MyTab[] = [
  { value: 'description', label: 'Description', content: <Text size={3}>A merino wool sweater with a relaxed fit and ribbed cuffs.</Text> },
  { value: 'care', label: 'Care', content: <Text size={3}>Machine wash at 30 °C, dry flat, do not tumble dry.</Text> },
  { value: 'shipping', label: 'Shipping', content: <Text size={3}>Free delivery in 3–5 days, free returns within 30 days.</Text> },
];

export default function Recipe() {
  return (
    <MyTabs listLabel='Product details' tabs={productTabs} defaultValue='description' style={{ width: '100%', maxWidth: 480 }} />
  );
}
