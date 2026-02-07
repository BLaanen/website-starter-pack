// Object types
import { seo } from './objects/seo';
import { portableText } from './objects/portableText';

// Block types
import { imageBlock } from './blocks/imageBlock';
import { videoEmbed } from './blocks/videoEmbed';
import { callout } from './blocks/callout';
import { ctaButton } from './blocks/ctaButton';

// Document types
import { author } from './documents/author';
import { category } from './documents/category';
import { page } from './documents/page';
import { post } from './documents/post';
import { siteSettings } from './documents/siteSettings';

export const schemaTypes = [
  // Objects
  seo,
  portableText,
  // Blocks
  imageBlock,
  videoEmbed,
  callout,
  ctaButton,
  // Documents
  author,
  category,
  page,
  post,
  siteSettings,
];
