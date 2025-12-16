import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoteHubHomeScreen } from '@/screens/services/notehub/NoteHubHomeScreen';
import { NoteDetailScreen } from '@/screens/services/notehub/NoteDetailScreen';
import { NoteUploadScreen } from '@/screens/services/notehub/NoteUploadScreen';
import { colors } from '@/theme';

export type NoteHubStackParamList = {
    NoteHubHome: undefined;
    NoteDetail: { noteId: string; title: string };
    NoteUpload: undefined;
};

const Stack = createNativeStackNavigator<NoteHubStackParamList>();

export const NoteHubNavigator = () => {
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
                name="NoteHubHome"
                component={NoteHubHomeScreen}
                options={{ title: 'NoteHub' }}
            />
            <Stack.Screen
                name="NoteDetail"
                component={NoteDetailScreen}
                options={{ title: 'Details' }}
            />
            <Stack.Screen
                name="NoteUpload"
                component={NoteUploadScreen}
                options={{ title: 'Upload Note' }}
            />
        </Stack.Navigator>
    );
};
