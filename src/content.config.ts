import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Utilities

const links = z
  .array(
    z.object({
      type: z.enum(['page', 'post', 'article', 'archive', 'url', 'work']),
      label: z.string().optional(),
      link: z.string(),
    })
  )
  .optional();

const relatedPages = z
  .array(
    reference('work') ||
      reference('page') ||
      reference('article') ||
      reference('template') ||
      reference('person')
  )
  .optional();

const home = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/data/home' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      featuredImage: z
        .object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
          variant: z.enum(['rounded', 'plain']).optional(),
          layout: z.enum(['default', 'grid']).optional(),
        })
        .optional(),
      contentBlocks: z.array(
        z.discriminatedUnion('__typename', [
          z.object({
            __typename: z.literal('blockOne'),
            title: z.string(),
            experience: z.number().optional(),
          }),
          z.object({
            __typename: z.literal('blockquote'),
            quote: z.string(),
            author: z.string().optional(),
          }),
          z.object({
            __typename: z.literal('cta'),
            title: z.string(),
            description: z.string().optional(),
            links: links,
          }),
          z.object({
            __typename: z.literal('faqs'),
            title: z.string().optional(),
            description: z.string().optional(),
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                links: links,
              })
            ),
          }),
          z.object({
            __typename: z.literal('featuredContent'),
            title: z.string().optional(),
            description: z.string().optional(),
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                image: z
                  .object({
                    src: image().optional(),
                    alt: z.string().optional(),
                  })
                  .optional(),
                links: links,
              })
            ),
          }),
          z.object({
            __typename: z.literal('hero'),
            title: z.string(),
            subHeading: z.string().optional(),
            description: z.string().optional(),
            image: z
              .object({
                src: image().optional(),
                alt: z.string().optional(),
              })
              .optional(),
            links: links,
          }),
          z.object({
            __typename: z.literal('imageGallery'),
            orientation: z.enum(['landscape', 'square', 'auto']).optional(),
            spanLast: z.boolean().optional(),
            images: z.array(
              z.object({
                image: z
                  .object({
                    src: image().optional(),
                    alt: z.string().optional(),
                    caption: z.string().optional(),
                  })
                  .optional(),
              })
            ),
          }),
          z.object({
            __typename: z.literal('infoBlock'),
            title: z.string().optional(),
            description: z.string().optional(),
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                image: z
                  .object({
                    src: image().optional(),
                    alt: z.string().optional(),
                  })
                  .optional(),
                links: links,
              })
            ),
          }),
          z.object({
            __typename: z.literal('latestWork'),
            title: z.string(),
            description: z.string().optional(),
            itemsToShow: z.number().optional(),
          }),
          z.object({
            __typename: z.literal('blockTwo'),
            name: z.string(),
            description: z.string().optional(),
            image: z
              .object({ image: image().optional(), alt: z.string().optional() })
              .optional(),
          }),
          z.object({
            __typename: z.literal('relatedContent'),
            title: z.string().optional(),
            links: links,
          }),
          z.object({
            __typename: z.literal('richText'),
            body: z.string(),
          }),
          z.object({
            __typename: z.literal('tabs'),
            title: z.string().optional(),
            description: z.string().optional(),
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                links: links,
              })
            ),
          }),
        ])
      ),
      // Reference an array of related content
      relatedPages: relatedPages,
    }),
});

const page = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subHeading: z.string().optional(),
      description: z.string(),
      featuredImage: z
        .object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
          variant: z.enum(['rounded', 'plain']).optional(),
          layout: z.enum(['default', 'grid']).optional(),
        })
        .optional(),
      contentBlocks: z.array(
        z.discriminatedUnion('__typename', [
          z.object({
            __typename: z.literal('blockquote'),
            quote: z.string(),
            author: z.string().optional(),
          }),
          z.object({
            __typename: z.literal('faqs'),
            title: z.string().optional(),
            description: z.string().optional(),
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                links: links,
              })
            ),
          }),
          z.object({
            __typename: z.literal('imageGallery'),
            orientation: z.enum(['landscape', 'square', 'auto']).optional(),
            spanLast: z.boolean().optional(),
            images: z.array(
              z.object({
                image: z
                  .object({
                    src: image().optional(),
                    alt: z.string().optional(),
                    caption: z.string().optional(),
                  })
                  .optional(),
              })
            ),
          }),
          z.object({
            __typename: z.literal('relatedContent'),
            title: z.string().optional(),
            links: links,
          }),
          z.object({
            __typename: z.literal('richText'),
            body: z.string(),
          }),
          z.object({
            __typename: z.literal('tabs'),
            title: z.string().optional(),
            description: z.string().optional(),
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                links: links,
              })
            ),
          }),
        ])
      ),
      // Reference a  single author from the `authors` collection by `id`
      authors: z.array(reference('person')).optional(),
      // Reference an array of related content
      relatedPages: relatedPages,
    }),
});

const article = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/articles' }),
  schema: ({ image }) =>
    z.object({
      pubDate: z.coerce.date().optional(),
      title: z.string(),
      subHeading: z.string().optional(),
      description: z.string(),
      featuredImage: z
        .object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
          variant: z.enum(['rounded', 'plain']).optional(),
          layout: z.enum(['default', 'grid']).optional(),
        })
        .optional(),
      contentBlocks: z.array(
        z.discriminatedUnion('__typename', [
          z.object({
            __typename: z.literal('blockquote'),
            quote: z.string(),
            author: z.string().optional(),
          }),
          z.object({
            __typename: z.literal('faqs'),
            title: z.string().optional(),
            description: z.string().optional(),
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                links: links,
              })
            ),
          }),
          z.object({
            __typename: z.literal('imageGallery'),
            orientation: z.enum(['landscape', 'square', 'auto']).optional(),
            spanLast: z.boolean().optional(),
            images: z.array(
              z.object({
                image: z
                  .object({
                    src: image().optional(),
                    alt: z.string().optional(),
                    caption: z.string().optional(),
                  })
                  .optional(),
              })
            ),
          }),
          z.object({
            __typename: z.literal('relatedContent'),
            title: z.string().optional(),
            links: links,
          }),
          z.object({
            __typename: z.literal('richText'),
            body: z.string(),
          }),
          z.object({
            __typename: z.literal('tabs'),
            title: z.string().optional(),
            description: z.string().optional(),
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                links: links,
              })
            ),
          }),
        ])
      ),
      // Reference a  single author from the `authors` collection by `id`
      authors: z.array(reference('person')).optional(),
      // Reference an array of related content
      relatedPages: relatedPages,
    }),
});

const archive = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/archives' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      collection: z.enum(['template', 'work', 'article']).optional(),
      description: z.string(),
      featuredImage: z
        .object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
        })
        .optional(),
      body: z.string().optional(),
    }),
});

const person = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/people' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      featuredImage: z
        .object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
        })
        .optional(),
      profile: z.string().url().optional(),
      contact: z
        .object({
          bluesky: z
            .object({
              label: z.string(),
              link: z.string().url(),
            })
            .optional(),
          email: z
            .object({
              label: z.string(),
              link: z.string().email(),
            })
            .optional(),
          linkedin: z
            .object({
              label: z.string(),
              link: z.string().url(),
            })
            .optional(),
          x: z
            .object({
              label: z.string(),
              link: z.string().url(),
            })
            .optional(),
        })
        .optional(),
    }),
});

const template = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/templates' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      details: z
        .object({
          framework: z.string().optional(),
          cms: z.string().optional(),
          versions: z.number().optional(),
        })
        .optional(),
      featuredImage: z
        .object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
          variant: z.enum(['rounded', 'plain']).optional(),
          layout: z.enum(['default', 'grid']).optional(),
        })
        .optional(),
      slider: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .optional(),
      demo: z.string().url().optional(),
    }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      details: z
        .object({
          framework: z.string().optional(),
          cms: z.string().optional(),
          versions: z.number().optional(),
        })
        .optional(),
      featuredImage: z
        .object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
          variant: z.enum(['rounded', 'plain']).optional(),
          layout: z.enum(['default', 'grid']).optional(),
        })
        .optional(),
      slider: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .optional(),
      demo: z.string().url().optional(),
    }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/data/settings' }),
  schema: ({ image }) =>
    z.object({
      site: z.object({
        name: z.string(),
        displayName: z.string().optional(),
        description: z.string(),
        url: z.string().optional(),
        featuredImage: z.object({
          image: image(),
          alt: z.string(),
        }),
      }),
      navigation: z
        .object({
          menuLinks: z.array(
            z.object({
              type: z.enum([
                'page',
                'post',
                'article',
                'archive',
                'template',
                'url',
                'work',
              ]),
              label: z.string(),
              link: z.string(),
            })
          ),
        })
        .optional(),
    }),
});

export const collections = {
  archive,
  article,
  person,
  work,
  settings,
  page,
  home,
  template,
};
