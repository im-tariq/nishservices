
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QueueStackParamList } from '@/navigation/services/QueueNavigator';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { useQueue, Ticket } from '@/context/QueueContext';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '@/constants/api'; // For polling individual status if needed

type Props = NativeStackScreenProps<QueueStackParamList, 'QueueTicket'>;

export const QueueTicketScreen: React.FC<Props> = ({ navigation, route }) => {
    const params = route.params;
    const { createTicket, updateTicketStatus, deleteTicket, fetchNextNumber } = useQueue();

    // State to hold the ticket data (either real or preview)
    const [ticket, setTicket] = useState<Ticket | null>(params.ticket || null);
    const [previewNum, setPreviewNum] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const isPreview = !params.ticket && !!params.department;
    const isPending = isPreview || ticket?.status === 'pending';
    const isWaiting = ticket?.status === 'waiting';
    const isInService = ticket?.status === 'in_service';

    useEffect(() => {
        if (isPreview && params.department) {
            // Fetch preview number
            fetchNextNumber(params.department.code).then(num => {
                setPreviewNum(num);
                // Create a mock ticket object for display
                setTicket({
                    id: 'preview',
                    deptName: params.department!.name,
                    deptCode: params.department!.code,
                    queueNum: num,
                    status: 'pending',
                    createdAt: new Date().toISOString()
                });
            });
        }
    }, [isPreview, params.department]);

    // Poll for status updates only if we have a REAL ticket
    useEffect(() => {
        if (!ticket || ticket.id === 'preview' || isPending) return;

        const interval = setInterval(async () => {
            try {
                // Polling logic here... 
                // For simplicity, we assume Context updates are sufficient or we implement single poll
                // Re-implement basic polling if needed, but Context fetchTickets is cleaner if globally managed.
                // Leaving basic polling for now to match previous behavior
                const res = await fetch(`${API_URL}/tickets?deptName=${encodeURIComponent(ticket.deptName)}`);
                if (res.ok) {
                    const data: Ticket[] = await res.json();
                    const updated = data.find(t => t.id === ticket.id);
                    if (updated) {
                        setTicket(updated);
                        if (updated.status === 'completed') {
                            Alert.alert('Service Completed', 'Your service has been marked as completed.', [
                                { text: 'OK', onPress: () => navigation.goBack() }
                            ]);
                        }
                    }
                }
            } catch (e) { console.error("Poll error", e); }
        }, 5000);

        return () => clearInterval(interval);
    }, [ticket?.id, ticket?.status]);


    const handleConfirm = async () => {
        if (!ticket || !params.department) return;
        setLoading(true);
        try {
            // 1. Create the ticket
            const created = await createTicket(params.department.name, params.department.code);
            // 2. Immediately set to waiting (joined queue)
            await updateTicketStatus(created.id, 'waiting');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to confirm ticket.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (isPreview) {
            navigation.goBack();
            return;
        }

        try {
            if (ticket) {
                await deleteTicket(ticket.id);
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to delete ticket.');
        }
    };

    if (!ticket) {
        return (
            <View style={[styles.container, { alignItems: 'center' }]}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.ticketCard}>
                <Text style={styles.deptName}>{ticket.deptName}</Text>

                <View style={styles.numberContainer}>
                    <Text style={styles.queueLabel}>Queue Number</Text>
                    <Text style={styles.queueNumber}>{ticket.queueNum || '...'}</Text>
                </View>

                {!isPending && (
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusLabel}>Status</Text>
                        <View style={[
                            styles.statusBadge,
                            isInService ? styles.statusActive : styles.statusWaiting
                        ]}>
                            <Text style={styles.statusText}>{ticket.status.toUpperCase().replace('_', ' ')}</Text>
                        </View>
                    </View>
                )}

                {isPending && (
                    <Text style={styles.pendingText}>Please Confirm your ticket to join the queue.</Text>
                )}

                {isInService && (
                    <View style={styles.alertBox}>
                        <Ionicons name="megaphone-outline" size={24} color="#FFF" />
                        <Text style={styles.alertText}>
                            It is your turn now – Please head to the required department.
                        </Text>
                    </View>
                )}

                {!isPending && !isInService && (
                    <Text style={styles.infoText}>
                        Please wait for your number to be called.
                    </Text>
                )}
            </View>

            <View style={styles.buttonContainer}>
                {isPending ? (
                    <>
                        <Button
                            label={loading ? "Confirming..." : "Confirm"}
                            variant="primary"
                            onPress={handleConfirm}
                            fullWidth
                            disabled={loading}
                        />
                        <Button
                            label="Cancel"
                            variant="destructive"
                            onPress={handleCancel}
                            fullWidth
                            disabled={loading}
                        />
                    </>
                ) : (
                    <Button
                        label="Cancel Order"
                        variant="destructive"
                        onPress={handleCancel}
                        fullWidth
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
        justifyContent: 'center',
        gap: spacing.xl,
    },
    ticketCard: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: spacing.xl,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        gap: spacing.lg,
    },
    deptName: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
    },
    numberContainer: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    queueLabel: {
        fontSize: typography.sizes.base,
        color: colors.textSecondary,
    },
    queueNumber: {
        fontSize: 64,
        fontWeight: 'bold',
        color: colors.primary,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    statusLabel: {
        fontSize: typography.sizes.base,
        color: colors.text,
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: '#FFE0B2', // Default Waiting Orange
    },
    statusActive: {
        backgroundColor: '#C8E6C9', // Green
    },
    statusWaiting: {
        backgroundColor: '#FFE0B2', // Orange
    },
    statusText: {
        fontWeight: 'bold',
        fontSize: typography.sizes.sm,
        color: colors.text,
    },
    infoText: {
        textAlign: 'center',
        color: colors.textSecondary,
        fontSize: typography.sizes.sm,
    },
    pendingText: {
        textAlign: 'center',
        color: colors.accent,
        fontWeight: 'bold',
    },
    alertBox: {
        backgroundColor: colors.accent,
        padding: spacing.md,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    alertText: {
        color: '#FFF',
        fontWeight: 'bold',
        flex: 1,
    },
    buttonContainer: {
        gap: spacing.md,
    }
});

