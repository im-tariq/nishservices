import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UniversityInfoStackParamList } from '@/navigation/services/UniversityInfoNavigator';
import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<UniversityInfoStackParamList, 'NewsDetail'>;

export const NewsDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { title } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imagePlaceholder}>
                <Ionicons name="image" size={64} color={colors.textInverse} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>Posted on Oct 15, 2023</Text>

                <Text style={styles.body}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    {'\n\n'}
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
    },
    imagePlaceholder: {
        height: 200,
        backgroundColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: spacing.lg,
    },
    title: {
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.xs,
    },
    date: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    body: {
        fontSize: typography.sizes.base,
        color: colors.text,
        lineHeight: 24,
    },
});
