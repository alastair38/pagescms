import type { CollectionEntry } from 'astro:content';
import type { ImageBlock, Link, ReferenceLink } from './utilities';

export interface CTA {
  __typename: string;
  title: string;
  description?: string;
  image?: ImageBlock;
  links?: ReferenceLink[];
}

export interface FAQs {
  __typename: string;
  title?: string;
  description?: string;
  sections: {
    title: string;
    description?: string;
    links?: ReferenceLink[];
  }[];
}

export type FeaturedContent = {
  __typename: string;
  title?: string;
  description?: string;
  sections: {
    title: string;
    description?: string;
    image?: ImageBlock;
    links?: Link[];
  }[];
};

export interface Hero {
  __typename: string;
  title: string;
  subHeading?: string;
  description?: string;
  image?: ImageBlock;
  links?: ReferenceLink[];
}

export interface ImageGallery {
  __typename: string;
  orientation: 'landscape' | 'square' | 'auto';
  spanLast?: boolean;
  images: {
    image: ImageBlock;
    alt?: string;
    caption: string;
  }[];
}

export type InfoBlock = {
  __typename: string;
  title?: string;
  description?: string;
  sections: {
    title: string;
    description?: string;
    image?: ImageBlock;
    links?: Link[];
  }[];
};

export interface LatestContent {
  __typename: string;
  title?: string;
  description?: string;
  itemsToShow?: number;
}

export interface RelatedContent {
  __typename: string;
  title?: string;
  links?: ReferenceLink[];
}

export interface RichText {
  __typename: string;
  body: string;
}

export interface Tabs {
  __typename: string;
  title?: string;
  description?: string;
  sections: {
    title: string;
    description?: string;
    links?: ReferenceLink[];
  }[];
}
