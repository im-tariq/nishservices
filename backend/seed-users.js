const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

const users = [
    {
        id: '1',
        studentNumber: '20212022336',
        password: 'password123',
        name: 'TARIQ',
        role: 'student',
        department: null
    },
    {
        id: '2',
        email: 'prof@test.com',
        studentNumber: null,
        password: 'password123',
        name: 'Dr. Smith',
        role: 'professor',
        department: 'Computer Engineering'
    },
    {
        id: '3',
        email: 'employee@test.com',
        studentNumber: null,
        password: 'password123',
        name: 'Admin Staff',
        role: 'employee',
        department: 'International Office'
    }
];

async function seedUsers() {
    try {
        await client.connect();
        console.log('Connected to DB');

        // Clear existing users
        await client.query('DELETE FROM "User"');

        const query = `
      INSERT INTO "User" ("id", "email", "studentNumber", "password", "name", "role", "department")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

        for (const user of users) {
            await client.query(query, [
                user.id,
                user.email,
                user.studentNumber,
                user.password,
                user.name,
                user.role,
                user.department
            ]);
            console.log(`Inserted ${user.role}: ${user.email || user.studentNumber}`);
        }

        console.log('Seeding complete!');
    } catch (err) {
        console.error('Error seeding users:', err);
    } finally {
        await client.end();
    }
}

seedUsers();
