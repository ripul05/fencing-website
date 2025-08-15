// src/sanityClient.js
import { createClient } from '@sanity/client';


export const sanityClient = createClient({
  projectId: '24fe96nu',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-08-07',
});

export async function sanityFetch(query, params = {}) {
  try {
    return await sanityClient.fetch(query, params)
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return null
  }
}


