const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function listUsers() {
    try {
        await client.connect();
        console.log('Connected to DB');

        const res = await client.query('SELECT * FROM "User"');
        console.log('--- USERS IN DB ---');
        res.rows.forEach(r => {
            console.log(`User: ${r.name}, ID: ${r.id}, SN: '${r.studentNumber}', Email: '${r.email}'`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

listUsers();
