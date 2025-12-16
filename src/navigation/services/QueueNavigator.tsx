import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueueHomeScreen } from '@/screens/services/queue/QueueHomeScreen';
import { QueueDepartmentSelectionScreen } from '@/screens/services/queue/QueueDepartmentSelectionScreen';
import { QueueTicketScreen } from '@/screens/services/queue/QueueTicketScreen';
import { colors } from '@/theme';

export type QueueStackParamList = {
    QueueHome: undefined;
    QueueDepartmentSelection: undefined;
    QueueTicket: { ticketId: string; departmentName: string; queueNumber: string };
};

const Stack = createNativeStackNavigator<QueueStackParamList>();

export const QueueNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.textInverse,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen
                name="QueueHome"
                component={QueueHomeScreen}
                options={{ title: 'Queue Service' }}
            />
            <Stack.Screen
                name="QueueDepartmentSelection"
                component={QueueDepartmentSelectionScreen}
                options={{ title: 'Select Department' }}
            />
            <Stack.Screen
                name="QueueTicket"
                component={QueueTicketScreen}
                options={{ title: 'Your Ticket' }}
            />
        </Stack.Navigator>
    );
};
