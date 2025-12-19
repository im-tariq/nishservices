const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://d5575c7de283481faf4faf127657130f40c1474952dc25c143a7bd9df01cd249:sk_L9wTMJRK9zccY5Tef76vP@db.prisma.io:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

const departments = [
    { id: 'dept_io', name: 'International Office', code: 'IO' },
    { id: 'dept_fo', name: 'Financial Office', code: 'FO' },
    { id: 'dept_sa', name: 'Student Affairs', code: 'SA' },
    { id: 'dept_ga', name: 'Graduation Affairs', code: 'GA' },
    { id: 'dept_hc', name: 'Help Center', code: 'HC' },
    { id: 'dept_nc', name: 'Nish Card', code: 'NC' },
    { id: 'dept_ph', name: 'Printing House', code: 'PH' },
    // Academic Faculties
    { id: 'dept_eng', name: 'Faculty of Engineering', code: 'ENG' },
    { id: 'dept_med', name: 'Faculty of Medicine', code: 'MED' },
    { id: 'dept_bus', name: 'Faculty of Business', code: 'BUS' },
    { id: 'dept_arts', name: 'Faculty of Arts', code: 'ARTS' },
];

async function seedDepartments() {
    try {
        await client.connect();
        console.log('Connected to DB');

        await client.query('DELETE FROM "Department"');

        const query = `
      INSERT INTO "Department" ("id", "name", "code")
      VALUES ($1, $2, $3)
    `;

        for (const dept of departments) {
            await client.query(query, [dept.id, dept.name, dept.code]);
            console.log(`Inserted: ${dept.name}`);
        }

        console.log('Departments seeded!');
    } catch (err) {
        console.error('Error seeding departments:', err);
    } finally {
        await client.end();
    }
}

seedDepartments();
