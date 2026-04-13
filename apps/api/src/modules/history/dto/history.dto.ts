
export type InvoiceHistoryAction =
    | 'INVOICE_CREATED'
    | 'OCR_PROCESSED'
    | 'ASSIGNED'
    | 'APPROVED'
    | 'REJECTED';

export type InvoiceHistoryItem = {
    id: string;
    invoiceId: string;
    action: InvoiceHistoryAction;
    actorId: string | null;
    comment: string | null;
    createdAt: Date;
};

export type InvoiceHistoryResponseItem = {
    id: string;
    invoiceId: string;
    action: InvoiceHistoryAction;
    actorId: string | null;
    comment: string | null;
    createdAt: string;
};