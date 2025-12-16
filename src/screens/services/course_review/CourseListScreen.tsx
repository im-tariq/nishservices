import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CourseReviewStackParamList } from '@/navigation/services/CourseReviewNavigator';
import { colors, spacing, typography } from '@/theme';
import { Input } from '@/components/common/Input';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<CourseReviewStackParamList, 'CourseList'>;

const MOCK_COURSES = [
    { id: '1', code: 'CS101', name: 'Intro to Computer Science', rating: 4.5, reviews: 120 },
    { id: '2', code: 'MATH201', name: 'Calculus I', rating: 3.8, reviews: 85 },
    { id: '3', code: 'PHYS102', name: 'General Physics II', rating: 4.0, reviews: 60 },
    { id: '4', code: 'ENG101', name: 'Academic English', rating: 4.8, reviews: 200 },
];

export const CourseListScreen: React.FC<Props> = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const filteredCourses = MOCK_COURSES.filter(c =>
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handlePress = (course: typeof MOCK_COURSES[0]) => {
        navigation.navigate('CourseDetail', { courseId: course.id, courseCode: course.code });
    };

    const handleAddReview = () => {
        navigation.navigate('AddReview', {});
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search course code or name..."
                    label=""
                />
            </View>

            <FlatList
                data={filteredCourses}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <Pressable style={styles.card} onPress={() => handlePress(item)}>
                        <View style={styles.ratingBox}>
                            <Text style={styles.ratingText}>{item.rating}</Text>
                            <Ionicons name="star" size={12} color={colors.textInverse} />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.code}>{item.code}</Text>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.reviews}>{item.reviews} reviews</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
                    </Pressable>
                )}
            />

            <Pressable style={styles.fab} onPress={handleAddReview}>
                <Ionicons name="create-outline" size={32} color={colors.textInverse} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.md,
        backgroundColor: colors.surface,
    },
    listContent: {
        padding: spacing.md,
        gap: spacing.md,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.md,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.accent,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 2,
        minWidth: 50,
    },
    ratingText: {
        color: colors.textInverse,
        fontWeight: 'bold',
        fontSize: typography.sizes.sm,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        gap: 2,
    },
    code: {
        fontSize: typography.sizes.sm,
        fontWeight: 'bold',
        color: colors.primary,
    },
    name: {
        fontSize: typography.sizes.base,
        color: colors.text,
        fontWeight: '600',
    },
    reviews: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
    },
    fab: {
        position: 'absolute',
        bottom: spacing.lg,
        right: spacing.lg,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
