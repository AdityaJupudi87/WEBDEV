import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="tabs/placeorder" options={{ title: 'PlaceOrder' }} />
      <Tabs.Screen name="tabs/all-orders" options={{ title: 'All Orders' }} />
      <Tabs.Screen name="tabs/viewcart" options={{ title: 'View Cart' }} />
    </Tabs>
  );
}