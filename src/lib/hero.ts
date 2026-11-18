import type { ImageMetadata } from 'astro';

// The hero photo is self-hosted once `src/assets/hero.jpg` exists in the repo.
// Astro then serves it in sized, modern formats from /_astro/ (hashed, cacheable).
// Until the file is added, the page falls back to the original Unsplash URL,
// so the build never breaks.
const found = import.meta.glob<{ default: ImageMetadata }>('../assets/hero.{jpg,jpeg,png,webp}', {
  eager: true,
});

export const heroImage: ImageMetadata | undefined = Object.values(found)[0]?.default;

export const HERO_FALLBACK_URL =
  'https://images.unsplash.com/photo-1696694162142-a6ebdb9c016b?auto=format&fit=crop&fm=jpg&q=80&w=2000';

export const HERO_ALT =
  'Zwart-wit architectuurfoto van een glazen gebouw in premium zakelijke stijl';
