import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { useOrderStore } from '@/store/orderStore';
import { useRouter } from 'expo-router';

type orderProduct = {
  id: number,
  name: string,
  quantity: number,
  price: number
}

type OrderObject = {
  id: number;
  name: string;
  phone: string;
  orders: orderProduct[]
};

export default function HomeScreen() {
  // Access orders and functions from Zustand store
  const {
    visibleCards,
    toggleCardVisibility,
    getOrdersByStatus
  } = useOrderStore();
  const router = useRouter();

  const pressDetail = (id: number) => {
    // Using query parameters in the URL to pass the data
    router.replace({
      pathname: '/(details)/order_detail',
      params: {
        id: id.toString()
      },
    });
  };

  // Render a single card with title and count
  const renderCard = (id: number, title: string, data: OrderObject[]) => {
    const isCardVisible = visibleCards.includes(id);

    return (
      <View key={id}>
        <TouchableOpacity
          style={{
            backgroundColor: '#ed1c24',
            padding: 10,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          // Toggle visibility on press
          onPress={() => toggleCardVisibility(id)}
        >
          <ThemedText style={{ color: 'white' }}>{title}</ThemedText>
          <ThemedText style={{ color: 'white' }}>{data.length}</ThemedText>
        </TouchableOpacity>
        
        {/* Show or hide additional content based on visibility state */}
        {isCardVisible && (data.length > 0 &&
          data.map((item: OrderObject) => (
            <View style={{ padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
              <TouchableOpacity onPress={() => pressDetail(item.id)}>
                <ThemedText>{item!.name}</ThemedText>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      {renderCard(0, "Belum diproses", getOrdersByStatus('ordered'))}
      {renderCard(1, "Sedang diproses", getOrdersByStatus('onProcess'))}
      {renderCard(2, "Sedang dikirim", getOrdersByStatus('onDeliver'))}
      {renderCard(3, "Sudah terkirim", getOrdersByStatus('delivered'))}
    </ScrollView>
  );
}
