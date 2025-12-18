import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { useRole } from '@/context/RoleContext';
import { useQueue, Ticket } from '@/context/QueueContext';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { QueueDepartmentSelectionScreen } from './QueueDepartmentSelectionScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QueueStackParamList } from '@/navigation/services/QueueNavigator';

type Props = NativeStackScreenProps<QueueStackParamList, 'QueueHome'>;

export const QueueHomeScreen: React.FC<Props> = ({ navigation }) => {
    const { selectedRole, department } = useRole(); // department is set during login for employees
    const { tickets, fetchTickets, updateTicketStatus } = useQueue();

    // If User, show regular selection.
    // NOTE: In AppNavigator, Home links to here. 
    // We should probably redirect to DepartmentSelection if role != employee for clarity, 
    // but the original design put logic here.
    // Let's defer to DepartmentSelection if not employee.
    if (selectedRole !== 'employee') {
        // @ts-ignore - Navigator handles this
        return <QueueDepartmentSelectionScreen navigation={navigation} route={{} as any} />;
    }

    // EMPLOYEE VIEW
    useEffect(() => {
        if (department) {
            fetchTickets(department); // Only fetch for my dept
            // Poll for new tickets
            const interval = setInterval(() => fetchTickets(department), 5000);
            return () => clearInterval(interval);
        }
    }, [department]);

    // Filter Logic
    const waitingTickets = tickets.filter(t => t.status === 'waiting');
    const inServiceTicket = tickets.find(t => t.status === 'in_service');

    const handleNext = async () => {
        if (inServiceTicket) {
            Alert.alert('Service in Progress', 'Please finish the current ticket first.');
            return;
        }
        const nextTicket = waitingTickets[0];
        if (!nextTicket) {
            Alert.alert('Empty Queue', 'No waiting tickets.');
            return;
        }

        try {
            await updateTicketStatus(nextTicket.id, 'in_service');
            Alert.alert('Calling Next', `Calling ticket ${nextTicket.queueNum}.`);
        } catch (error) {
            Alert.alert('Error', 'Failed to call next ticket.');
        }
    };

    const handleEndService = async () => {
        if (!inServiceTicket) return;
        try {
            await updateTicketStatus(inServiceTicket.id, 'completed');
            Alert.alert('Finished', 'Service completed.');
        } catch (error) {
            Alert.alert('Error', 'Failed to end service.');
        }
    };

    const handleCancelRequest = async (id: string) => {
        try {
            await updateTicketStatus(id, 'cancelled');
        } catch (error) {
            Alert.alert('Error', 'Failed to cancel ticket.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dashboard: {department}</Text>
                <Text style={styles.subHeader}>Queue Management</Text>
            </View>

            {inServiceTicket ? (
                <View style={styles.currentCard}>
                    <Text style={styles.servingLabel}>Now Serving</Text>
                    <Text style={styles.servingNumber}>{inServiceTicket.queueNum}</Text>
                    <View style={styles.actions}>
                        <Button label="End Service" onPress={handleEndService} variant="primary" />
                        <Button label="Cancel" onPress={() => handleCancelRequest(inServiceTicket.id)} variant="destructive" />
                    </View>
                </View>
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No Active Service</Text>
                    <Button label="Call Next" onPress={handleNext} disabled={waitingTickets.length === 0} />
                </View>
            )}

            <Text style={styles.listTitle}>Waiting List ({waitingTickets.length})</Text>
            <FlatList
                data={waitingTickets}
                keyExtractor={t => t.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.ticketItem}>
                        <Text style={styles.ticketNum}>{item.queueNum}</Text>
                        <Button label="Cancel" size="sm" variant="ghost" onPress={() => handleCancelRequest(item.id)} />
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyList}>No tickets waiting</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.md,
    },
    header: {
        marginBottom: spacing.lg,
    },
    headerTitle: {
        fontSize: typography.sizes.xl,
        fontWeight: 'bold',
        color: colors.primary,
    },
    subHeader: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
    currentCard: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: spacing.lg,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.accent,
        marginBottom: spacing.xl,
    },
    servingLabel: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        color: colors.accent,
    },
    servingNumber: {
        fontSize: 64,
        fontWeight: 'bold',
        color: colors.text,
        marginVertical: spacing.md,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    emptyState: {
        alignItems: 'center',
        padding: spacing.xl,
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        marginBottom: spacing.xl,
        gap: spacing.md,
    },
    emptyText: {
        color: colors.textSecondary,
    },
    listTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        marginBottom: spacing.md,
    },
    list: {
        gap: spacing.sm,
    },
    ticketItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    ticketNum: {
        fontSize: typography.sizes.lg,
        fontWeight: '600',
    },
    emptyList: {
        fontStyle: 'italic',
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.xl,
    }
});
