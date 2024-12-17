import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) 
    {
      console.log('Error: Please enter both username and password.');
      return;
    }
    setLoading(true);
    try 
    {
      const response = await axios.post('https://gamma.valuemedi.com/api/auth/login', {username,password});
      if (response.status === 200) 
      {
        console.log('Login successful! Redirecting to order page.');
        router.replace('/tabs/placeorder');
      } 
      else 
      {
        console.log('Error: Invalid credentials.');
      }
    } 
    catch (error) 
    {
      console.log('Error:', error.response || error.message);
      if (error.response) 
      {
        console.log('Error: Invalid credentials');
      } 
      else if (error.request) 
      {
        console.log('Error: Network error');
      } 
      else 
      {
        console.log('Error: An unexpected error occurred.');
      }
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ValueMedi</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Username"
        placeholderTextColor="#A5A5A5"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#A5A5A5"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => router.push('/phone-login')}>
        <Text style={styles.link}>Login with Phone Number</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.loginButtonText}>
          {loading ? 'Logging in...' : 'Login to ValueMedi'}
        </Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.footerButton}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerButton}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00BFB8',
    marginBottom: 30,
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
  link: {
    color: '#00BFB8',
    fontSize: 14,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#00BFB8',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  footerButton: {
    color: '#00BFB8',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});


// r000605
