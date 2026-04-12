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
