const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const connectionString = 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require';

const client = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false } // Add generic SSL allowance
});

// Prevent crash on connection drop - Pool handles this well but good for debug
client.on('error', err => {
    console.error('Database connection error (unexpected):', err);
});

// Routes

// Login
app.post('/api/login', async (req, res) => {
    console.log('Login attempt received:', req.body); // LOG REQUEST

    try {
        const { email, studentNumber, password } = req.body;

        let query, param;

        if (studentNumber) {
            query = 'SELECT * FROM "User" WHERE "studentNumber" = $1';
            param = studentNumber;
        } else if (email) {
            query = 'SELECT * FROM "User" WHERE "email" = $1';
            param = email;
        } else {
            console.log('Missing login identifier');
            return res.status(400).json({ error: 'Email or Student Number required' });
        }

        console.log(`Querying DB for: ${param}`); // LOG PARAM

        // In a real app, use hashing (bcrypt)!
        const result = await client.query(query, [param]);

        if (result.rows.length === 0) {
            console.log('User not found in DB'); // LOG NOT FOUND
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        console.log('User found:', user.name); // LOG FOUND

        if (user.password !== password) {
            console.log('Password mismatch'); // LOG PASSWORD ERROR
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Don't send password back
        const { password: _, ...userWithoutPassword } = user;

        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

// Create Ticket
app.post('/api/tickets', async (req, res) => {
    try {
        const { deptName, deptCode } = req.body;

        // Check if queue is full (Limit 30)
        const countQuery = 'SELECT COUNT(*) FROM "Ticket" WHERE "deptCode" = $1 AND "status" != \'completed\' AND "status" != \'cancelled\'';
        const countResult = await client.query(countQuery, [deptCode]);
        const currentCount = parseInt(countResult.rows[0].count, 10);

        if (currentCount >= 30) {
            return res.status(400).json({ error: 'Queue is full for this department.' });
        }

        // Generate sequential number
        // In a real app, use a sequence or transaction to ensure uniqueness.
        // For this mock, we count today's tickets for the dept.
        const sequenceQuery = 'SELECT COUNT(*) FROM "Ticket" WHERE "deptCode" = $1'; // Total tickets ever (or today)
        const sequenceResult = await client.query(sequenceQuery, [deptCode]);
        const nextNum = parseInt(sequenceResult.rows[0].count, 10) + 1;

        const queueNum = `${deptCode}-${nextNum}`; // e.g. IO-1
        const id = Math.random().toString(36).substring(7);

        const query = `
      INSERT INTO "Ticket" ("id", "deptName", "deptCode", "status", "queueNum", "createdAt")
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;
        const values = [id, deptName, deptCode, 'pending', queueNum];

        const result = await client.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
});

// Get Ticket Counts (for Department Selection)
app.get('/api/ticket-counts', async (req, res) => {
    try {
        const query = `
            SELECT "deptCode", COUNT(*) as count 
            FROM "Ticket" 
            WHERE "status" = 'waiting' OR "status" = 'in_service'
            GROUP BY "deptCode"
        `;
        const result = await client.query(query);
        const counts = {};
        result.rows.forEach(row => {
            counts[row.deptCode] = parseInt(row.count, 10);
        });
        res.json(counts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch counts' });
    }
});

// Get Tickets
app.get('/api/tickets', async (req, res) => {
    try {
        const { deptName, status } = req.query;
        let query = 'SELECT * FROM "Ticket"';
        let values = [];

        if (deptName) {
            query += ' WHERE "deptName" = $1';
            values.push(deptName);
            if (status) {
                query += ' AND "status" = $2';
                values.push(status);
            }
        } else if (status) {
            query += ' WHERE "status" = $1';
            values.push(status);
        }

        query += ' ORDER BY "createdAt" ASC'; // Oldest first for queue

        const result = await client.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// Update Status
app.patch('/api/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const query = `
      UPDATE "Ticket" 
      SET "status" = $1
      WHERE "id" = $2
      RETURNING *
    `;

        const result = await client.query(query, [status, id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update ticket' });
    }
});

// Delete Ticket
app.delete('/api/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM "Ticket" WHERE "id" = $1 RETURNING *';
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully', ticket: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
