import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme';

export const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.placeholder}>User Profile Details</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.md,
    },
    placeholder: {
        fontSize: typography.sizes.base,
        color: colors.textSecondary,
    },
});
