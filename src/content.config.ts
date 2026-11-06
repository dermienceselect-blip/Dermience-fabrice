import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import categories from './data/categories.json';

const projets = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projets',
    generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) => z.object({
    titre: z.string(),
    categorie: z.enum(categories as [string, ...string[]]),
    description: z.string().optional().default(''),
    couverture: image(),
    a_la_une: z.boolean().default(false),
    ordre: z.number().default(99),
    photos: z.array(z.object({ image: image(), legende: z.string().optional() })).default([]),
  }),
});

export const collections = { projets };
