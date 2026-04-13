import { and, count, desc, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { invoiceHistoryTable, invoiceOcrDataTable } from '../../db/schema/invoice-history.schema.js';
import { invoicesTable } from '../../db/schema/invoices.schema.js';
import type {
  CreateInvoiceInput,
  InvoiceListItem,
  ListInvoicesQuery
} from './dto/invoice.dto.js';
import type { OcrData } from '../ocr/dto/ocr.dto.js';

export class InvoiceRepository {
  async create(input: CreateInvoiceInput & { id: string; historyId: string; actorId: string | null }) {
    return db.transaction(async (tx) => {

      await tx.insert(invoicesTable).values({
        id: input.id,
        invoiceNumber: input.invoiceNumber,
        supplierName: input.supplierName,
        amount: input.amount,
        currency: input.currency,
        invoiceDate: input.invoiceDate,
        status: 'RECEIVED'
      });

      await tx.insert(invoiceHistoryTable).values({
        id: input.historyId,
        invoiceId: input.id,
        action: 'INVOICE_CREATED',
        actorId: input.actorId,
        comment: 'Invoice created'
      });

      const [created] = await tx
        .select({
          id: invoicesTable.id,
          invoiceNumber: invoicesTable.invoiceNumber,
          supplierName: invoicesTable.supplierName,
          amount: invoicesTable.amount,
          currency: invoicesTable.currency,
          invoiceDate: invoicesTable.invoiceDate,
          status: invoicesTable.status,
          assignedTo: invoicesTable.assignedTo,
          ocrConfidence: invoicesTable.ocrConfidence,
          createdAt: invoicesTable.createdAt,
          updatedAt: invoicesTable.updatedAt
        })
        .from(invoicesTable)
        .where(eq(invoicesTable.id, input.id))
        .limit(1);

      return created;
    });
  }

  async list(query: ListInvoicesQuery): Promise<{ rows: InvoiceListItem[]; total: number }> {
    const filters = [];

    if (query.status) {
      filters.push(eq(invoicesTable.status, query.status));
    }

    if (query.supplierName) {
      filters.push(ilike(invoicesTable.supplierName, `%${query.supplierName}%`));
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const rows = await db
      .select({
        id: invoicesTable.id,
        invoiceNumber: invoicesTable.invoiceNumber,
        supplierName: invoicesTable.supplierName,
        amount: invoicesTable.amount,
        currency: invoicesTable.currency,
        invoiceDate: invoicesTable.invoiceDate,
        status: invoicesTable.status,
        assignedTo: invoicesTable.assignedTo,
        ocrConfidence: invoicesTable.ocrConfidence,
        createdAt: invoicesTable.createdAt,
        updatedAt: invoicesTable.updatedAt
      })
      .from(invoicesTable)
      .where(whereClause)
      .orderBy(desc(invoicesTable.createdAt))
      .limit(query.pageSize)
      .offset((query.page - 1) * query.pageSize);

    const totalRows = await db
      .select({ total: count() })
      .from(invoicesTable)
      .where(whereClause);

    return {
      rows,
      total: Number(totalRows[0]?.total ?? 0)
    };
  }

  async findById(id: string): Promise<InvoiceListItem | null> {
    const [invoice] = await db
      .select({
        id: invoicesTable.id,
        invoiceNumber: invoicesTable.invoiceNumber,
        supplierName: invoicesTable.supplierName,
        amount: invoicesTable.amount,
        currency: invoicesTable.currency,
        invoiceDate: invoicesTable.invoiceDate,
        status: invoicesTable.status,
        assignedTo: invoicesTable.assignedTo,
        ocrConfidence: invoicesTable.ocrConfidence,
        createdAt: invoicesTable.createdAt,
        updatedAt: invoicesTable.updatedAt
      })
      .from(invoicesTable)
      .where(eq(invoicesTable.id, id))
      .limit(1);

    return invoice ?? null;
  }

  async findOcrDataByInvoiceId(invoiceId: string): Promise<OcrData | null> {
    const [ocrData] = await db
      .select({
        rawText: invoiceOcrDataTable.rawText,
        vatNumber: invoiceOcrDataTable.vatNumber,
        dueDate: invoiceOcrDataTable.dueDate,
        totalBeforeTax: invoiceOcrDataTable.totalBeforeTax,
        totalTax: invoiceOcrDataTable.totalTax,
        totalWithTax: invoiceOcrDataTable.totalWithTax,
        processedAt: invoiceOcrDataTable.processedAt
      })
      .from(invoiceOcrDataTable)
      .where(eq(invoiceOcrDataTable.invoiceId, invoiceId))
      .limit(1);

    return ocrData ?? null;
  }

}