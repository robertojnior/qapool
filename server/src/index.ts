import './config/env';

import { join } from 'node:path';

import Autoload from '@fastify/autoload';
import Fastify from 'fastify';
import { z } from 'zod';

import schema from './config/schema';

const server = Fastify({
  logger: true,
});

server.register(Autoload, {
  dir: join(import.meta.dirname, 'routes'),
});

server.register(schema);

const port = z.coerce.number().parse(process.env.PORT);

const start = async () => {
  try {
    await server.listen({ port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
