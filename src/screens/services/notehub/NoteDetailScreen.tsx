import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NoteHubStackParamList } from '@/navigation/services/NoteHubNavigator';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<NoteHubStackParamList, 'NoteDetail'>;

export const NoteDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { title } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.previewCard}>
                <Ionicons name="document" size={64} color={colors.textSecondary} />
                <Text style={styles.previewText}>Preview not available</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>
                    This document contains lecture notes covering the core concepts discussed in class.
                    Please review before the final exam.
                </Text>

                <Button label="Download File (2.4 MB)" onPress={() => { }} fullWidth />

                <Text style={styles.reportLink}>Report this content</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
    },
    previewCard: {
        height: 200,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    previewText: {
        color: colors.textSecondary,
    },
    content: {
        padding: spacing.lg,
        gap: spacing.md,
    },
    title: {
        fontSize: typography.sizes.xl,
        fontWeight: 'bold',
        color: colors.primary,
    },
    description: {
        fontSize: typography.sizes.base,
        color: colors.text,
        lineHeight: 24,
        marginBottom: spacing.md,
    },
    reportLink: {
        textAlign: 'center',
        color: colors.textSecondary,
        textDecorationLine: 'underline',
        marginTop: spacing.md,
    },
});
