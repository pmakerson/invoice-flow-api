import type { InvoiceResponse } from "../../invoices/dto/invoice.dto.js";

export type OcrProcessResponse = {
  invoice: InvoiceResponse;
  ocrData: {
    rawText: string;
    vatNumber: string | null;
    dueDate: string | null;
    totalBeforeTax: string | null;
    totalTax: string | null;
    totalWithTax: string | null;
    processedAt: string;
  };
};