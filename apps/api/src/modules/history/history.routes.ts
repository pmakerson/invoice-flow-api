import type { FastifyInstance } from 'fastify';
import { historyController } from './history.controller.js';
const invoiceIdParamsSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'string', format: 'uuid' },
    },
};

const invoiceHistoryRouteSchema = {
    tags: ['Invoices'],
    summary: 'Get invoice history',
    params: invoiceIdParamsSchema,
};

export async function historyRoutes(app: FastifyInstance): Promise<void> {
    app.get(
        '/invoices/history/:id',
        { schema: invoiceHistoryRouteSchema },
        historyController.history.bind(historyController),
    );
}