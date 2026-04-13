import type { InvoiceHistoryItem, InvoiceHistoryResponseItem } from "./dto/history.dto.js";

export function toInvoiceHistoryResponseItem(item: InvoiceHistoryItem): InvoiceHistoryResponseItem {
    return {
        id: item.id,
        invoiceId: item.invoiceId,
        action: item.action,
        actorId: item.actorId,
        comment: item.comment,
        createdAt: item.createdAt.toISOString()
    };
}