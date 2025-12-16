import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QueueStackParamList } from '@/navigation/services/QueueNavigator';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';

type Props = NativeStackScreenProps<QueueStackParamList, 'QueueTicket'>;

export const QueueTicketScreen: React.FC<Props> = ({ navigation, route }) => {
    const { queueNumber, departmentName } = route.params;

    // Prevent going back easily to simulate specific flow
    useEffect(() => {
        const onBackPress = () => {
            navigation.navigate('QueueHome');
            return true;
        };

        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => subscription.remove();
    }, [navigation]);

    const handleDone = () => {
        navigation.navigate('QueueHome');
    };

    return (
        <View style={styles.container}>
            <View style={styles.ticketCard}>
                <Text style={styles.deptName}>{departmentName}</Text>
                <Text style={styles.queueLabel}>Your Number</Text>
                <Text style={styles.queueNumber}>{queueNumber}</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Position: 3rd</Text>
                    <Text style={styles.infoText}>Est. Wait: 15m</Text>
                </View>
            </View>

            <Text style={styles.instruction}>
                Please wait for your number to be called on the display screens.
            </Text>

            <Button label="Back to Queue Home" onPress={handleDone} variant="secondary" fullWidth />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xl,
    },
    ticketCard: {
        backgroundColor: colors.surface,
        padding: spacing.xl,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderTopWidth: 8,
        borderTopColor: colors.primary,
    },
    deptName: {
        fontSize: typography.sizes.lg,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    queueLabel: {
        fontSize: typography.sizes.sm,
        textTransform: 'uppercase',
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    queueNumber: {
        fontSize: 56,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.lg,
    },
    infoRow: {
        flexDirection: 'row',
        gap: spacing.xl,
    },
    infoText: {
        fontSize: typography.sizes.base,
        fontWeight: '500',
        color: colors.text,
    },
    instruction: {
        textAlign: 'center',
        color: colors.textSecondary,
        lineHeight: 22,
    },
});
