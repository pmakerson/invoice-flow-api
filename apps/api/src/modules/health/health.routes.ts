import type { FastifyInstance } from 'fastify';

const healthSchema = {
    tags: ['Health'],
    summary: 'Health check',
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
            },
        },
    },
};

export async function healthRoutes(app: FastifyInstance): Promise<void> {
    app.get('/health', { schema: healthSchema }, async () => {
        return { status: 'ok' };
    });
}