import { View, StyleSheet, Pressable, Alert, Platform, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { ScrollView } from 'react-native-gesture-handler';

export default function Rules() {
  const router = useRouter();
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
    })
  })

  const handlePress = () => {
    router.push('/(auth)/register');
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
        </View>
        <View style={{flexGrow: 1}}>
          <View style={{backgroundColor: '#ffffff', paddingVertical: 40, paddingHorizontal: 10, borderRadius: 30}}>
            <ThemedText type="subtitle" style={{alignSelf: 'center', marginBottom: 20}}>Bergabunglah Bersama Kami</ThemedText>
            <ThemedText style={styles.sectionTitle}>Syarat dan ketentuan:</ThemedText>
            <View style={styles.list}>
              <ThemedText style={styles.listItem}>• Mengisi form dan melengkapi persyaratan</ThemedText>
              <ThemedText style={styles.listItem}>• Mempunyai Freezer dan armada untuk antar</ThemedText>
              <ThemedText style={styles.listItem}>• Mempunyai Warung/Toko/Space</ThemedText>
              <ThemedText style={styles.listItem}>• Menandatangai MOU kesepakatan</ThemedText>
            </View>
            <ThemedText style={styles.sectionTitle}>Keuntungan:</ThemedText>
            <View style={styles.list}>
              <ThemedText style={styles.listItem}>• Promosi lokasi Hub ke semua medsos</ThemedText>
              <ThemedText style={styles.listItem}>• Mendapat Freezer (untuk tier tertentu)</ThemedText>
              <ThemedText style={styles.listItem}>• Mendapat Pelatihan</ThemedText>
              <ThemedText style={styles.listItem}>• Mendapat akun Hub Seller</ThemedText>
              <ThemedText style={styles.listItem}>• Insentif yang menarik</ThemedText>
              <ThemedText style={styles.listItem}>• Bisa dikerjakan dari rumah</ThemedText>
            </View>
          </View>
        </View>
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <Image
            source={require('@/assets/images/small_logo.png')}
            style={styles.reactLogo}
          />
        </View>
        <Pressable onPress={handlePress} style={styles.button}>
          <ThemedText style={styles.buttonText}>Bergabung</ThemedText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

// ... styles
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#007AFF'
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#007AFF', // Match this with your app's background color
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    marginBottom: 16
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  reactLogo: {
    marginVertical: 30,
    height: 140,
    width: '100%'
  },
});