import { SoulQueryResponse } from '@/types/cms-response-types'

export const SOUL_PAGE_QUERY = `
  query GetSoul($slug: String!) {
      soul(where: {slug: $slug}) {
      name
      slug
      story(first: 1000) {
        title
        slug
        authorName
        sections {
          ... on ImageBlock {
            __typename
            id
            image {
              url(transformation: {image: {resize: {width: 300}}})
            }
          }
        }
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
