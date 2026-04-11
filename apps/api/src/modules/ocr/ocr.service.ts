import { randomUUID } from 'crypto';
import { OcrRepository } from '../ocr/ocr.repository.js';
import { FakeOcrService } from './fake-ocr.service.js';
import { toOcrProcessResponse } from './ocr.mapper.js';
import { AppError } from '../../shared/errors/app-error.js';
import type { InvoiceRepository } from '../invoices/invoice.repository.js';


export class OcrService {
    constructor(
        private readonly invoiceRepository: InvoiceRepository,
        private readonly ocrRepository: OcrRepository,
        private readonly fakeOcrService: FakeOcrService
    ) { }



    async processOcr(invoiceId: string) {
        const invoice = await this.invoiceRepository.findById(invoiceId);

        if (!invoice) {
            throw new AppError('Invoice not found', 404, 'INVOICE_NOT_FOUND');
        }

        if (invoice.status !== 'RECEIVED') {
            throw new AppError(
                'OCR can only be processed for invoices in RECEIVED status',
                409,
                'OCR_INVALID_STATUS'
            );
        }

        const ocrResult = await this.fakeOcrService.process({
            invoiceNumber: invoice.invoiceNumber,
            supplierName: invoice.supplierName,
            amount: invoice.amount,
            currency: invoice.currency,
            invoiceDate: invoice.invoiceDate
        });

        const result = await this.ocrRepository.processOcr({
            invoiceId,
            ocrDataId: randomUUID(),
            historyId: randomUUID(),
            actorId: null,
            confidence: ocrResult.confidence,
            rawText: ocrResult.rawText,
            vatNumber: ocrResult.vatNumber,
            dueDate: ocrResult.dueDate,
            totalBeforeTax: ocrResult.totalBeforeTax,
            totalTax: ocrResult.totalTax,
            totalWithTax: ocrResult.totalWithTax
        });

        if (!result.invoice || !result.ocrData) {
            throw new AppError('OCR processing result is incomplete', 500, 'OCR_PROCESSING_INCOMPLETE');
        }

        return toOcrProcessResponse({
            invoice: result.invoice,
            ocrData: result.ocrData
        });
    }


}