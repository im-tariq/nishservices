import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/theme';
import { useRole } from '@/context/RoleContext';

export const HomeScreen = () => {
    const { selectedRole } = useRole();
    const navigation = useNavigation();
    const userName = "User"; // TODO: Fetch from actual user profile

    const services = [
        { title: 'Queue Management', icon: 'people-outline', route: 'QueueService' },
        { title: 'NoteHub', icon: 'document-text-outline', route: 'NoteHubService' },
        { title: 'Find My Mentor', icon: 'school-outline', route: 'MentorService' },
        { title: 'Course Reviewer', icon: 'star-outline', route: 'CourseReviewService' },
        { title: 'University Info', icon: 'information-circle-outline', route: 'UniversityInfoService' },
        { title: 'Events', icon: 'calendar-outline', route: 'EventsService' },
        { title: 'Contact Us', icon: 'call-outline' },
    ];

    const handleServicePress = (route?: string) => {
        if (route) {
            // @ts-ignore
            navigation.navigate(route);
        } else {
            // alert coming soon
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome,</Text>
                        <Text style={styles.username}>{userName}!</Text>
                    </View>
                    <View style={styles.profileIcon} />
                </View>

                <View style={styles.roleContainer}>
                    <Text style={styles.roleText}>{selectedRole ? selectedRole.toUpperCase() : 'GUEST'}</Text>
                </View>

                <Text style={styles.sectionTitle}>Services</Text>
                <View style={styles.grid}>
                    {services.map((service, index) => (
                        <Pressable
                            key={index}
                            style={styles.card}
                            onPress={() => handleServicePress(service.route)}
                        >
                            <Ionicons name={service.icon as any} size={32} color={colors.primary} />
                            <Text style={styles.cardTitle}>{service.title}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        padding: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    greeting: {
        fontSize: typography.sizes.lg,
        color: colors.textSecondary,
    },
    username: {
        fontSize: typography.sizes['2xl'],
        fontWeight: 'bold',
        color: colors.primary,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surface, // Placeholder
    },
    roleContainer: {
        backgroundColor: colors.surface,
        padding: spacing.xs,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: spacing.md,
    },
    roleText: {
        fontSize: typography.sizes.xs,
        color: colors.text,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: typography.sizes.xl,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    card: {
        width: '47%', // roughly half minus gap
        aspectRatio: 1,
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        marginTop: spacing.sm,
        textAlign: 'center',
        color: colors.primary,
        fontWeight: '600',
    },
});
