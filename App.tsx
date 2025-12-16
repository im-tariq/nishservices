import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@/navigation/AppNavigator';
import { RoleProvider } from '@/context/RoleContext';
import { QueueProvider } from '@/context/QueueContext';

export default function App() {
  return (
    <QueueProvider>
      <RoleProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </RoleProvider>
    </QueueProvider>
  );
}
