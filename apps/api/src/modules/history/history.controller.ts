import type { FastifyReply, FastifyRequest } from 'fastify';
import { HistoryService } from './history.service.js';
import { InvoiceRepository } from '../invoices/invoice.repository.js';
import { HistoryRepository } from './history.repository.js';
import { invoiceIdParamsSchema } from '../invoices/invoice.schemas.js';


const historyService = new HistoryService(new InvoiceRepository(), new HistoryRepository());

export class HistoryController {
  async history(request: FastifyRequest, reply: FastifyReply) {
    const params = invoiceIdParamsSchema.parse(request.params);
    const result = await historyService.getHistory(params.id);

    return reply.status(200).send(result);
  }
}

export const historyController = new HistoryController();