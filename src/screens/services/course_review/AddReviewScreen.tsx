import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CourseReviewStackParamList } from '@/navigation/services/CourseReviewNavigator';
import { colors, spacing, typography } from '@/theme';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<CourseReviewStackParamList, 'AddReview'>;

export const AddReviewScreen: React.FC<Props> = ({ navigation, route }) => {
    const { courseCode } = route.params;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (rating === 0) {
            Alert.alert('Error', 'Please select a rating');
            return;
        }
        if (!comment.trim()) {
            Alert.alert('Error', 'Please enter a comment');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Review submitted!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }, 1500);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerTitle}>Rate & Review</Text>
            {courseCode && <Text style={styles.courseCode}>{courseCode}</Text>}

            <View style={styles.ratingSection}>
                <Text style={styles.label}>Your Rating</Text>
                <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <Pressable key={i} onPress={() => setRating(i)}>
                            <Ionicons
                                name={i <= rating ? "star" : "star-outline"}
                                size={40}
                                color={colors.accent}
                            />
                        </Pressable>
                    ))}
                </View>
            </View>

            <View style={styles.inputSection}>
                {/* Using Input component as text area mock */}
                <Input
                    label="Your Review"
                    value={comment}
                    onChangeText={setComment}
                    placeholder="What did you think of the course?"
                // multiline={true} // Assuming Input supports multiline prop or styles
                />
            </View>

            <Button label="Submit Review" onPress={handleSubmit} loading={loading} fullWidth />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        backgroundColor: colors.background,
        flexGrow: 1,
    },
    headerTitle: {
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
    },
    courseCode: {
        fontSize: typography.sizes.xl,
        fontWeight: '600',
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    ratingSection: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        gap: spacing.sm,
    },
    label: {
        fontSize: typography.sizes.base,
        fontWeight: '600',
        color: colors.text,
    },
    stars: {
        flexDirection: 'row',
        gap: 8,
    },
    inputSection: {
        marginBottom: spacing.xl,
    },
});
