import React from 'react';
import { View, StyleSheet, TextInput, Pressable, ScrollView, Image, Modal, SafeAreaView, ImageSourcePropType, StatusBar, Platform, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useProductStore } from '@/store/productStore';
import { router } from 'expo-router';

type product = {
  id: number,
  source: ImageSourcePropType | null,
  name: string,
  price: string,
  quantity: number
}

export default function TabTwoScreen() {

  const {
    product
  } = useProductStore();

  const addProduct = () => {
    router.push('/(details)/add_product');
  };

  const addStocks = () => {
    router.push('/(details)/add_stocks');
  };

  const productCard = (item: product) => {
    return(
      <View style={{borderWidth: 1, borderColor: '#0d0d0d', borderRadius: 10, padding: 10, marginBottom: 16}}>
        <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          {item.source && <Image
            source={item.source}
            style={styles.reactLogo}
          />}
          <View style={{marginLeft: 10}}>
            <ThemedText>Nama Produk: {item.name || '-'}</ThemedText>
            <ThemedText>Harga: {item.price || '-'}</ThemedText>
            <ThemedText>Jumlah Produk: {item.quantity || 0}</ThemedText>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.safeArea}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <ScrollView style={{padding: 16}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16}}>
          <Button title="Tambah Produk Baru" onPress={addProduct} />
          <Button title="Tambah Stok Produk" onPress={addStocks} />
        </View>
        {product.map((item: product) => productCard(item))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 80,
    width: 80,
    resizeMode: 'contain'
    // position: 'absolute',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
})
