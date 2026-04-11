import { eq } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { invoiceHistoryTable, invoiceOcrDataTable } from '../../db/schema/invoice-history.schema.js';
import { invoicesTable } from '../../db/schema/invoices.schema.js';


export class OcrRepository {

  async processOcr(input: {
    invoiceId: string;
    ocrDataId: string;
    historyId: string;
    actorId: string | null;
    confidence: string;
    rawText: string;
    vatNumber: string | null;
    dueDate: string | null;
    totalBeforeTax: string | null;
    totalTax: string | null;
    totalWithTax: string | null;
  }) {
    await db.insert(invoiceOcrDataTable).values({
      id: input.ocrDataId,
      invoiceId: input.invoiceId,
      rawText: input.rawText,
      vatNumber: input.vatNumber,
      dueDate: input.dueDate,
      totalBeforeTax: input.totalBeforeTax,
      totalTax: input.totalTax,
      totalWithTax: input.totalWithTax
    });

    await db
      .update(invoicesTable)
      .set({
        status: 'OCR_PROCESSED',
        ocrConfidence: input.confidence,
        updatedAt: new Date()
      })
      .where(eq(invoicesTable.id, input.invoiceId));

    await db.insert(invoiceHistoryTable).values({
      id: input.historyId,
      invoiceId: input.invoiceId,
      action: 'OCR_PROCESSED',
      actorId: input.actorId,
      comment: 'OCR processed'
    });

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
      .where(eq(invoicesTable.id, input.invoiceId))
      .limit(1);

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
      .where(eq(invoiceOcrDataTable.invoiceId, input.invoiceId))
      .limit(1);

    return {
      invoice,
      ocrData
    };
  }

}