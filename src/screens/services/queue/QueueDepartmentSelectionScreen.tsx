
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QueueStackParamList } from '@/navigation/services/QueueNavigator';
import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useQueue } from '@/context/QueueContext';
import { DEPARTMENTS, Department } from '@/constants/departments';

type Props = NativeStackScreenProps<QueueStackParamList, 'QueueDepartmentSelection'>;

export const QueueDepartmentSelectionScreen: React.FC<Props> = ({ navigation }) => {

    const { createTicket, deptCounts, refreshCounts, myTickets } = useQueue();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refreshCounts();
        });
        return unsubscribe;
    }, [navigation]);

    const handleSelectDepartment = async (dept: Department) => {
        // Enforce 1 active ticket per department
        const existingTicket = myTickets.find(
            t => t.deptCode === dept.code &&
                (t.status === 'pending' || t.status === 'waiting' || t.status === 'in_service')
        );

        if (existingTicket) {
            Alert.alert('Existing Ticket', `You already have an active ticket for ${dept.name}.`, [
                { text: 'View Ticket', onPress: () => navigation.navigate('QueueTicket', { ticket: existingTicket }) },
                { text: 'OK' }
            ]);
            return;
        }

        const count = deptCounts[dept.code] || 0;
        if (count >= 30) {
            Alert.alert('Queue Full', 'The queue for this department is currently full.');
            return;
        }

        // Navigate to Ticket Screen for Preview & Confirmation
        navigation.navigate('QueueTicket', { department: dept });
    };

    const renderMyActiveTickets = () => {
        const active = myTickets.filter(t => t.status !== 'completed' && t.status !== 'cancelled');
        if (active.length === 0) return null;

        return (
            <View style={styles.activeSection}>
                <Text style={styles.sectionTitle}>My Active Tickets</Text>
                {active.map(ticket => (
                    <Pressable
                        key={ticket.id}
                        style={styles.activeCard}
                        onPress={() => navigation.navigate('QueueTicket', { ticket })}
                    >
                        <View>
                            <Text style={styles.activeDept}>{ticket.deptName}</Text>
                            <Text style={styles.activeStatus}>{ticket.status.toUpperCase().replace('_', ' ')}</Text>
                        </View>
                        <Text style={styles.activeNum}>{ticket.queueNum}</Text>
                    </Pressable>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Queue Management</Text>

            {renderMyActiveTickets()}

            <Text style={styles.subHeader}>Select Department</Text>

            <FlatList
                data={DEPARTMENTS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const count = deptCounts[item.code] || 0;
                    const isFull = count >= 30;
                    // Check if I have an active ticket for this dept to visually indicate?
                    const myTicket = myTickets.find(
                        t => t.deptCode === item.code &&
                            (t.status === 'pending' || t.status === 'waiting' || t.status === 'in_service')
                    );

                    return (
                        <View style={[styles.card, isFull && styles.cardDisabled]}>
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="business" size={24} color={isFull ? colors.textSecondary : colors.primary} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={[styles.deptName, isFull && styles.textDisabled]}>{item.name}</Text>
                                    <Text style={[styles.deptStatus, isFull && styles.statusFull]}>
                                        {isFull ? 'Full' : `${count} Waiting`}
                                    </Text>
                                </View>
                            </View>
                            <Pressable
                                style={[styles.button, isFull && styles.buttonDisabled]}
                                onPress={() => !isFull && handleSelectDepartment(item)}
                                disabled={isFull}
                            >
                                <Text style={styles.buttonText}>{isFull ? 'Full' : 'Get Number'}</Text>
                            </Pressable>
                        </View>
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
        padding: spacing.md,
    },
    header: {
        fontSize: typography.sizes.xl,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    list: {
        gap: spacing.md,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardDisabled: {
        opacity: 0.7,
        backgroundColor: '#eee',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    deptName: {
        fontSize: typography.sizes.base,
        fontWeight: 'bold',
        color: colors.text,
    },
    deptStatus: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
    statusFull: {
        color: 'red',
        fontWeight: 'bold',
    },
    textDisabled: {
        color: colors.textSecondary,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 8,
    },
    buttonDisabled: {
        backgroundColor: colors.border,
    },
    buttonText: {
        color: '#FFF',
        fontSize: typography.sizes.sm,
        fontWeight: 'bold',
    },
    activeSection: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.sm,
    },
    subHeader: {
        fontSize: typography.sizes.lg,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.md,
    },
    activeCard: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    activeDept: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: typography.sizes.base,
    },
    activeStatus: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: typography.sizes.xs,
        fontWeight: '600',
    },
    activeNum: {
        color: '#FFF',
        fontSize: typography.sizes.xl,
        fontWeight: 'bold',
    }
});
