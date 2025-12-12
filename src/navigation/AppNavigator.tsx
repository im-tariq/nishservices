import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@/theme';
import { SplashScreen } from '@/screens/auth/SplashScreen';
import { RoleSelectionScreen } from '@/screens/auth/RoleSelectionScreen';
import { StudentLoginScreen } from '@/screens/auth/StudentLoginScreen';
import { ProfessorEmployeeLoginScreen } from '@/screens/auth/ProfessorEmployeeLoginScreen';
import { DashboardPlaceholderScreen } from '@/screens/dashboard/DashboardPlaceholderScreen';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
      <Stack.Screen
        name="ProfessorEmployeeLogin"
        component={ProfessorEmployeeLoginScreen}
      />
      <Stack.Screen name="DashboardPlaceholder" component={DashboardPlaceholderScreen} />
    </Stack.Navigator>
  );
};

