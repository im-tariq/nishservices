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
        departmentId: null
    },
    {
        id: '2',
        email: 'prof@test.com',
        studentNumber: null,
        password: 'password123',
        name: 'Dr. Smith',
        role: 'professor',
        departmentId: 'dept_eng' // Faculty of Engineering
    },
    {
        id: '3',
        email: 'employee@test.com', // International Office Employee
        studentNumber: null,
        password: 'password123',
        name: 'IO Staff',
        role: 'employee',
        departmentId: 'dept_io'
    },
    {
        id: '4',
        email: 'finance@test.com', // Finance Employee
        studentNumber: null,
        password: 'password123',
        name: 'Finance Staff',
        role: 'employee',
        departmentId: 'dept_fo'
    },
    {
        id: '5',
        email: 'student.affairs@test.com',
        studentNumber: null,
        password: 'password123',
        name: 'SA Staff',
        role: 'employee',
        departmentId: 'dept_sa'
    }
];

async function seedUsers() {
    try {
        await client.connect();
        console.log('Connected to DB');

        await client.query('DELETE FROM "User"');

        const query = `
      INSERT INTO "User" ("id", "email", "studentNumber", "password", "name", "role", "departmentId")
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
                user.departmentId
            ]);
            console.log(`Inserted ${user.role}: ${user.email || user.studentNumber} -> Dept: ${user.departmentId}`);
        }

        console.log('Users seeded!');
    } catch (err) {
        console.error('Error seeding users:', err);
    } finally {
        await client.end();
    }
}

seedUsers();
