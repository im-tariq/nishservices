import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NoteHubStackParamList } from '@/navigation/services/NoteHubNavigator';
import { colors, spacing, typography } from '@/theme';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';

type Props = NativeStackScreenProps<NoteHubStackParamList, 'NoteUpload'>;

export const NoteUploadScreen: React.FC<Props> = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpload = () => {
        if (!title) {
            Alert.alert('Error', 'Please enter a title');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Note uploaded successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }, 1500);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerTitle}>Share Your Knowledge</Text>
            <Text style={styles.headerSub}>Upload notes to help your peers.</Text>

            <View style={styles.form}>
                <Input label="Title" value={title} onChangeText={setTitle} placeholder="e.g. Week 4 Summary" />
                <Input label="Description" value={description} onChangeText={setDescription} placeholder="Brief details about the content" />

                <View style={styles.filePicker}>
                    <Text style={styles.filePickerLabel}>No file selected</Text>
                    <Button label="Select File" variant="secondary" onPress={() => { }} />
                </View>

                <Button label="Upload Note" onPress={handleUpload} loading={loading} fullWidth />
            </View>
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
    },
    headerSub: {
        fontSize: typography.sizes.base,
        color: colors.textSecondary,
        marginBottom: spacing.xl,
    },
    form: {
        gap: spacing.lg,
    },
    filePicker: {
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: spacing.lg,
        alignItems: 'center',
        gap: spacing.md,
    },
    filePickerLabel: {
        color: colors.textSecondary,
    },
});
