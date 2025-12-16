import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@/screens/dashboard/HomeScreen';
import { NotificationsScreen } from '@/screens/dashboard/NotificationsScreen';
import { ProfileScreen } from '@/screens/dashboard/ProfileScreen';
import { SettingsScreen } from '@/screens/dashboard/SettingsScreen';
import { TabParamList } from './types';
import { colors, typography } from '@/theme';
// You might need to install @expo/vector-icons if not already available, 
// strictly speaking it is in package.json but I'll use it here.
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.primary,
                    borderTopWidth: 0,
                    // Remove fixed height and padding to allow react-navigation to handle safe areas
                    // or use Platform.select if specific tweaks are needed on Android vs iOS
                },
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Notifications') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else {
                        iconName = 'help';
                    }

                    return <Ionicons name={iconName} size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};
