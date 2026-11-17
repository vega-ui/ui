import { Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function ProductDetails() {
  return (
    <Tabs defaultValue='description' style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Product details'>
        <TabsTab value='description'>Description</TabsTab>
        <TabsTab value='specs'>Specifications</TabsTab>
        <TabsTab value='shipping'>Shipping</TabsTab>
      </TabsList>
      <TabsPanel value='description'>
        <Text size={3}>A merino wool sweater with a relaxed fit and ribbed cuffs.</Text>
      </TabsPanel>
      <TabsPanel value='specs'>
        <Text size={3}>100% merino wool, 280 g/m², machine wash at 30 °C.</Text>
      </TabsPanel>
      <TabsPanel value='shipping'>
        <Text size={3}>Free delivery in 3–5 days, free returns within 30 days.</Text>
      </TabsPanel>
    </Tabs>
  );
}
