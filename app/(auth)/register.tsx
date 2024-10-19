import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, ScrollView, Image, Modal, SafeAreaView, Platform, StatusBar } from 'react-native';
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

type FileObject = {
  uri: string;
  name: string;
  mimeType: string;
} | null;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [area, setArea] = useState(indonesianCities[0]);
  const [location, setLocation] = useState('');
  const [facePhoto, setFacePhoto] = useState<FileObject>(null);
  const [identity, setIdentity] = useState<FileObject>(null);
  const [binCard, setBinCard] = useState<FileObject>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const handleRegister = () => {
    // Here you would typically send the registration data to your backend
    console.log('Registering:', { name, area, location });
    setModalVisible(true);
  };

  const handleConfirmRegistration = () => {
    // Perform the login action
    // login();
    // Close the modal
    setModalVisible(false);
    // Navigate to the login screen
    router.replace('/login');
  };

  const pickDocument = async (setter: React.Dispatch<React.SetStateAction<FileObject>>) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'], // Allow images and PDFs
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setter({ uri: file.uri, name: file.name, mimeType: file.mimeType || '' });
      }
    } catch (err) {
      console.error('DocumentPicker Error: ', err);
    }
  };

  const renderFilePicker = (title: string, file: FileObject, setter: React.Dispatch<React.SetStateAction<FileObject>>) => (
    <View style={styles.inputContainer}>
      <ThemedText>{title}</ThemedText>
      <Pressable style={styles.filePicker} onPress={() => pickDocument(setter)}>
        <ThemedText>{file ? file.name : `Pilih ${title}`}</ThemedText>
      </Pressable>
      {file && file.mimeType.startsWith('image/') && (
        <Image source={{ uri: file.uri }} style={styles.previewImage} />
      )}
    </View>
  );

  const renderPasswordInput = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    placeholder: string,
    showPassword: boolean,
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
    isConfirmation = false
  ) => (
    <View style={styles.inputContainer}>
      <ThemedText>{placeholder}</ThemedText>
      <View style={[
        styles.passwordContainer,
        isConfirmation && password !== confirmPassword && styles.passwordMismatch
      ]}>
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
    const isEmpty = name == '' || email == '' || password == '' || location == '' || facePhoto == null || binCard == null || identity == null;
    const passwordDifferent = password != confirmPassword;
    if(isEmpty || passwordDifferent) return true;
    else return false;
  }

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>Bergabung Menjadi Mitra</ThemedText>
          
          <View style={styles.inputContainer}>
            <ThemedText>Nama</ThemedText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Masukkan nama Anda"
            />
          </View>

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
          {renderPasswordInput(confirmPassword, setConfirmPassword, "Konfirmasi Password", showConfirmPassword, setShowConfirmPassword, true)}

          <View style={styles.inputContainer}>
            <ThemedText>Daerah</ThemedText>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={area}
                onValueChange={(itemValue) => setArea(itemValue)}
                style={styles.picker}
              >
                {indonesianCities.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText>Lokasi Detail</ThemedText>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Masukkan lokasi Anda"
              multiline={true}
              numberOfLines={3} 
            />
          </View>
          {renderFilePicker('Foto Wajah', facePhoto, setFacePhoto)}
          {renderFilePicker('Identitas', identity, setIdentity)}
          {renderFilePicker('NIB', binCard, setBinCard)}

          <View style={{flexGrow: 1}} />

          <Pressable
            onPress={handleRegister}
            style={dynamicButtonStyle(isDisabledButton())}
            disabled={isDisabledButton()}
          >
            <ThemedText style={styles.buttonText}>Daftar</ThemedText>
          </Pressable>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ThemedText style={styles.modalText}>Pendaftaran Berhasil!</ThemedText>
                <ThemedText style={styles.modalText}>Tim dari Udang Hub akan datang ke lokasi Anda untuk melakukan verifikasi data. Setelah terverifikasi, Anda akan resmi menjadi partner kami.</ThemedText>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleConfirmRegistration}
                >
                  <ThemedText style={styles.textStyle}>Oke</ThemedText>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ThemedView>
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
});