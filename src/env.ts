import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = z
  .enum(['production', 'preview', 'development'])
  .default('development')

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().url().min(1),
  },
  shared: {
    NODE_ENV: nodeEnv,
    VERCEL_ENV: z
      .enum(['production', 'preview', 'development'])
      .default('development'),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
})
