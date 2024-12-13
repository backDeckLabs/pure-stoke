export const routeMap = {
  home: () => '/',
  soul: (slug: string) => `/${slug}`,
  story: (storySlug: string) => `/story/${storySlug}`,
  shareTheStoke: (soulSlug: string) => `/${soulSlug}/share-the-stoke`,
}
