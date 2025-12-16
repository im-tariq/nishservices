import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@/theme';
import { SplashScreen } from '@/screens/auth/SplashScreen';
import { RoleSelectionScreen } from '@/screens/auth/RoleSelectionScreen';
import { DepartmentSelectionScreen } from '@/screens/auth/DepartmentSelectionScreen';
import { StudentLoginScreen } from '@/screens/auth/StudentLoginScreen';
import { ProfessorEmployeeLoginScreen } from '@/screens/auth/ProfessorEmployeeLoginScreen';
import { TabNavigator } from '@/navigation/TabNavigator';
import { QueueNavigator } from '@/navigation/services/QueueNavigator';
import { NoteHubNavigator } from '@/navigation/services/NoteHubNavigator';
import { MentorNavigator } from '@/navigation/services/MentorNavigator';
import { CourseReviewNavigator } from '@/navigation/services/CourseReviewNavigator';
import { UniversityInfoNavigator } from '@/navigation/services/UniversityInfoNavigator';
import { EventsNavigator } from '@/navigation/services/EventsNavigator';
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
      <Stack.Screen name="DepartmentSelection" component={DepartmentSelectionScreen} />
      <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
      <Stack.Screen
        name="ProfessorEmployeeLogin"
        component={ProfessorEmployeeLoginScreen}
      />
      <Stack.Screen name="Dashboard" component={TabNavigator} />
      <Stack.Screen
        name="QueueService"
        component={QueueNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NoteHubService"
        component={NoteHubNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MentorService"
        component={MentorNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseReviewService"
        component={CourseReviewNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UniversityInfoService"
        component={UniversityInfoNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventsService"
        component={EventsNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

