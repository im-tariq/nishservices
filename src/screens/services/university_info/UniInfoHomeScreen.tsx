import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, Dimensions, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UniversityInfoStackParamList } from '@/navigation/services/UniversityInfoNavigator';
import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<UniversityInfoStackParamList, 'UniInfoHome'>;

const MOCK_NEWS = [
    { id: '1', title: 'Spring Semester Registrations Open', date: '2 days ago', summary: 'Ensure to register before the deadline.' },
    { id: '2', title: 'Campus Health Protocol Update', date: '5 days ago', summary: 'New guidelines for campus safety.' },
    { id: '3', title: 'Library Hours Extended', date: '1 week ago', summary: 'Library now open 24/7 during finals.' },
];

const IMPORTANT_CONTACTS = [
    { name: 'Registrar Office', phone: '+123 456 7890' },
    { name: 'Campus Security', phone: '+123 456 7891' },
    { name: 'Health Center', phone: '+123 456 7892' },
];

export const UniInfoHomeScreen: React.FC<Props> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<'news' | 'map' | 'directory'>('news');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'news':
                return (
                    <FlatList
                        data={MOCK_NEWS}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.newsCard}
                                onPress={() => navigation.navigate('NewsDetail', { newsId: item.id, title: item.title })}
                            >
                                <View style={styles.newsContent}>
                                    <Text style={styles.newsTitle}>{item.title}</Text>
                                    <Text style={styles.newsDate}>{item.date}</Text>
                                    <Text style={styles.newsSummary}>{item.summary}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
                            </Pressable>
                        )}
                    />
                );
            case 'map':
                return (
                    <View style={styles.mapContainer}>
                        <View style={styles.mapPlaceholder}>
                            <Ionicons name="map" size={64} color={colors.textSecondary} />
                            <Text style={styles.mapText}>Interactive Map Loading...</Text>
                        </View>
                        {/* Button to open external maps could go here */}
                    </View>
                );
            case 'directory':
                return (
                    <ScrollView contentContainerStyle={styles.listContent}>
                        {IMPORTANT_CONTACTS.map((contact, index) => (
                            <View key={index} style={styles.contactCard}>
                                <View>
                                    <Text style={styles.contactName}>{contact.name}</Text>
                                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                                </View>
                                <Ionicons name="call" size={24} color={colors.accent} />
                            </View>
                        ))}
                    </ScrollView>
                );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {(['news', 'map', 'directory'] as const).map(tab => (
                    <Pressable
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab.toUpperCase()}
                        </Text>
                    </Pressable>
                ))}
            </View>
            <View style={styles.content}>
                {renderTabContent()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        elevation: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.md,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: colors.primary,
    },
    tabText: {
        fontWeight: '600',
        color: colors.textSecondary,
        fontSize: typography.sizes.sm,
    },
    activeTabText: {
        color: colors.primary,
    },
    content: {
        flex: 1,
    },
    listContent: {
        padding: spacing.md,
        gap: spacing.md,
    },
    newsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 8,
        gap: spacing.md,
    },
    newsContent: {
        flex: 1,
    },
    newsTitle: {
        fontSize: typography.sizes.base,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 2,
    },
    newsDate: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    newsSummary: {
        fontSize: typography.sizes.sm,
        color: colors.text,
    },
    mapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    mapPlaceholder: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        gap: spacing.md,
    },
    mapText: {
        color: colors.textSecondary,
        fontSize: typography.sizes.lg,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: 8,
    },
    contactName: {
        fontSize: typography.sizes.base,
        fontWeight: 'bold',
        color: colors.text,
    },
    contactPhone: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        marginTop: 2,
    },
});
