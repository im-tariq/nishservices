import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { useRole } from '@/context/RoleContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';

export const SettingsScreen = () => {
    const { setSelectedRole } = useRole();
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const handleLogout = () => {
        setSelectedRole(null);
        navigation.reset({
            index: 0,
            routes: [{ name: 'RoleSelection' }],
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                <Button label="Logout" onPress={handleLogout} variant="secondary" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: spacing.md,
        gap: spacing.lg,
    },
    title: {
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.primary,
    },
});
