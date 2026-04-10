import { pgTable, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['ACCOUNTANT', 'APPROVER']);


export const usersTable = pgTable('users', {
    id: varchar('id', { length: 36 }).primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    role: userRoleEnum('role').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone:
            true
    }).defaultNow().notNull()
});