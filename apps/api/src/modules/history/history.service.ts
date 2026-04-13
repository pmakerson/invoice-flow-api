import { AppError } from '../../shared/errors/app-error.js';
import { toInvoiceHistoryResponseItem } from './history.mapper.js';
import type { InvoiceRepository } from '../invoices/invoice.repository.js';
import type { HistoryRepository } from './history.repository.js';

export class HistoryService {
    constructor(private readonly invoiceRepository: InvoiceRepository, private readonly historyRepository: HistoryRepository) { }


    async getHistory(invoiceId: string) {
        const invoice = await this.invoiceRepository.findById(invoiceId);

        if (!invoice) {
            throw new AppError('Invoice not found', 404, 'INVOICE_NOT_FOUND');
        }

        const history = await this.historyRepository.listByInvoiceId(invoiceId);
        return history.map(toInvoiceHistoryResponseItem);
    }
}