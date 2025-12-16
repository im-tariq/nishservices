import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MentorHomeScreen } from '@/screens/services/mentor/MentorHomeScreen';
import { MentorDetailScreen } from '@/screens/services/mentor/MentorDetailScreen';
import { colors } from '@/theme';

import { MentorStackParamList } from './mentorTypes';

const Stack = createNativeStackNavigator<MentorStackParamList>();

export const MentorNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.textInverse,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen
                name="MentorHome"
                component={MentorHomeScreen}
                options={{ title: 'Find My Mentor' }}
            />
            <Stack.Screen
                name="MentorDetail"
                component={MentorDetailScreen}
                options={{ title: 'Professor Profile' }}
            />
        </Stack.Navigator>
    );
};
