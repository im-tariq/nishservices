import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QueueStackParamList } from '@/navigation/services/QueueNavigator';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { useRole } from '@/context/RoleContext';
import { Card } from '@/components/common/Card';

type Props = NativeStackScreenProps<QueueStackParamList, 'QueueHome'>;

export const QueueHomeScreen: React.FC<Props> = ({ navigation }) => {
    const { selectedRole } = useRole();

    const handleGetQueueNumber = () => {
        navigation.navigate('QueueDepartmentSelection');
    };

    const renderStudentView = () => (
        <View style={styles.section}>
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Need a Service?</Text>
                <Text style={styles.heroSubtitle}>Get a queue number without waiting in line.</Text>
                <Button label="Get Queue Number" onPress={handleGetQueueNumber} fullWidth />
            </View>

            <Text style={styles.sectionTitle}>Your Active Tickets</Text>
            {/* Use Card component here properly later, for now simple text */}
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No active tickets.</Text>
            </View>
        </View>
    );

    const renderEmployeeView = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assigned Station: Registrar Desk 1</Text>
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Queue is empty.</Text>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {selectedRole === 'student' ? renderStudentView() : renderEmployeeView()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        flexGrow: 1,
    },
    section: {
        gap: spacing.lg,
    },
    heroSection: {
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: 12,
        alignItems: 'center',
        gap: spacing.md,
    },
    heroTitle: {
        fontSize: typography.sizes.xl,
        fontWeight: 'bold',
        color: colors.primary,
    },
    heroSubtitle: {
        fontSize: typography.sizes.base,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    sectionTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        color: colors.primary,
    },
    emptyState: {
        padding: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        borderStyle: 'dashed',
    },
    emptyText: {
        color: colors.textSecondary,
    },
});
