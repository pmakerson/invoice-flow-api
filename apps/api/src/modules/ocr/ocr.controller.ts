import type { FastifyReply, FastifyRequest } from 'fastify';
import { OcrService } from './ocr.service.js';
import { OcrRepository } from './ocr.repository.js';
import { InvoiceRepository } from '../invoices/invoice.repository.js';
import { FakeOcrService } from './fake-ocr.service.js';
import { invoiceIdParamsSchema } from '../invoices/invoice.schemas.js';

const ocrService = new OcrService(new InvoiceRepository(), new OcrRepository(), new FakeOcrService());

export class OcrController {
  async processOcr(request: FastifyRequest, reply: FastifyReply) {
    const params = invoiceIdParamsSchema.parse(request.params);
    const result = await ocrService.processOcr(params.id);

    return reply.status(200).send(result);
  }
}

export const ocrController = new OcrController();