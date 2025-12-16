import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MentorStackParamList } from '@/navigation/services/mentorTypes';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<MentorStackParamList, 'MentorDetail'>;

export const MentorDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { name } = route.params;
    const [favorite, setFavorite] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{name.charAt(0)}</Text>
                </View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.title}>Associate Professor</Text>
                <Text style={styles.dept}>Computer Science Department</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.bodyText}>
                    Specializing in Artificial Intelligence and Machine Learning.
                    Focuses on student-led research and practical implementations of neural networks.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Office Hours & Location</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={20} color={colors.primary} />
                    <Text style={styles.infoText}>Block A, Room 304</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={20} color={colors.primary} />
                    <Text style={styles.infoText}>Mon-Wed: 14:00 - 16:00</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Button
                    label={favorite ? "In Favorites" : "Add to Favorites"}
                    variant={favorite ? "secondary" : "primary"}
                    onPress={() => setFavorite(!favorite)}
                    fullWidth
                />
                <Button
                    label="Send Email"
                    variant="secondary"
                    onPress={() => { }}
                    fullWidth
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
        gap: spacing.lg,
    },
    header: {
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    avatarText: {
        color: colors.textInverse,
        fontSize: 40,
        fontWeight: 'bold',
    },
    name: {
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    title: {
        fontSize: typography.sizes.base,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    dept: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
    section: {
        gap: spacing.sm,
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        color: colors.primary,
    },
    bodyText: {
        fontSize: typography.sizes.base,
        color: colors.text,
        lineHeight: 22,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    infoText: {
        fontSize: typography.sizes.base,
        color: colors.text,
        fontWeight: '500',
    },
    actions: {
        gap: spacing.md,
        marginTop: spacing.sm,
    },
});
