import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'v5mn2swc',
  dataset: 'production',
  apiVersion: '2025-03-21',
  useCdn: true, // Use CDN in public client
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);