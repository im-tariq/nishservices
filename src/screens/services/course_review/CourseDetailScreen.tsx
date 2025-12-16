import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CourseReviewStackParamList } from '@/navigation/services/CourseReviewNavigator';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<CourseReviewStackParamList, 'CourseDetail'>;

const MOCK_REVIEWS = [
    { id: '1', rating: 5, comment: 'Great course! Learned a lot about algorithms.', author: 'Anonymous', date: '2 days ago' },
    { id: '2', rating: 3, comment: 'Difficult assignments but fair grading.', author: 'John Doe', date: '1 week ago' },
    { id: '3', rating: 4, comment: 'Professor is very helpful.', author: 'Jane Smith', date: '2 weeks ago' },
];

export const CourseDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { courseCode } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{courseCode}</Text>
                <Text style={styles.subtitle}>Intro to Computer Science</Text>
                <View style={styles.overallRating}>
                    <Text style={styles.ratingBig}>4.5</Text>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <Ionicons key={i} name={i <= 4 ? "star" : "star-half"} size={20} color={colors.accent} />
                        ))}
                    </View>
                    <Text style={styles.reviewsCount}>based on 120 reviews</Text>
                </View>
                <Button
                    label="Write a Review"
                    variant="secondary"
                    onPress={() => navigation.navigate('AddReview', { courseCode })}
                    fullWidth
                />
            </View>

            <FlatList
                data={MOCK_REVIEWS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardStars}>
                                {[...Array(item.rating)].map((_, i) => (
                                    <Ionicons key={i} name="star" size={14} color={colors.accent} />
                                ))}
                            </View>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                        <Text style={styles.comment}>{item.comment}</Text>
                        <Text style={styles.author}>— {item.author}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.lg,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: 'center',
        gap: spacing.sm,
    },
    title: {
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.primary,
    },
    subtitle: {
        fontSize: typography.sizes.lg,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    overallRating: {
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    ratingBig: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.text,
    },
    stars: {
        flexDirection: 'row',
        gap: 2,
    },
    reviewsCount: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        marginTop: 4,
    },
    listContent: {
        padding: spacing.md,
        gap: spacing.md,
    },
    reviewCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.sm,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardStars: {
        flexDirection: 'row',
        gap: 1,
    },
    date: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
    },
    comment: {
        fontSize: typography.sizes.base,
        color: colors.text,
        lineHeight: 20,
    },
    author: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        fontStyle: 'italic',
        alignSelf: 'flex-end',
    },
});
