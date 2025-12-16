const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function createUserTable() {
    try {
        await client.connect();
        console.log('Connected to DB');

        const query = `
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT PRIMARY KEY,
        "email" TEXT UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL, -- 'student', 'professor', 'employee'
        "department" TEXT, -- Nullable, for professors/employees
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await client.query(query);
        console.log('Table "User" created successfully!');
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        await client.end();
    }
}

createUserTable();
