import {
    date,
    numeric,
    pgEnum,
    pgTable,
    timestamp,
    unique,
    varchar
} from 'drizzle-orm/pg-core';

import { usersTable } from './users.schema.js';

export const invoiceStatusEnum = pgEnum('invoice_status', [
    'RECEIVED',
    'OCR_PROCESSED',
    'ASSIGNED',
    'APPROVED',
    'REJECTED'
]);

export const invoiceActionEnum = pgEnum('invoice_action', [
    'INVOICE_CREATED',
    'OCR_PROCESSED',
    'ASSIGNED',
    'APPROVED',
    'REJECTED'
]);

export const invoicesTable = pgTable('invoices', {
    id: varchar('id', { length: 36 }).primaryKey(),
    invoiceNumber: varchar('invoice_number', { length: 100 }).notNull(),
    supplierName: varchar('supplier_name', { length: 255 }).notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 3 }).notNull(),
    invoiceDate: date('invoice_date').notNull(),
    status: invoiceStatusEnum('status').notNull().default('RECEIVED'),
    assignedTo: varchar('assigned_to', { length: 36 }).references(() =>
        usersTable.id, {
        onDelete: 'set null'
    }),
    ocrConfidence: numeric('ocr_confidence', { precision: 5, scale: 2 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (t) => [
    unique('unique_invoice').on(
        t.invoiceNumber,
        t.supplierName,
        t.invoiceDate
    )
]);