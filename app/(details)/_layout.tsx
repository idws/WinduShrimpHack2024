import React from 'react';
import { Stack } from 'expo-router';

export default function DetailsLayout() {
  return (
    <Stack>
      <Stack.Screen name="order_detail" options={{ headerShown: false }} />
      <Stack.Screen name="add_product" options={{ headerShown: false }} />
      <Stack.Screen name="add_stocks" options={{ headerShown: false }} />
    </Stack>
  );
}