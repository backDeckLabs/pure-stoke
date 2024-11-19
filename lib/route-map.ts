export const routeMap = {
  home: () => '/',
  soul: (slug: string) => `/${slug}`,
  story: (soulSlug: string, storySlug: string) => `/${soulSlug}/${storySlug}`,
  shareTheStoke: (soulSlug: string) => `/${soulSlug}/share-the-stoke`,
}
