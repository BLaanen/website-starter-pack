import { createClient } from 'next-sanity';
import { sanityEnv } from './env';

export const client = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: false, // CRITICAL: false for server-side to prevent dual-caching with Next.js cache
  perspective: 'published',
  token: sanityEnv.readToken,
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});
