/* eslint-env node */

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Create Sanity client
export const client = createClient({
  projectId: 'v5mn2swc',
  dataset: 'production',
  apiVersion: '2025-03-21',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Make sure to use an environment variable for the token
});

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Utility function to get image URL
export const urlFor = (source) => builder.image(source);
