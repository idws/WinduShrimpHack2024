import React, { useEffect, useState } from 'react';
import { View, Image, Platform, StyleSheet, StatusBar, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { useOrderStore } from '@/store/orderStore';
import { useLocalSearchParams } from 'expo-router';
import { useProductStore } from '@/store/productStore';

type OrderObject = {
  id: number;
  name: string;
  phone: string;
  orders: OrderProduct[];
  status: OrderStatus;
} | null;

type OrderProduct = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  productId: number;
};

type OrderStatus = "ordered" | "onProcess" | "onDeliver" | "delivered";

export default function OrderDetail() {
  // Access orders and functions from Zustand store
  const { orders, changeOrderStatus } = useOrderStore();
  const { product } = useProductStore(); 

  const { id } = useLocalSearchParams();
  const [order, setorder] = useState<OrderObject>(null);


  useEffect(() => {
    if ( id !== null) {
      const parsedId = parseInt(id.toString());
      const findProduct = orders.find((i) => i.id == parsedId)
      return findProduct && setorder(findProduct);
    }
  }, [id, orders, setorder]);

  const onChangeStatus = () => {
    let newStatus;
    switch(order?.status) { 
      case 'ordered': { 
        newStatus = 'onProcess'
        break; 
      } 
      case 'onProcess': { 
        newStatus = 'onDeliver'
        break; 
      }
      default: { 
        newStatus = 'delivered'
        break; 
      }
    }
    changeOrderStatus(order?.id || 0, newStatus as OrderStatus);
  }

  const renderProduct = (item: OrderProduct) => {
    const productOrdered = product.find((i) => i.id == item.productId)
    return (
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        {productOrdered?.source && <Image
          source={productOrdered.source}
          style={{
            height: 80,
            width: 80,
            resizeMode: 'contain'
          }}
        />}
        <View style={{marginHorizontal: 10}}>
          <ThemedText>{item.name}</ThemedText>
          <ThemedText>{item.quantity}</ThemedText>
        </View>
        <ThemedText>Rp {item.quantity * item.price}</ThemedText>
      </View>
    )
  }

  const orderStatus = () => {
    let translation;
    switch(order?.status) { 
      case 'ordered': { 
        translation = 'Belum diproses'
        break; 
      } 
      case 'onProcess': { 
        translation = 'Sedang diproses'
        break; 
      }
      case 'onDeliver': { 
        translation = 'Sedang dikirim'
        break; 
      } 
      default: { 
        translation = 'Sudah terkirim'
        break; 
      } 
   } 
   return translation;
  }

  const buttonText = () => {
    let translation;
    switch(order?.status) { 
      case 'ordered': { 
        translation = 'Proses'
        break; 
      } 
      case 'onProcess': { 
        translation = 'Kirim'
        break; 
      }
   } 
   return translation;
  }

  const showButton = order?.status == 'ordered' || order?.status == 'onProcess';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'your_background_color_here', // Match this with your app's background color
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <ScrollView style={{flex: 1, paddingHorizontal: 16, paddingTop: 16}}>
        <ThemedText>Pesanan dari {order?.name || ''}</ThemedText>
        <ThemedText style={{marginBottom: 16}}>Status Pesanan: {orderStatus()}</ThemedText>
        <ThemedText style={{marginBottom: 16}}>Detail Pesanan:</ThemedText>
        {order && order.orders.map((item) => renderProduct(item))}
        {showButton && <Pressable
          onPress={onChangeStatus}
          style={styles.button}
        >
          <ThemedText style={styles.buttonText}>{buttonText()}</ThemedText>
        </Pressable>}
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '50%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
