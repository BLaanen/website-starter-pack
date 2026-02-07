import { z } from 'zod';

/**
 * Centralized environment variable validation using Zod.
 *
 * This module validates all required environment variables at import time,
 * ensuring the app fails fast with clear error messages if configuration is missing.
 *
 * IMPORTANT: During Vercel builds, this file is imported by next.config.ts before
 * server environment variables are available. Set SKIP_ENV_VALIDATION=true in
 * Vercel build settings to skip server-side validation during config evaluation.
 * Server vars are still validated at runtime when the app starts.
 */

// Server-side environment variables (secrets, not exposed to client)
const serverSchema = z.object({
  SANITY_API_READ_TOKEN: z
    .string()
    .min(1, 'Sanity read token is required -- obtain from sanity.io/manage -> API -> Tokens'),
  SANITY_API_WRITE_TOKEN: z
    .string()
    .min(1, 'Sanity write token is required -- obtain from sanity.io/manage -> API -> Tokens'),
});

// Public environment variables (exposed to client via NEXT_PUBLIC_ prefix)
const publicSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z
    .string()
    .min(1, 'Sanity project ID is required -- obtain from sanity.io/manage -> Project settings'),
  NEXT_PUBLIC_SANITY_DATASET: z
    .string()
    .min(1, "Sanity dataset is required -- usually 'production'"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .optional()
    .default('http://localhost:3000'),
});

// Combined schema for full validation
const envSchema = serverSchema.merge(publicSchema);

// Skip server-side validation during Vercel build config evaluation
const shouldSkipServerValidation = process.env.SKIP_ENV_VALIDATION === 'true';

let env: z.infer<typeof envSchema>;

try {
  if (shouldSkipServerValidation) {
    // During build config evaluation, only validate public vars
    const publicEnv = publicSchema.parse({
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });

    // Create partial env object with empty server vars for build config
    env = {
      ...publicEnv,
      SANITY_API_READ_TOKEN: '',
      SANITY_API_WRITE_TOKEN: '',
    };
  } else {
    // Standard validation: all env vars required
    env = envSchema.parse({
      SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
      SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });
  }
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    throw new Error(
      'Invalid environment variables -- see errors above. Copy .env.local.example to .env.local and fill in values.'
    );
  }
  throw error;
}

export { env };
