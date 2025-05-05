import { createClient } from 'next-sanity';

export const serverClient = createClient({
  projectId: 'v5mn2swc',
  dataset: 'production',
  apiVersion: '2025-03-21',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // ONLY used server-side
});
