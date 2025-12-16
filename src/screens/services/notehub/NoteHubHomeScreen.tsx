import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NoteHubStackParamList } from '@/navigation/services/NoteHubNavigator';
import { colors, spacing, typography } from '@/theme';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { useRole } from '@/context/RoleContext';

type Props = NativeStackScreenProps<NoteHubStackParamList, 'NoteHubHome'>;

const MOCK_NOTES = [
    { id: '1', title: 'Calculus I - Finals Review', author: 'Dr. Smith', type: 'PDF', downloads: 120, tag: 'Faculty Note' },
    { id: '2', title: 'Physics notes for Chapter 3', author: 'Ali Veli', type: 'DOCX', downloads: 45, tag: 'Shared' },
    { id: '3', title: 'Intro to Algorithms', author: 'Ayse Fatma', type: 'PDF', downloads: 89, tag: 'Shared' },
    { id: '4', title: 'Marketing 101 Slides', author: 'Prof. Yilmaz', type: 'PPT', downloads: 200, tag: 'Faculty Note' },
];

export const NoteHubHomeScreen: React.FC<Props> = ({ navigation }) => {
    const { selectedRole } = useRole();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'All' | 'Faculty' | 'Shared'>('All');

    const filteredNotes = MOCK_NOTES.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All'
            ? true
            : filter === 'Faculty'
                ? note.tag === 'Faculty Note'
                : note.tag === 'Shared';
        return matchesSearch && matchesFilter;
    });

    const handleNotePress = (note: typeof MOCK_NOTES[0]) => {
        navigation.navigate('NoteDetail', { noteId: note.id, title: note.title });
    };

    const handleUpload = () => {
        navigation.navigate('NoteUpload');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search notes..."
                    label="" // Empty label for search bar look
                />
                <View style={styles.filterRow}>
                    {(['All', 'Faculty', 'Shared'] as const).map((f) => (
                        <Pressable
                            key={f}
                            onPress={() => setFilter(f)}
                            style={[styles.filterChip, filter === f && styles.filterChipActive]}
                        >
                            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <FlatList
                data={filteredNotes}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <Pressable style={styles.noteCard} onPress={() => handleNotePress(item)}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="document-text" size={32} color={colors.primary} />
                            <Text style={styles.fileType}>{item.type}</Text>
                        </View>
                        <View style={styles.noteInfo}>
                            <Text style={styles.noteTitle}>{item.title}</Text>
                            <Text style={styles.noteAuthor}>{item.author}</Text>
                            <View style={styles.metaRow}>
                                <Text style={styles.noteDownloads}>{item.downloads} downloads</Text>
                                {item.tag === 'Faculty Note' && (
                                    <View style={styles.tagFaculty}>
                                        <Text style={styles.tagText}>Official</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </Pressable>
                )}
            />

            {/* Floating Action Button for Upload (visible to all or role restricted?) */}
            <Pressable style={styles.fab} onPress={handleUpload}>
                <Ionicons name="add" size={32} color={colors.textInverse} />
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
        gap: spacing.sm,
    },
    filterRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    filterChip: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
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
        color: colors.textSecondary,
        fontSize: typography.sizes.sm,
    },
    filterTextActive: {
        color: colors.textInverse,
        fontWeight: '600',
    },
    listContent: {
        padding: spacing.md,
        gap: spacing.md,
    },
    noteCard: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        gap: spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
    },
    fileType: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textSecondary,
    },
    noteInfo: {
        flex: 1,
        gap: 2,
    },
    noteTitle: {
        fontSize: typography.sizes.base,
        fontWeight: '600',
        color: colors.text,
    },
    noteAuthor: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginTop: 4,
    },
    noteDownloads: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
    },
    tagFaculty: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tagText: {
        fontSize: 10,
        color: '#1976D2',
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: spacing.lg,
        right: spacing.lg,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
