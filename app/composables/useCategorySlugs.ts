export const CATEGORY_SLUG_MAP: Record<string, string> = {
  'skin-care': 'Skin Care',
  'body-care': 'Body Care',
  'hair-care': 'Hair Care',
  makeup: 'Makeup',
  'korean-care': 'Korean Care',
  korean: 'Korean Care',
  'baby-care': 'Baby Care',
  kids: 'Baby Care',
}

export function slugToCategoryName(slug: string): string {
  return CATEGORY_SLUG_MAP[slug] ?? 'Collection'
}

export function categoryNameToSlug(name: string): string {
  const entry = Object.entries(CATEGORY_SLUG_MAP).find(([, label]) => label === name)
  return entry?.[0] ?? name.toLowerCase().replace(/\s+/g, '-')
}
