const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require',
});

client.connect()
    .then(() => {
        console.log('Connected successfully to PostgreSQL!');
        return client.end();
    })
    .catch(err => {
        console.error('Connection failed:', err);
        process.exit(1);
    });
