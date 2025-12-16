import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QueueStackParamList } from '@/navigation/services/QueueNavigator';
import { colors, spacing, typography } from '@/theme';

import { DEPARTMENTS } from '@/constants/departments';
import { useQueue } from '@/context/QueueContext';

type Props = NativeStackScreenProps<QueueStackParamList, 'QueueDepartmentSelection'>;

export const QueueDepartmentSelectionScreen: React.FC<Props> = ({ navigation }) => {
    const { createTicket, tickets } = useQueue();

    const getMyTicketForDept = (deptName: string) => {
        // In a real app, strict user filtering would happen here.
        // For now, we assume local tickets belong to the user.
        return tickets.find(t => t.departmentName === deptName && t.status !== 'completed');
    };

    const handleSelectDepartment = (dept: typeof DEPARTMENTS[0]) => {
        const existingTicket = getMyTicketForDept(dept.name);
        if (existingTicket) {
            // Already have a ticket, maybe show details or do nothing
            return;
        }

        try {
            createTicket(dept.name, dept.code);
            // No navigation needed, state update will reflect in UI
        } catch (error) {
            console.error('Failed to create ticket:', error);
            alert('Could not create ticket. Please try again.');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return colors.accent; // e.g. Green/Active color
            case 'pending': return colors.primary;
            default: return colors.textSecondary;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={DEPARTMENTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => {
                    const ticket = getMyTicketForDept(item.name);
                    const isTicketActive = ticket?.status === 'active';

                    return (
                        <Pressable
                            style={({ pressed }) => [
                                styles.item,
                                pressed && styles.itemPressed,
                                ticket && styles.itemActive
                            ]}
                            onPress={() => handleSelectDepartment(item)}
                            disabled={!!ticket} // Disable clicking if already have ticket? Or allow to view details?
                        >
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemCode}>Code: {item.code}</Text>
                            </View>

                            {ticket ? (
                                <View style={styles.ticketBadge}>
                                    <Text style={[styles.ticketNumber, { color: getStatusColor(ticket.status) }]}>
                                        {ticket.queueNumber}
                                    </Text>
                                    <Text style={[styles.ticketStatus, { color: getStatusColor(ticket.status) }]}>
                                        {ticket.status.toUpperCase()}
                                    </Text>
                                </View>
                            ) : (
                                <View style={styles.actionContainer}>
                                    <Text style={styles.getTicketText}>Get Ticket</Text>
                                    <Text style={styles.chevron}>{'>'}</Text>
                                </View>
                            )}
                        </Pressable>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContent: {
        padding: spacing.md,
        gap: spacing.md,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        minHeight: 70,
    },
    itemPressed: {
        backgroundColor: colors.border,
    },
    itemActive: {
        borderColor: colors.primary,
        backgroundColor: colors.surface,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: typography.sizes.base,
        fontWeight: '600',
        color: colors.text,
    },
    itemCode: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        marginTop: 2,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    getTicketText: {
        fontSize: typography.sizes.sm,
        color: colors.primary,
        fontWeight: '600',
    },
    chevron: {
        fontSize: typography.sizes.lg,
        color: colors.textSecondary,
    },
    ticketBadge: {
        alignItems: 'flex-end',
    },
    ticketNumber: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
    },
    ticketStatus: {
        fontSize: typography.sizes.xs,
        fontWeight: '600',
    },
});
