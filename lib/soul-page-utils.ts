import { Soul, SoulQueryResponse, Story } from '@/types/cms-response-types'

export const SOUL_PAGE_QUERY = `
  query GetSoul($slug: String!) {
    soul(where: {slug: $slug}) {
      firstName
      lastName
      slug
      emailContactListId
      blurb
      image {
        url(transformation: {image: {resize: {width: 800}}})
      }
      story(first: 1000) {
        title
        slug
        authorFirstName
        authorLastName
        sections {
          ... on ImageBlock {
            __typename
            id
            image {
              url(transformation: {image: {resize: {width: 800}}})
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

export const getSoulFullName = (soul: Soul) => {
  return `${soul.firstName} ${soul.lastName}`
}

export const getAuthorFullname = (story: Story) => {
  return `${story.authorFirstName} ${story.authorLastName}`
}

export const getStoryImage = (story: Story) => {
  const firstImageBlock = story.sections.find(
    (section) => section.__typename === 'ImageBlock'
  )
  return firstImageBlock ? firstImageBlock?.image?.url : ''
}
