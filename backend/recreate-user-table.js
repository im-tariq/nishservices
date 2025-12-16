const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function recreateUserTable() {
    try {
        await client.connect();
        console.log('Connected to DB');

        // Drop existing table
        await client.query('DROP TABLE IF EXISTS "User"');
        console.log('Dropped existing "User" table.');

        const query = `
      CREATE TABLE "User" (
        "id" TEXT PRIMARY KEY,
        "email" TEXT, 
        "studentNumber" TEXT UNIQUE, -- New field for students
        "password" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL,
        "department" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await client.query(query);
        console.log('Table "User" recreated with studentNumber column!');
    } catch (err) {
        console.error('Error recreating table:', err);
    } finally {
        await client.end();
    }
}

recreateUserTable();
