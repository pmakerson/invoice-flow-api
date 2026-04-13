import { randomUUID } from 'node:crypto';
import { buildPagination } from '../../shared/http/pagination.js';
import type { CreateInvoiceInput, ListInvoicesQuery } from './dto/invoice.dto.js';
import { toInvoiceDetailsResponse, toInvoiceResponse } from './invoice.mapper.js';
import { InvoiceRepository } from './invoice.repository.js';
import { AppError } from '../../shared/errors/app-error.js';

export class InvoiceService {
    constructor(private readonly invoiceRepository: InvoiceRepository) { }

    async create(input: CreateInvoiceInput) {
        const PG_UNIQUE_VIOLATION = '23505'; // PostgreSQL unique constraint violation
        try {
            const created = await this.invoiceRepository.create({
                ...input,
                id: randomUUID(),
                historyId: randomUUID(),
                actorId: null
            });
            return toInvoiceResponse(created!);
        } catch (err: any) {
            if (
                err.code === PG_UNIQUE_VIOLATION ||
                err?.parent?.code === PG_UNIQUE_VIOLATION ||
                err?.cause?.code === PG_UNIQUE_VIOLATION
            ) {
                throw new AppError(
                    'Une facture avec ces informations existe déjà.',
                    409,
                    'INVOICE_DUPLICATE'
                );
            }
            throw err;
        }
    }

    async list(query: ListInvoicesQuery) {
        const result = await this.invoiceRepository.list(query);

        return {
            data: result.rows.map(toInvoiceResponse),
            meta: buildPagination(query.page, query.pageSize, result.total)
        };
    }

    async getDetails(invoiceId: string) {
        const invoice = await this.invoiceRepository.findById(invoiceId);

        if (!invoice) {
            throw new AppError('Invoice not found', 404, 'INVOICE_NOT_FOUND');
        }

        const ocrData = await this.invoiceRepository.findOcrDataByInvoiceId(invoiceId);

        return toInvoiceDetailsResponse({
            invoice,
            ocrData
        });
    }
}