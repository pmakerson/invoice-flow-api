import type { OcrData } from '../ocr/dto/ocr.dto.js';
import type { InvoiceDetailsResponse, InvoiceListItem, InvoiceResponse } from './dto/invoice.dto.js';

export function toInvoiceResponse(invoice: InvoiceListItem): InvoiceResponse {
    return {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        supplierName: invoice.supplierName,
        amount: invoice.amount,
        currency: invoice.currency,
        invoiceDate: invoice.invoiceDate,
        status: invoice.status,
        assignedTo: invoice.assignedTo,
        ocrConfidence: invoice.ocrConfidence,
        createdAt: invoice.createdAt.toISOString(),
        updatedAt: invoice.updatedAt.toISOString()
    };
}


export function toInvoiceDetailsResponse(input: { invoice: InvoiceListItem; ocrData: OcrData | null; }): InvoiceDetailsResponse {
    return {
        invoice: toInvoiceResponse(input.invoice),
        ocrData: input.ocrData
            ? {
                rawText: input.ocrData.rawText,
                vatNumber: input.ocrData.vatNumber,
                dueDate: input.ocrData.dueDate,
                totalBeforeTax: input.ocrData.totalBeforeTax,
                totalTax: input.ocrData.totalTax,
                totalWithTax: input.ocrData.totalWithTax,
                processedAt: input.ocrData.processedAt.toISOString()
            }
            : null
    };
}
