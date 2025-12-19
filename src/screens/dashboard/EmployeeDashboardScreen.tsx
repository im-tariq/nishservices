import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRole } from '@/context/RoleContext';
import { useQueue, Ticket } from '@/context/QueueContext';
import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/common/Button';

export const EmployeeDashboardScreen = () => {
    const { department, setSelectedRole } = useRole();
    const { tickets, updateTicketStatus, fetchTickets } = useQueue();

    useEffect(() => {
        if (department) {
            fetchTickets(department);
        }
    }, [department]);

    // Filter tickets for this department
    const departmentTickets = tickets.filter(
        t => t.deptName === department && t.status !== 'completed'
    );

    const activeTicket = departmentTickets.find(t => t.status === 'in_service');
    const pendingTickets = departmentTickets.filter(t => t.status === 'pending');

    const handleCallNext = () => {
        if (activeTicket) {
            updateTicketStatus(activeTicket.id, 'completed');
        }
        if (pendingTickets.length > 0) {
            updateTicketStatus(pendingTickets[0].id, 'in_service');
        }
    };

    const handleCompleteCurrent = () => {
        if (activeTicket) {
            updateTicketStatus(activeTicket.id, 'completed');
        }
    };

    const handleLogout = () => {
        setSelectedRole(null);
    };

    const renderTicket = ({ item }: { item: Ticket }) => (
        <View style={styles.ticketCard}>
            <View style={styles.ticketInfo}>
                <Text style={styles.ticketNumber}>{item.queueNum}</Text>
                <Text style={styles.studentName}>Student</Text>
            </View>
            <View style={styles.ticketStatus}>
                <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
                <Text style={styles.timeText}>Just now</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.deptTitle}>{department}</Text>
                    <Text style={styles.subtitle}>Queue Management</Text>
                </View>
                <Button label="Logout" variant="secondary" size="sm" onPress={handleLogout} />
            </View>

            <View style={styles.activeSection}>
                <Text style={styles.sectionTitle}>Now Serving</Text>
                {activeTicket ? (
                    <View style={styles.activeCard}>
                        <Text style={styles.activeNumber}>{activeTicket.queueNum}</Text>
                        <Text style={styles.activeStatus}>Serving</Text>
                        <Button
                            label="Complete"
                            onPress={handleCompleteCurrent}
                            fullWidth
                            variant="primary"
                        />
                    </View>
                ) : (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyText}>No active ticket</Text>
                        <Button
                            label="Call Next"
                            onPress={handleCallNext}
                            disabled={pendingTickets.length === 0}
                            fullWidth
                        />
                    </View>
                )}
            </View>

            <View style={styles.listSection}>
                <Text style={styles.sectionTitle}>Waiting ({pendingTickets.length})</Text>
                <FlatList
                    data={pendingTickets}
                    keyExtractor={item => item.id}
                    renderItem={renderTicket}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyListText}>No students waiting.</Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    deptTitle: {
        fontSize: typography.sizes.xl,
        fontWeight: 'bold',
        color: colors.primary,
    },
    subtitle: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
    activeSection: {
        padding: spacing.lg,
    },
    sectionTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.md,
    },
    activeCard: {
        backgroundColor: colors.surface,
        padding: spacing.xl,
        borderRadius: 12,
        alignItems: 'center',
        gap: spacing.md,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    activeNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.primary,
    },
    activeStatus: {
        color: colors.accent,
        fontSize: typography.sizes.lg,
        fontWeight: '600',
    },
    emptyCard: {
        backgroundColor: colors.surface,
        padding: spacing.xl,
        borderRadius: 12,
        alignItems: 'center',
        gap: spacing.md,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: colors.border,
    },
    emptyText: {
        color: colors.textSecondary,
        fontSize: typography.sizes.base,
    },
    listSection: {
        flex: 1,
        paddingHorizontal: spacing.lg,
    },
    listContent: {
        gap: spacing.md,
        paddingBottom: spacing.lg,
    },
    ticketCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    ticketInfo: {
        gap: 4,
    },
    ticketNumber: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        color: colors.text,
    },
    studentName: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
    ticketStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
    },
    emptyListText: {
        textAlign: 'center',
        color: colors.textSecondary,
        marginTop: spacing.xl,
    },
});
