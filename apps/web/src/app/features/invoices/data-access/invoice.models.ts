export type InvoiceStatus =
  | 'RECEIVED'
  | 'OCR_PROCESSED'
  | 'ASSIGNED'
  | 'APPROVED'
  | 'REJECTED';

export type Invoice = {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  amount: string;
  currency: string;
  invoiceDate: string;
  status: InvoiceStatus;
  assignedTo: string | null;
  ocrConfidence: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedInvoices = {
  data: Invoice[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type InvoiceHistoryItem = {
  id: string;
  invoiceId: string;
  action: 'INVOICE_CREATED' | 'OCR_PROCESSED' | 'ASSIGNED' | 'APPROVED' | 'REJECTED';
  actorId: string | null;
  comment: string | null;
  createdAt: string;
};

export type InvoiceOcrData = {
  rawText: string;
  vatNumber: string | null;
  dueDate: string | null;
  totalBeforeTax: string | null;
  totalTax: string | null;
  totalWithTax: string | null;
  processedAt: string;
};

export type InvoiceDetails = {
  invoice: Invoice;
  ocrData: InvoiceOcrData | null;
};

