import { SoulQueryResponse } from '@/types/cms-response-types'

export const SOUL_PAGE_QUERY = `
  query GetSoul($slug: String!) {
      soul(where: {slug: $slug}) {
      name
      slug
      story(first: 1000) {
        title
        slug
      }
    }
  }
`

export const ALL_SOULS_QUERY = `
  query GetAllSouls {
    souls(first: 1000) {
      slug
    }
  }
`

export type AllSoulPages = {
  souls: {
    slug: string
  }[]
}

export type SoulLandingPageProps = {
  pageData: SoulQueryResponse
  soulSlug: string
}
