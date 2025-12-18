import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '@/constants/api';

export type TicketStatus = 'pending' | 'waiting' | 'in_service' | 'completed' | 'cancelled';

export interface Ticket {
    id: string;
    deptName: string;
    deptCode: string;
    queueNum: string;
    status: TicketStatus;
    createdAt: string;
}

interface QueueContextType {
    tickets: Ticket[];
    myTickets: Ticket[];
    deptCounts: Record<string, number>;
    createTicket: (deptName: string, deptCode: string) => Promise<Ticket>;
    fetchTickets: (deptName?: string) => Promise<void>;
    fetchNextNumber: (deptCode: string) => Promise<string>;
    updateTicketStatus: (id: string, status: TicketStatus) => Promise<void>;
    deleteTicket: (id: string) => Promise<void>;
    refreshCounts: () => Promise<void>;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [deptCounts, setDeptCounts] = useState<Record<string, number>>({});
    const [myTicketIds, setMyTicketIds] = useState<string[]>([]);

    const myTickets = tickets.filter(t => myTicketIds.includes(t.id));

    const fetchTickets = async (deptName?: string) => {
        try {
            const url = deptName
                ? `${API_URL}/tickets?deptName=${encodeURIComponent(deptName)}`
                : `${API_URL}/tickets`;

            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setTickets(data);
            }
        } catch (error) {
            console.error('Failed to fetch tickets:', error);
        }
    };

    const refreshCounts = async () => {
        try {
            const res = await fetch(`${API_URL}/ticket-counts`);
            if (res.ok) {
                const data = await res.json();
                setDeptCounts(data);
            }
        } catch (error) {
            console.error('Failed to fetch counts:', error);
        }
    };

    const fetchNextNumber = async (deptCode: string) => {
        try {
            const res = await fetch(`${API_URL}/tickets/next-number?deptCode=${encodeURIComponent(deptCode)}`);
            if (res.ok) {
                const data = await res.json();
                return data.queueNum;
            }
            return '';
        } catch (error) {
            console.error('Failed to fetch next number:', error);
            return '';
        }
    };

    const createTicket = async (deptName: string, deptCode: string) => {
        const res = await fetch(`${API_URL}/tickets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deptName, deptCode }),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Failed to create ticket');
        }

        // Refresh data
        await fetchTickets();
        await refreshCounts();
        setMyTicketIds(prev => [...prev, data.id]);
        return data; // Return created ticket
    };

    const updateTicketStatus = async (id: string, status: TicketStatus) => {
        const res = await fetch(`${API_URL}/tickets/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (res.ok) {
            await fetchTickets(); // Refresh lists
            await refreshCounts();
        }
    };

    const deleteTicket = async (id: string) => {
        const res = await fetch(`${API_URL}/tickets/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            await fetchTickets();
            await refreshCounts();
            setMyTicketIds(prev => prev.filter(ticketId => ticketId !== id));
        }
    };

    // Initial load
    useEffect(() => {
        refreshCounts();
    }, []);

    return (
        <QueueContext.Provider value={{ tickets, myTickets, deptCounts, createTicket, fetchTickets, fetchNextNumber, updateTicketStatus, deleteTicket, refreshCounts }}>
            {children}
        </QueueContext.Provider>
    );
};

export const useQueue = () => {
    const context = useContext(QueueContext);
    if (!context) {
        throw new Error('useQueue must be used within a QueueProvider');
    }
    return context;
};
