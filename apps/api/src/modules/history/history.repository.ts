import { asc, eq } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { invoiceHistoryTable } from '../../db/schema/invoice-history.schema.js';
import type { InvoiceHistoryItem } from './dto/history.dto.js';

export class HistoryRepository {
    
    async listByInvoiceId(invoiceId: string): Promise<InvoiceHistoryItem[]> {
        const rows = await db
            .select({
                id: invoiceHistoryTable.id,
                invoiceId: invoiceHistoryTable.invoiceId,
                action: invoiceHistoryTable.action,
                actorId: invoiceHistoryTable.actorId,
                comment: invoiceHistoryTable.comment,
                createdAt: invoiceHistoryTable.createdAt
            })
            .from(invoiceHistoryTable)
            .where(eq(invoiceHistoryTable.invoiceId, invoiceId))
            .orderBy(asc(invoiceHistoryTable.createdAt));

        return rows;
    }
}