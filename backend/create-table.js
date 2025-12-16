const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require',
});

async function createTable() {
    try {
        await client.connect();
        console.log('Connected to DB');

        const query = `
      CREATE TABLE IF NOT EXISTS "Ticket" (
        "id" TEXT PRIMARY KEY,
        "deptName" TEXT NOT NULL,
        "deptCode" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'pending',
        "queueNum" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await client.query(query);
        console.log('Table "Ticket" created successfully!');
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        await client.end();
    }
}

createTable();
