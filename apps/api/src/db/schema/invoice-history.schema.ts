import {
    date,
    numeric,
    pgTable,
    text,
    timestamp,
    varchar
} from 'drizzle-orm/pg-core';
import { invoicesTable, invoiceActionEnum } from './invoices.schema.js';
import { usersTable } from './users.schema.js';

export const invoiceHistoryTable = pgTable('invoice_history', {
    id: varchar('id', { length: 36 }).primaryKey(),
    invoiceId: varchar('invoice_id', { length: 36 })
        .notNull()
        .references(() => invoicesTable.id, { onDelete: 'cascade' }),
    action: invoiceActionEnum('action').notNull(),
    actorId: varchar('actor_id', { length: 36 }).references(() =>
        usersTable.id, {
        onDelete: 'set null'
    }),
    comment: text('comment'),
    createdAt: timestamp('created_at', {
        withTimezone:
            true
    }).defaultNow().notNull()
});


export const invoiceOcrDataTable = pgTable('invoice_ocr_data', {
    id: varchar('id', { length: 36 }).primaryKey(),
    invoiceId: varchar('invoice_id', { length: 36 }).notNull().unique().references(() =>
        invoicesTable.id, {
        onDelete: 'cascade'
    }),
    rawText: text('raw_text').notNull(),
    vatNumber: varchar('vat_number', { length: 50 }),
    dueDate: date('due_date'),
    totalBeforeTax: numeric('total_before_tax', { precision: 12, scale: 2 }),
    totalTax: numeric('total_tax', { precision: 12, scale: 2 }),
    totalWithTax: numeric('total_with_tax', { precision: 12, scale: 2 }),
    processedAt: timestamp('processed_at', { withTimezone: true }).defaultNow().notNull()
});

