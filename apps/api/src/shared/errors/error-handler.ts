import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import z, { ZodError } from 'zod';
import { AppError } from './app-error.js';

export function registerErrorHandler(app: FastifyInstance): void {
    app.setErrorHandler((error: Error, _request: FastifyRequest, reply: FastifyReply) => {
        if (error instanceof AppError) {
            reply.status(error.statusCode).send({
                message: error.message,
                code: error.code
            });
            return;
        }

        if (error instanceof ZodError) {
            reply.status(400).send({
                message: 'Validation error',
                code: 'VALIDATION_ERROR',
                details:  z.flattenError(error)
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