export type InvoiceStatus =
  | 'RECEIVED'
  | 'OCR_PROCESSED'
  | 'ASSIGNED'
  | 'APPROVED'
  | 'REJECTED';

export type CreateInvoiceInput = {
  invoiceNumber: string;
  supplierName: string;
  amount: string;
  currency: string;
  invoiceDate: string;
};

export type ListInvoicesQuery = {
  page: number;
  pageSize: number;
  status?: InvoiceStatus | undefined;
  supplierName?: string | undefined;
};

export type InvoiceListItem = {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  amount: string;
  currency: string;
  invoiceDate: string;
  status: InvoiceStatus;
  assignedTo: string | null;
  ocrConfidence: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type InvoiceResponse = {
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
  data: InvoiceResponse[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};