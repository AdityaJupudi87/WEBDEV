import React from 'react';
import { SafeAreaView } from 'react-native';
import TodoApp from './TodoApp'; 

export default function MainApp() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TodoApp />
    </SafeAreaView>
    // SafeAreaView makes sure the app is rendered within boundaries of our screen
  );
}
