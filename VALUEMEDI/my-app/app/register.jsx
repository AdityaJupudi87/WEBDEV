import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; 
import { useRouter } from 'expo-router';

export default function Register() 
{
  const router = useRouter();
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [drugLicense, setDrugLicense] = useState(null); 
  const [agreeWhatsApp, setAgreeWhatsApp] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = () => {
    if (!ownerName || !phone || !email || !pincode) 
    {
      console.log('Error: Please fill in all required fields.');
      return;
    }

    if (!drugLicense) 
    {
      console.log('Error: Please upload your Drug License.');
      return;
    }

    if (!agreeTerms) 
    {
      console.log('Error: You must agree to the terms and conditions to register.');
      return;
    }
    
    router.replace('/login');
  };

  const handleUploadDrugLicense = async () => {
    try 
    {
      const result = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'] });

      if (result.type === 'success') 
      {
        setDrugLicense(result);
        console.log(`Success: Uploaded: ${result.name}`);
      } 
      else 
      {
        console.log('Info: File upload canceled.');
      }
    } 
    catch (error) 
    {
      console.error('Error uploading file:', error);
      console.log('Error: Could not upload the file. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Owner Name*"
        placeholderTextColor="#A5A5A5"
        value={ownerName}
        onChangeText={setOwnerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number*"
        placeholderTextColor="#A5A5A5"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email ID*"
        placeholderTextColor="#A5A5A5"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode*"
        placeholderTextColor="#A5A5A5"
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
      />
      <TextInput
        style={styles.input}
        placeholder="GST Number"
        placeholderTextColor="#A5A5A5"
        value={gstNumber}
        onChangeText={setGstNumber}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDrugLicense}>
        <Text style={styles.uploadButtonText}>
          {drugLicense ? `Uploaded: ${drugLicense.name}` : 'Upload Drug License'}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Referral or Promo Code"
        placeholderTextColor="#A5A5A5"
        value={promoCode}
        onChangeText={setPromoCode}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={agreeWhatsApp}
          onValueChange={setAgreeWhatsApp}
        />
        <Text style={styles.checkboxLabel}>
          I agree to send and receive WhatsApp notifications
        </Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={agreeTerms}
          onValueChange={setAgreeTerms}
        />
        <Text style={styles.checkboxLabel}>
          By checking this box, you are agreeing to terms and conditions
        </Text>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FDFE',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BFB8',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
  },
  uploadButton: {
    backgroundColor: '#00BFB8',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 5,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: '#00BFB8',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
