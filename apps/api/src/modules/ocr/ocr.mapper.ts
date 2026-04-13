import type { InvoiceListItem } from '../invoices/dto/invoice.dto.js';
import type { OcrProcessResponse, OcrData } from './dto/ocr.dto.js';
import { toInvoiceResponse } from '../invoices/invoice.mapper.js';


export function toOcrProcessResponse(input: {
    invoice: InvoiceListItem;
    ocrData: OcrData;
}): OcrProcessResponse {
    return {
        invoice: toInvoiceResponse(input.invoice),
        ocrData: {
            rawText: input.ocrData.rawText,
            vatNumber: input.ocrData.vatNumber,
            dueDate: input.ocrData.dueDate,
            totalBeforeTax: input.ocrData.totalBeforeTax,
            totalTax: input.ocrData.totalTax,
            totalWithTax: input.ocrData.totalWithTax,
            processedAt: input.ocrData.processedAt.toISOString()
        }
    };
}