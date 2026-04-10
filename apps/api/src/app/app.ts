import Fastify from 'fastify';
import cors from '@fastify/cors';
import { registerErrorHandler } from '../shared/errors/error-handler.js';
import { registerSwagger } from '../config/swagger.js';
import { healthRoutes } from '../modules/health/health.routes.js';
import { invoiceRoutes } from '../modules/invoices/invoice.routes.js';

export async function buildApp() {
    const app = Fastify({
        logger: true
    });

    registerErrorHandler(app);

    await app.register(cors, {
        origin: true
    });

    await registerSwagger(app);

    await healthRoutes(app);

    await invoiceRoutes(app);

    return app;
}