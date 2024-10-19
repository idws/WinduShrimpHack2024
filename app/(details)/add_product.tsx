import React, { useState } from 'react';
import { View, StyleSheet, Platform, Image, ImageSourcePropType, TextInput, StatusBar, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import { useProductStore } from '@/store/productStore';
import * as DocumentPicker from 'expo-document-picker';

type FileObject = {
  uri: string;
  name: string;
  mimeType: string;
} | null;

export default function AddProduct() {
  // Access orders and functions from Zustand store
  const {
    addProduct
  } = useProductStore();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [source, setSource] = useState<FileObject>(null);

  const convertToImageSource = (file: FileObject): ImageSourcePropType | null => {
    if (file && file.uri) {
      return { uri: file.uri };  // Wrap the uri
    }
    return null
  };

  const handleRegister = () => {
    // Here you would typically send the registration data to your backend
    console.log('Registering:', { name, price, quantity });
    const newProduct = { id: 9, source: convertToImageSource(source), name, price, quantity: parseInt(quantity) };
    addProduct(newProduct);
    router.back();
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'], // Allow images and PDFs
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setSource({ uri: file.uri, name: file.name, mimeType: file.mimeType || '' });
      }
    } catch (err) {
      console.error('DocumentPicker Error: ', err);
    }
  };

  const dynamicButtonStyle = (isDisabled: boolean) => ({
    backgroundColor: isDisabled ? '#ddd' : '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center' as 'center',
    marginTop: 20,
  });

  const isDisabledButton = () => {
    const isEmpty = name == '' || price == '' || quantity == '';
    if(isEmpty) return true;
    else return false;
  }

  return (
    <View style={styles.safeArea}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <ScrollView style={{flex: 1, padding: 16}}>
        <View style={styles.inputContainer}>
          <ThemedText>Nama</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Masukkan nama produk"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText>Harga Produk</ThemedText>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Masukkan harga produk"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText>Jumlah Produk</ThemedText>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Masukkan jumlah produk"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText>Foto Produk</ThemedText>
          <Pressable style={styles.filePicker} onPress={pickDocument}>
            <ThemedText>{source ? source.name : `Pilih Foto Produk`}</ThemedText>
          </Pressable>
          {source && source.mimeType.startsWith('image/') && (
            <Image source={{ uri: source.uri }} style={styles.previewImage} />
          )}
        </View>

        <Pressable
          onPress={handleRegister}
          style={dynamicButtonStyle(isDisabledButton())}
          disabled={isDisabledButton()}
        >
          <ThemedText style={styles.buttonText}>Daftar</ThemedText>
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
  },
});
