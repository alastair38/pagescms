import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { boolean } from 'astro:schema';

// Utilities

const links = z
  .array(
    z.object({
      type: z.enum([
        'page',
        'post',
        'article',
        'archive',
        'url',
        'work',
        'person',
        'template',
      ]),
      label: z.string().optional(),
      link: z.string(),
    }),
  )
  .optional();

const relatedPages = z
  .array(
    reference('work') ||
      reference('page') ||
      reference('article') ||
      reference('template') ||
      reference('person'),
  )
  .optional();

const home = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/data/home' }),
  schema: ({ image }) =>
    z.object({
      meta: z
        .object({
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
              }),
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
              }),
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
              }),
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
              }),
            ),
          }),
          z.object({
            __typename: z.literal('latestWork'),
            title: z.string(),
            description: z.string().optional(),
            itemsToShow: z.number().optional(),
          }),
          z.object({
            __typename: z.literal('process'),
            title: z.string().optional(),
            description: z.string().optional(),
            links: links,
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
              }),
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
              }),
            ),
          }),
          z.object({
            __typename: z.literal('team'),
            title: z.string().optional(),
            description: z.string().optional(),
            links: links,
          }),
        ]),
      ),
      // Reference an array of related content
    }),
});

const page = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/pages' }),
  schema: ({ image }) =>
    z.object({
      meta: z
        .object({
          title: z.string(),
          subHeading: z.string().optional(),
          description: z.string(),
          fullPage: z.boolean().optional(),
          featuredImage: z
            .object({
              image: image(),
              alt: z.string(),
              caption: z.string().optional(),
              variant: z.enum(['rounded', 'plain']).optional(),
              layout: z.enum(['default', 'grid']).optional(),
            })
            .optional(),
          relatedPages: relatedPages,
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
              }),
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
              }),
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
              }),
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
              }),
            ),
          }),
          z.object({
            __typename: z.literal('latestWork'),
            title: z.string(),
            description: z.string().optional(),
            itemsToShow: z.number().optional(),
          }),
          z.object({
            __typename: z.literal('process'),
            title: z.string().optional(),
            description: z.string().optional(),
            links: links,
            sections: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
              }),
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
              }),
            ),
          }),
          z.object({
            __typename: z.literal('team'),
            title: z.string().optional(),
            description: z.string().optional(),
            links: links,
          }),
        ]),
      ),
    }),
});

const article = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/articles' }),
  schema: ({ image }) =>
    z.object({
      meta: z
        .object({
          pubDate: z.date().optional(),
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
          showFeaturedImage: z.boolean().optional().default(false),
          authors: z.array(reference('person')).optional(),
          relatedPages: relatedPages,
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
              }),
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
              }),
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
              }),
            ),
          }),
        ]),
      ),
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
      jobTitle: z.string().optional(),
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
      bio: z.string(),
    }),
});

const template = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/templates' }),
  schema: ({ image }) =>
    z.object({
      meta: z
        .object({
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
          demo: z.string().url().optional(),
          details: z
            .object({
              framework: z.string().optional(),
              cms: z.string().optional(),
              database: z.string().optional(),
              mediaHandling: z.boolean().optional(),
              contentUpdates: z.boolean().optional(),
              vendorFree: z.boolean().optional(),
              versions: z.number().optional(),
            })
            .optional(),
          pricing: z
            .object({
              template: z.number().optional(),
              setup: z.number().optional(),
              addons: z.number().optional(),
              support: z.number().optional(),
            })
            .optional(),
        })
        .optional(),
      slider: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/work' }),
  schema: ({ image }) =>
    z.object({
      meta: z
        .object({
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
          demo: z.string().url().optional(),
          details: z
            .object({
              framework: z.string().optional(),
              cms: z.string().optional(),
              database: z.string().optional(),
              mediaHandling: z.boolean().optional(),
              contentUpdates: z.boolean().optional(),
              vendorFree: z.boolean().optional(),
              versions: z.number().optional(),
            })
            .optional(),
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
          }),
        )
        .optional(),
      demo: z.string().url().optional(),
    }),
});

const pricing = defineCollection({
  loader: glob({ pattern: '**/pricing.md', base: './src/data/settings' }),
  schema: ({ image }) =>
    z.object({
      template: z.object({
        heading: z.string(),
        description: z.string().optional(),
      }),
      setup: z.object({
        heading: z.string(),
        description: z.string().optional(),
      }),
      addons: z.object({
        heading: z.string(),
        description: z.string().optional(),
      }),
      support: z.object({
        heading: z.string(),
        description: z.string().optional(),
      }),
    }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/main.md', base: './src/data/settings' }),
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
        theme: z
          .enum([
            'amber',
            'emerald',
            'indigo',
            'neutral-cyan',
            'neutral-indigo',
            'neutral-pink',
            'neutral-purple',
            'neutral-red',
            'neutral-teal',
            'pink',
            'purple',
            'teal',
            'light',
            'dark',
            'auto',
          ])
          .default('emerald'),
        duotone: z.boolean().default(true),
        transitions: z.boolean().default(true),
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
            }),
          ),
        })
        .optional(),
      footerNavigation: z
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
            }),
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
  pricing,
};
