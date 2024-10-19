import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function FirstWelcome() {
  const router = useRouter();


  const handlePressRegister = () => {
    router.push('/register');
  };

  const handlePressLogin = () => {
    router.push('/login');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="subtitle">Selamat Datang</ThemedText>
      </View>
      <View>
        <ThemedText>Bergabunglah bersama kami</ThemedText>
        <Pressable onPress={handlePressRegister} style={styles.button}>
          <ThemedText style={styles.buttonText}>Bergabung</ThemedText>
        </Pressable>
      </View>
      <View>
        <ThemedText>Sudah punya akun?</ThemedText>
        <Pressable onPress={handlePressLogin} style={styles.button}>
          <ThemedText style={styles.buttonText}>Masuk</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

// ... styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
  },
  titleContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // gap: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});