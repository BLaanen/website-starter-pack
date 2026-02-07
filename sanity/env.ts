import { env } from '@/lib/env';

export const sanityEnv = {
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  readToken: env.SANITY_API_READ_TOKEN,
  writeToken: env.SANITY_API_WRITE_TOKEN,
};
