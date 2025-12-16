export type Department = {
    id: string;
    name: string;
    code: string;
};

export const DEPARTMENTS: Department[] = [
    { id: '1', name: 'International Office', code: 'INT' },
    { id: '2', name: 'Registrar Office', code: 'REG' },
    { id: '3', name: 'Student Affairs', code: 'SA' },
    { id: '4', name: 'Financial Aid', code: 'FA' },
    { id: '5', name: 'IT Support', code: 'IT' },
    { id: '6', name: 'Library Services', code: 'LIB' },
];
