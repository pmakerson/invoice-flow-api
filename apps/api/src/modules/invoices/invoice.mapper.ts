import type { InvoiceListItem, InvoiceResponse } from './dto/invoice.dto.js';

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