import Fastify from 'fastify';
import cors from '@fastify/cors';
import { halfvec } from 'drizzle-orm/pg-core';
import { registerErrorHandler } from '../shared/errors/error-handler.js';

export async function buildApp() {
    const app = Fastify({
        logger: true
    });
    await app.register(cors, {
        origin: true
    });

    registerErrorHandler(app);
    return app;
}