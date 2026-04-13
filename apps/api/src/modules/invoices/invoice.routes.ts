import type { FastifyInstance } from 'fastify';
import { invoiceController } from './invoice.controller.js';

const invoiceStatusEnum = [
    'RECEIVED',
    'OCR_PROCESSED',
    'ASSIGNED',
    'APPROVED',
    'REJECTED',
] as const;

const nullableStringSchema = {
    type: ['string', 'null'],
};

const invoiceItemSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        invoiceNumber: { type: 'string' },
        supplierName: { type: 'string' },
        amount: { type: 'string' },
        currency: { type: 'string' },
        invoiceDate: { type: 'string' },
        status: { type: 'string' },
        assignedTo: nullableStringSchema,
        ocrConfidence: nullableStringSchema,
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
    },
};

const createInvoiceBodySchema = {
    type: 'object',
    required: [
        'invoiceNumber',
        'supplierName',
        'amount',
        'currency',
        'invoiceDate',
    ],
    properties: {
        invoiceNumber: { type: 'string' },
        supplierName: { type: 'string' },
        amount: { type: 'string' },
        currency: {
            type: 'string',
            minLength: 3,
            maxLength: 3,
        },
        invoiceDate: {
            type: 'string',
            format: 'date',
        },
    },
};

const createInvoiceResponseSchema = invoiceItemSchema;

const listInvoicesQuerySchema = {
    type: 'object',
    properties: {
        page: { type: 'integer', minimum: 1, default: 1 },
        pageSize: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
        status: {
            type: 'string',
            enum: invoiceStatusEnum,
        },
        supplierName: { type: 'string' },
    },
};

const listInvoicesResponseSchema = {
    type: 'object',
    properties: {
        data: {
            type: 'array',
            items: invoiceItemSchema,
        },
        meta: {
            type: 'object',
            properties: {
                page: { type: 'integer' },
                pageSize: { type: 'integer' },
                total: { type: 'integer' },
                totalPages: { type: 'integer' },
            },
        },
    },
};

const createInvoiceRouteSchema = {
    tags: ['Invoices'],
    summary: 'Create invoice',
    body: createInvoiceBodySchema,
    response: {
        201: createInvoiceResponseSchema,
    },
};

const listInvoicesRouteSchema = {
    tags: ['Invoices'],
    summary: 'List invoices',
    querystring: listInvoicesQuerySchema,
    response: {
        200: listInvoicesResponseSchema,
    },
};

const invoiceDetailsRouteSchema = {
    tags: ['Invoices'],
    summary: 'Get invoice details',
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid' }
        }
    }
};
export async function invoiceRoutes(app: FastifyInstance): Promise<void> {
    app.post(
        '/invoices',
        { schema: createInvoiceRouteSchema },
        invoiceController.create.bind(invoiceController),
    );

    app.get(
        '/invoices',
        { schema: listInvoicesRouteSchema },
        invoiceController.list.bind(invoiceController),
    );
    app.get(
        '/invoices/:id',
        { schema: invoiceDetailsRouteSchema },
        invoiceController.details.bind(invoiceController)
    );
}