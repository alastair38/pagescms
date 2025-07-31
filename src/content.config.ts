import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featuredImage: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    isDraft: z.boolean().default(false),
    // Reference a single author from the `authors` collection by `id`
    author: z.array(reference('authors')).optional(),
    // Reference an array of related posts from the `blog` collection by `slug`
    relatedPosts: z.array(reference('blog')).optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/authors' }),
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    profile: z.string().url().optional(),
    contact: z
      .array(z.object({ label: z.string(), link: z.string().url() }))
      .optional(),
  }),
});

export const collections = { blog, authors };
