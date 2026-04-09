import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './app-error.js';
export function registerErrorHandler(app: FastifyInstance): void {
    app.setErrorHandler((error: Error, _request: FastifyRequest, reply:
        FastifyReply) => {

        if (error instanceof AppError) {
            reply.status(error.statusCode).send({
                message: error.message,
                code: error.code
            });
            return;
        }
        app.log.error(error);
        reply.status(500).send({
            message: 'Internal server error',
            code: 'INTERNAL_SERVER_ERROR'
        });
    });
}