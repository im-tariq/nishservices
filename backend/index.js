const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const connectionString = 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require';

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false } // Add generic SSL allowance
});

// Prevent crash on connection drop
client.on('error', err => {
    console.error('Database connection error (unexpected):', err);
    // In a real app, you might want to attempt reconnection here
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('DB Connection Error:', err));

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
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Create Ticket
app.post('/api/tickets', async (req, res) => {
    try {
        const { deptName, deptCode } = req.body;
        const id = Math.random().toString(36).substring(7);
        const number = Math.floor(Math.random() * 99) + 1;
        const queueNum = `${deptCode}-${number.toString().padStart(2, '0')}`;

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

// Get Tickets
app.get('/api/tickets', async (req, res) => {
    try {
        const { deptName } = req.query;
        let query = 'SELECT * FROM "Ticket"';
        let values = [];

        if (deptName) {
            query += ' WHERE "deptName" = $1';
            values.push(deptName);
        }

        query += ' ORDER BY "createdAt" DESC';

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
