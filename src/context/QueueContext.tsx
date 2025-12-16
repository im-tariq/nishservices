import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { API_URL } from '@/constants/api';

export type TicketStatus = 'pending' | 'active' | 'completed';

export interface Ticket {
    id: string;
    departmentName: string;
    studentName: string;
    queueNumber: string;
    status: TicketStatus;
    timestamp: number;
    // API might return different fields, but we map them here if needed.
    // For now, our simple API matches this roughly.
}

interface QueueContextType {
    tickets: Ticket[];
    createTicket: (departmentName: string, departmentCode: string) => Ticket;
    updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
    getTicketsByDepartment: (departmentName: string) => Ticket[];
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    // Poll tickets
    const fetchTickets = async () => {
        try {
            const response = await fetch(`${API_URL}/tickets`);
            if (response.ok) {
                const data = await response.json();
                // Map API data to Ticket interface if needed.
                // Our API returns: { id, deptName, deptCode, status, queueNum, createdAt }
                // We map it to our frontend Ticket interface:
                const mapped: Ticket[] = data.map((d: any) => ({
                    id: d.id,
                    departmentName: d.deptName,
                    studentName: 'Student', // hardcoded in API too effectively
                    queueNumber: d.queueNum,
                    status: d.status as TicketStatus,
                    timestamp: new Date(d.createdAt).getTime()
                }));
                setTickets(mapped);
            }
        } catch (e) {
            console.error('Failed to fetch tickets', e);
        }
    };

    useEffect(() => {
        fetchTickets();
        const interval = setInterval(fetchTickets, 2000); // 2 second polling
        return () => clearInterval(interval);
    }, []);

    const createTicket = (departmentName: string, departmentCode: string) => {
        const tempId = Math.random().toString();
        // Optimistic object to return immediately so UI doesn't crash
        const tempTicket: Ticket = {
            id: tempId,
            departmentName,
            studentName: 'Student',
            queueNumber: 'LOADING...',
            status: 'pending',
            timestamp: Date.now()
        };

        // Call API
        fetch(`${API_URL}/tickets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deptName: departmentName, deptCode: departmentCode })
        })
            .then(res => res.json())
            .then(data => {
                // We rely on the next poll to update the list fully, 
                // or we could optimistically update here, but mapping is needed.
                // For simplicity, let's just trigger a fetch immediately.
                fetchTickets();
            })
            .catch(err => console.error(err));

        return tempTicket;
    };

    const updateTicketStatus = (ticketId: string, status: TicketStatus) => {
        // Optimistic local update
        setTickets(prev => prev.map(t =>
            t.id === ticketId ? { ...t, status } : t
        ));

        // API Call
        fetch(`${API_URL}/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        }).catch(e => console.error(e));
    };

    const getTicketsByDepartment = (departmentName: string) => {
        return tickets.filter(t => t.departmentName === departmentName);
    };

    return (
        <QueueContext.Provider value={{ tickets, createTicket, updateTicketStatus, getTicketsByDepartment }}>
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
