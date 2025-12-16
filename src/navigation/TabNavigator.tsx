import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { HomeScreen } from '@/screens/dashboard/HomeScreen';
import { NotificationsScreen } from '@/screens/dashboard/NotificationsScreen';
import { ProfileScreen } from '@/screens/dashboard/ProfileScreen';
import { SettingsScreen } from '@/screens/dashboard/SettingsScreen';
import { TabParamList } from './types';
import { colors, spacing } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarTransparent: true,
                tabBarStyle: styles.tabBar,
                tabBarBackground: () => (
                    Platform.OS === 'web' ? (
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(30, 30, 30, 0.9)' }]} />
                    ) : (
                        <BlurView
                            tint="dark"
                            intensity={85}
                            style={StyleSheet.absoluteFill}
                        />
                    )
                ),
                tabBarActiveTintColor: colors.textInverse, // White for contrast on dark blur
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                tabBarShowLabel: true,
                tabBarLabelStyle: styles.tabLabel,
                tabBarIcon: ({ focused, color }) => {
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

                    return (
                        <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                            <Ionicons name={iconName} size={22} color={color} />
                        </View>
                    );
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

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 25 : 20,
        left: 20,
        right: 20,
        height: 65,
        borderRadius: 35,
        overflow: 'hidden', // Required for BlurView borderRadius to work on Android/some iOS cases
        borderTopWidth: 0,
        elevation: 0,
        backgroundColor: 'transparent', // Important for BlurView
        ...spacing.shadows.lg,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 8,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    iconContainerFocused: {
        transform: [{ scale: 1.1 }],
    },
});
