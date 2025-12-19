const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function recreateUserTable() {
    try {
        await client.connect();
        console.log('Connected to DB');

        // Drop existing table to ensure clean schema change
        await client.query('DROP TABLE IF EXISTS "User" CASCADE');
        console.log('Dropped old "User" table');

        const query = `
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT PRIMARY KEY,
        "email" TEXT UNIQUE,
        "studentNumber" TEXT UNIQUE,
        "password" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL, 
        "departmentId" TEXT, 
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_department
          FOREIGN KEY("departmentId") 
          REFERENCES "Department"("id")
          ON DELETE SET NULL
      );
    `;

        await client.query(query);
        console.log('Table "User" recreated successfully with Foreign Key!');
    } catch (err) {
        console.error('Error recreating table:', err);
    } finally {
        await client.end();
    }
}

recreateUserTable();
