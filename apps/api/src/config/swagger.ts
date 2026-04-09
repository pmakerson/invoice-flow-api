import type { FastifyInstance } from "fastify";
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export async function registerSwagger(app: FastifyInstance): Promise<void> {
    await app.register(swagger, {
        openapi: {
            info: {
                title: 'Invoice Workflow API',
                description: 'Mini API portfolio de traitement de factures fournisseurs',
                version: '1.0.0'
            }
        }
    });
    await app.register(swaggerUi, {
        routePrefix: '/docs'
    });
}