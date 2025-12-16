import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UniInfoHomeScreen } from '@/screens/services/university_info/UniInfoHomeScreen';
import { NewsDetailScreen } from '@/screens/services/university_info/NewsDetailScreen';
import { colors } from '@/theme';

export type UniversityInfoStackParamList = {
    UniInfoHome: undefined;
    NewsDetail: { newsId: string; title: string };
};

const Stack = createNativeStackNavigator<UniversityInfoStackParamList>();

export const UniversityInfoNavigator = () => {
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
                name="UniInfoHome"
                component={UniInfoHomeScreen}
                options={{ title: 'University Info' }}
            />
            <Stack.Screen
                name="NewsDetail"
                component={NewsDetailScreen}
                options={{ title: 'News Detail' }}
            />
        </Stack.Navigator>
    );
};
