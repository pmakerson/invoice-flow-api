import { buildApp } from './app.js';
import { env } from '../config/env.js';

async function start() {
    const app = await buildApp();
    try {
        await app.listen({
            port: env.PORT,
            host: env.HOST
        });
        app.log.info(`API running on http://${env.HOST}:${env.PORT}`);
        app.log.info(`Swagger available on http://${env.HOST}:${env.PORT}/docs`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

void start();