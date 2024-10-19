import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, ScrollView, Image, Modal, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

const indonesianCities = [
  'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang',
  'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi',
  // Add more cities as needed
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const pressLogin = () => {
    login();
    router.replace('/(tabs)');
  }

  const pressRegister = () => {
    router.replace('/rules');
  }

  const renderPasswordInput = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    placeholder: string,
    showPassword: boolean,
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  ) => (
    <View style={styles.inputContainer}>
      <ThemedText>{placeholder}</ThemedText>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </Pressable>
      </View>
    </View>
  );

  const isDisabledButton = () => {
    const isEmpty = email == '' || password == '';
    if(isEmpty) return true;
    else return false;
  }

  const dynamicButtonStyle = (isDisabled: boolean) => ({
    backgroundColor: isDisabled ? '#ddd' : '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center' as 'center',
    marginTop: 10,
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>      
          <Image
            source={require('@/assets/images/udang_hub_logo.png')}
            style={styles.reactLogo}
          />
          <View style={styles.inputContainer}>
            <ThemedText>E-mail</ThemedText>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email Anda"
            />
          </View>

          {renderPasswordInput(password, setPassword, "Password", showPassword, setShowPassword)}
          <View style={{flexDirection: "row", alignSelf: 'flex-end'}}>
            <ThemedText style={styles.info}>Belum punya akun?</ThemedText>
            <ThemedText style={styles.link} onPress={pressRegister}>Daftar sekarang</ThemedText>
          </View>
          <Pressable
            onPress={pressLogin}
            style={dynamicButtonStyle(isDisabledButton())}
            disabled={isDisabledButton()}
          >
            <ThemedText style={styles.buttonText}>Masuk</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    // textAlign: 'center',
  },
  link: {
    fontSize: 12,
    color: '#007AFF'
    // textAlign: 'center',
  },
  info: {
    fontSize: 12,
    marginRight: 5,
    color: '#000000'
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
  button: {
    backgroundColor:'#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    // color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  passwordMismatch: {
    borderColor: 'red',
  },
  reactLogo: {
    marginVertical: 30,
    height: 70,
    width: '100%',
    // position: 'absolute',
  },
});