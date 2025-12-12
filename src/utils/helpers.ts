import cta from '@components/blocks/CTA.astro';
import hero from '@components/blocks/Hero.astro';
import NoBlock from '@components/NoBlock.astro';
import richText from '@components/blocks/RichText.astro';
import infoBlock from '@components/blocks/InfoBlock.astro';
import relatedContent from '@components/blocks/RelatedContent.astro';

import tabs from '@components/blocks/Tabs.astro';
import faqs from '@components/blocks/FAQS.astro';
import imageGallery from '@components/blocks/ImageGallery.astro';
import featuredContent from '@components/blocks/FeaturedContent.astro';
import latestWork from '@components/blocks/LastestWork.astro';

type Mapping = {
  [name: string]: any;
};

export const mapping: Mapping = {
  cta,
  faqs,
  featuredContent,
  hero,
  imageGallery,
  infoBlock,
  latestWork,
  relatedContent,
  richText,
  tabs,
};

export function getBlockByName(name: string) {
  return mapping[name] ?? NoBlock;
}
