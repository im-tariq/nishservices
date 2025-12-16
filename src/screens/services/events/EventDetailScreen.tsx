import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventsStackParamList } from '@/navigation/types';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<EventsStackParamList, 'EventDetail'>;

export const EventDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { title } = route.params;

    const handleAddToCalendar = () => {
        Alert.alert('Calendar', 'Event added to your calendar!');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.heroImage}>
                <Ionicons name="image-outline" size={80} color={colors.textInverse} />
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Upcoming</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Ionicons name="calendar-outline" size={24} color={colors.primary} />
                        <View>
                            <Text style={styles.infoLabel}>Date</Text>
                            <Text style={styles.infoValue}>Wednesday, Oct 25, 2023</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={24} color={colors.primary} />
                        <View>
                            <Text style={styles.infoLabel}>Time</Text>
                            <Text style={styles.infoValue}>10:00 AM - 02:00 PM</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={24} color={colors.primary} />
                        <View>
                            <Text style={styles.infoLabel}>Location</Text>
                            <Text style={styles.infoValue}>Main Auditorium, Block C</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.descriptionSection}>
                    <Text style={styles.sectionTitle}>About Event</Text>
                    <Text style={styles.description}>
                        Join us for the Annual Tech Symposium where industry leaders and students come together to discuss the latest trends in technology, AI, and software development.
                        {'\n\n'}
                        There will be keynote speakers, workshops, and networking opportunities. Don't miss out!
                    </Text>
                </View>

                <Button label="Add to Calendar" onPress={handleAddToCalendar} fullWidth />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
    },
    heroImage: {
        height: 250,
        backgroundColor: colors.primary, // Placeholder color
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: spacing.lg,
        gap: spacing.xl,
        marginTop: -20,
        backgroundColor: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: spacing.md,
    },
    title: {
        flex: 1,
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.primary,
    },
    badge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    badgeText: {
        color: '#2E7D32',
        fontWeight: 'bold',
        fontSize: typography.sizes.xs,
    },
    infoSection: {
        gap: spacing.lg,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
    },
    infoLabel: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
    },
    infoValue: {
        fontSize: typography.sizes.base,
        color: colors.text,
        fontWeight: '500',
    },
    descriptionSection: {
        gap: spacing.md,
    },
    sectionTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        color: colors.primary,
    },
    description: {
        fontSize: typography.sizes.base,
        color: colors.text,
        lineHeight: 24,
    },
});
