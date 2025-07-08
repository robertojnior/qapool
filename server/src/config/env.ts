import { z } from 'zod';

const env = z.object({
  PORT: z.string().default('3000'),
});

env.parse(process.env);

declare global {
  // biome-ignore lint/style/noNamespace: Required for NodeJS type augmentation
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
