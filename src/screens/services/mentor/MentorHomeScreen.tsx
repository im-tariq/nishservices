import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MentorStackParamList } from '@/navigation/services/mentorTypes';
import { colors, spacing, typography } from '@/theme';
import { Input } from '@/components/common/Input';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<MentorStackParamList, 'MentorHome'>;

const MOCK_MENTORS = [
    { id: '1', name: 'Dr. Sarah Wilson', dept: 'Computer Science', verified: true },
    { id: '2', name: 'Prof. Ahmet Demir', dept: 'Electrical Eng.', verified: true },
    { id: '3', name: 'Dr. Emily Chen', dept: 'Mathematics', verified: false },
    { id: '4', name: 'Prof. Mehmet Oz', dept: 'Physics', verified: true },
];

export const MentorHomeScreen: React.FC<Props> = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const filteredMentors = MOCK_MENTORS.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.dept.toLowerCase().includes(search.toLowerCase())
    );

    const handlePress = (mentor: typeof MOCK_MENTORS[0]) => {
        navigation.navigate('MentorDetail', { mentorId: mentor.id, name: mentor.name });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search by name or department..."
                    label=""
                />
            </View>

            <FlatList
                data={filteredMentors}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <Pressable style={styles.card} onPress={() => handlePress(item)}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.nameRow}>
                                <Text style={styles.name}>{item.name}</Text>
                                {item.verified && (
                                    <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
                                )}
                            </View>
                            <Text style={styles.dept}>{item.dept}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
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
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: colors.textInverse,
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    name: {
        fontSize: typography.sizes.base,
        fontWeight: '600',
        color: colors.text,
    },
    dept: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
});
