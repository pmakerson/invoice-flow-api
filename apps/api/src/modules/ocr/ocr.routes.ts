import type { FastifyInstance } from 'fastify';
import { ocrController } from './ocr.controller.js';


const uuidParamSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'string', format: 'uuid' },
    },
};

const nullableString = { type: ['string', 'null'] };

const invoiceSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        invoiceNumber: { type: 'string' },
        supplierName: { type: 'string' },
        amount: { type: 'string' },
        currency: { type: 'string' },
        invoiceDate: { type: 'string' },
        status: { type: 'string' },
        assignedTo: nullableString,
        ocrConfidence: nullableString,
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
    },
};

const ocrDataSchema = {
    type: 'object',
    properties: {
        rawText: { type: 'string' },
        vatNumber: nullableString,
        dueDate: nullableString,
        totalBeforeTax: nullableString,
        totalTax: nullableString,
        totalWithTax: nullableString,
        processedAt: { type: 'string' },
    },
};

const processOcrResponseSchema = {
    type: 'object',
    properties: {
        invoice: invoiceSchema,
        ocrData: ocrDataSchema,
    },
};

const processOcrRouteSchema = {
    tags: ['Invoices'],
    summary: 'Process fake OCR for an invoice',
    params: uuidParamSchema,
    response: {
        200: processOcrResponseSchema,
    },
};
export async function ocrRoutes(app: FastifyInstance): Promise<void> {
    app.post('/invoices/:id/process-ocr',
        { schema: processOcrRouteSchema },
        ocrController.processOcr.bind(ocrController)
    );
}