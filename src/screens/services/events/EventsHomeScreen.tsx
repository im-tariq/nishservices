import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventsStackParamList } from '@/navigation/types';
import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<EventsStackParamList, 'EventsHome'>;

const CATEGORIES = ['All', 'Academic', 'Social', 'Sports', 'Career'];

const MOCK_EVENTS = [
    { id: '1', title: 'Annual Tech Symposium', date: 'Oct 25, 2023', time: '10:00 AM', category: 'Academic', location: 'Main Auditorium', image: null },
    { id: '2', title: 'Football Match: Faculty vs Students', date: 'Oct 28, 2023', time: '04:00 PM', category: 'Sports', location: 'University Stadium', image: null },
    { id: '3', title: 'Career Fair 2023', date: 'Nov 05, 2023', time: '09:00 AM', category: 'Career', location: 'Student Center', image: null },
    { id: '4', title: 'Welcome Freshmen Party', date: 'Nov 10, 2023', time: '08:00 PM', category: 'Social', location: 'Campus Green', image: null },
];

export const EventsHomeScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredEvents = selectedCategory === 'All'
        ? MOCK_EVENTS
        : MOCK_EVENTS.filter(e => e.category === selectedCategory);

    const handleEventPress = (event: typeof MOCK_EVENTS[0]) => {
        navigation.navigate('EventDetail', { eventId: event.id, title: event.title });
    };

    return (
        <View style={styles.container}>
            {/* Categories */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
                    {CATEGORIES.map(cat => (
                        <Pressable
                            key={cat}
                            style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>
                                {cat}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredEvents}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <Pressable style={styles.card} onPress={() => handleEventPress(item)}>
                        <View style={styles.cardImagePlaceholder}>
                            <Ionicons name="calendar" size={40} color={colors.textSecondary} />
                        </View>
                        <View style={styles.cardContent}>
                            <View style={styles.badgeRow}>
                                <View style={styles.categoryBadge}>
                                    <Text style={styles.categoryText}>{item.category}</Text>
                                </View>
                                <Text style={styles.dateText}>{item.date}</Text>
                            </View>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                                <Text style={styles.location}>{item.location}</Text>
                            </View>
                        </View>
                    </Pressable>
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
    filterContainer: {
        backgroundColor: colors.surface,
        paddingVertical: spacing.sm,
    },
    filterContent: {
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    filterChip: {
        paddingHorizontal: spacing.md,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },
    filterChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    filterText: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
    filterTextActive: {
        color: colors.textInverse,
        fontWeight: '600',
    },
    listContent: {
        padding: spacing.md,
        gap: spacing.md,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        height: 120,
    },
    cardImagePlaceholder: {
        width: 100,
        backgroundColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'space-between',
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryBadge: {
        backgroundColor: colors.background, // Light background for badge
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    categoryText: {
        fontSize: 10,
        color: colors.primary,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
    },
    title: {
        fontSize: typography.sizes.sm, // Slightly smaller to fit
        fontWeight: 'bold',
        color: colors.text,
        flexWrap: 'wrap',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
    },
});
