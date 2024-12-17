import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import Login from './login';
import TabLayout from './_layout'; 

export default function App() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  const isLoggedIn = false; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) 
  {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>ValueMedi</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (<TabLayout /> ) : (<Login />)}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  splashText: {
    fontSize: 64, 
    fontWeight: 'bold',
    color: '#00BFB8',
  },
});
