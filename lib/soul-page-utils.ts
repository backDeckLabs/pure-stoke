export const SOUL_PAGE_QUERY = `
  query GetSoul($slug: String!) {
      soul(where: {slug: $slug}) {
      name
      story {
        title
        slug
      }
    }
  }
`

export const ALL_SOULS_QUERY = `
  query GetAllSouls {
    souls {
      slug
    }
  }
`

export type AllSoulPages = {
  souls: {
    slug: string
  }[]
}
