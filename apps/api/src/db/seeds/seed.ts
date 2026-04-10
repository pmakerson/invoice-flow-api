import { db, pool } from '../client.js';
import { invoiceHistoryTable } from '../schema/invoice-history.schema.js';
import { invoicesTable } from '../schema/invoices.schema.js';
import { usersTable } from '../schema/users.schema.js';


async function seed() {
    const accountantId = '11111111-1111-1111-1111-111111111111';
    const approverId = '22222222-2222-2222-2222-222222222222';
    const invoiceOneId = '33333333-3333-3333-3333-333333333333';
    const invoiceTwoId = '44444444-4444-4444-4444-444444444444';
    await db.delete(invoiceHistoryTable);
    await db.delete(invoicesTable);
    await db.delete(usersTable);
    await db.insert(usersTable).values([
        {
            id: accountantId,
            email: 'accountant@example.com', fullName: 'Alice Martin',
            role: 'ACCOUNTANT'
        },
        {
            id: approverId,
            email: 'approver@example.com',
            fullName: 'Lucas Bernard',
            role: 'APPROVER'
        }
    ]);
    await db.insert(invoicesTable).values([
        {
            id: invoiceOneId,
            invoiceNumber: 'INV-2026-001',
            supplierName: 'ACME Supplies',
            amount: '1250.00',
            currency: 'EUR',
            invoiceDate: '2026-04-01',
            status: 'RECEIVED'
        },
        {
            id: invoiceTwoId,
            invoiceNumber: 'INV-2026-002',
            supplierName: 'Nova Services',
            amount: '890.50',
            currency: 'EUR',
            invoiceDate: '2026-04-03',
            status: 'RECEIVED'
        }
    ]);
    await db.insert(invoiceHistoryTable).values([
        {
            id: '55555555-5555-5555-5555-555555555555',
            invoiceId: invoiceOneId,
            action: 'INVOICE_CREATED',
            actorId: accountantId,
            comment: 'Initial seed data'
        },
        {
            id: '66666666-6666-6666-6666-666666666666',
            invoiceId: invoiceTwoId,
            action: 'INVOICE_CREATED',
            actorId: accountantId,
            comment: 'Initial seed data'
        }
    ]);
    console.log('Seed completed successfully');
} 


seed()
    .catch((error) => {
        console.error('Seed failed', error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await pool.end();
    });