export type ReferenceLink = {
  type: 'page' | 'post' | 'article' | 'archive' | 'work' | 'person';
  label?: string;
  link: string;
};

export type Link = {
  type: 'page' | 'post' | 'article' | 'archive' | 'url' | 'work' | 'person';
  label?: string;
  link: string;
};

export type ImageBlock = {
  src: ImageMetadata;
  alt?: string;
  caption?: string;
};

export type SeoType = {
  siteTitle?: string;
  title?: string;
  description?: string;
  featuredImage?: {
    alt?: string;
    image: ImageMetadata;
  };
};

export type Details = {
  framework?: string;
  cms?: string;
  database?: string;
  versions?: number;
};
