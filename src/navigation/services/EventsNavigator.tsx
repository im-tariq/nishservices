import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventsHomeScreen } from '@/screens/services/events/EventsHomeScreen';
import { EventDetailScreen } from '@/screens/services/events/EventDetailScreen';
import { colors } from '@/theme';
import { EventsStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<EventsStackParamList>();

export const EventsNavigator = () => {
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
                name="EventsHome"
                component={EventsHomeScreen}
                options={{ title: 'Campus Events' }}
            />
            <Stack.Screen
                name="EventDetail"
                component={EventDetailScreen}
                options={{ title: 'Event Details' }}
            />
        </Stack.Navigator>
    );
};
