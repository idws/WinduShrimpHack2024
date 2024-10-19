import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Image, ImageSourcePropType, TextInput, StatusBar, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import { useProductStore } from '@/store/productStore';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';

export default function AddProduct() {
  const { product, addStock } = useProductStore(); // Destructure both product and addStock

  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (product.length > 0 && productId === 0) {
      setProductId(product[0].id);
    }
  }, [product, productId]);

  const handleAddStock = () => {
    if (productId && quantity) {
      const quantityToAdd = parseInt(quantity);
      addStock(productId, quantityToAdd);
      
      // Log the change
      console.log('Added stock:', productId, quantityToAdd);
      console.log('Updated product:', product.find(p => p.id === productId));
      
      // Force a re-render
      forceUpdate({});
      
      // Navigate back
      router.back();
    }
  };

  const isDisabledButton = !productId || !quantity;

  const dynamicButtonStyle = (isDisabled: boolean) => ({
    backgroundColor: isDisabled ? '#ddd' : '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center' as 'center',
    marginTop: 20,
  });

  return (
    <View style={styles.safeArea}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <ScrollView style={{flex: 1, padding: 16}}>
        <View style={styles.inputContainer}>
          <ThemedText>Product</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={productId}
              onValueChange={(itemValue) => setProductId(itemValue)}
              style={styles.picker}
            >
              {product.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <ThemedText>Quantity</ThemedText>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter product quantity"
            keyboardType="numeric"
          />
        </View>

        <Pressable
          onPress={handleAddStock}
          style={dynamicButtonStyle(isDisabledButton)}
          disabled={isDisabledButton}
        >
          <ThemedText style={styles.buttonText}>Add Stock</ThemedText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'your_background_color_here', // Match this with your app's background color
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    // textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  filePicker: {
    backgroundColor: '#e1e1e1',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  previewImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },pickerContainer: {
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});
