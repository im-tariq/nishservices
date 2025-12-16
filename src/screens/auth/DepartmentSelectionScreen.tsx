import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/theme';
import { AuthStackParamList } from '@/navigation/types';

import { DEPARTMENTS } from '@/constants/departments';

type Props = NativeStackScreenProps<AuthStackParamList, 'DepartmentSelection'>;

export const DepartmentSelectionScreen: React.FC<Props> = ({ navigation }) => {
    const handleDepartmentSelect = (departmentName: string) => {
        navigation.navigate('ProfessorEmployeeLogin', {
            role: 'employee',
            department: departmentName,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </Pressable>
                <Text style={styles.title}>Select Department</Text>
                <Text style={styles.subtitle}>
                    Which department are you logging in for?
                </Text>
            </View>

            <FlatList
                data={DEPARTMENTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [
                            styles.card,
                            pressed && styles.cardPressed,
                        ]}
                        onPress={() => handleDepartmentSelect(item.name)}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="business-outline" size={24} color={colors.primary} />
                            </View>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    header: {
        padding: spacing.lg,
        paddingTop: spacing.md,
    },
    backButton: {
        marginBottom: spacing.md,
    },
    title: {
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: typography.sizes.base,
        color: colors.textSecondary,
    },
    listContent: {
        padding: spacing.lg,
        paddingTop: 0,
        gap: spacing.md,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.lg,
        backgroundColor: colors.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardPressed: {
        backgroundColor: colors.surface,
        borderColor: colors.primary,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: '600',
        color: colors.text,
    },
});
