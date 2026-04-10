import type { FastifyReply, FastifyRequest } from 'fastify';
import { createInvoiceBodySchema, listInvoicesQuerySchema } from './invoice.schemas.js';
import { InvoiceRepository } from './invoice.repository.js';
import { InvoiceService } from './invoice.service.js';

const invoiceService = new InvoiceService(new InvoiceRepository());

export class InvoiceController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = createInvoiceBodySchema.parse(request.body);
    const invoice = await invoiceService.create(body);

    return reply.status(201).send(invoice);
  }

  async list(request: FastifyRequest) {
    const query = listInvoicesQuerySchema.parse(request.query);
    return invoiceService.list(query);
  }
}

export const invoiceController = new InvoiceController();