import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import BackLink from '@/components/ui/BackLink'
import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { routeMap } from '@/lib/route-map'
import { StoryQueryResponse } from '@/types/cms-response-types'
import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'

export default function StoryPage({
  pageData,
}: {
  pageData: StoryQueryResponse
}) {
  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink
          href={routeMap.soul(pageData.story.soul.slug)}
          label={pageData.story.soul.name}
        />
        <Center gap="4" flexDir="column">
          <Heading
            size={{ base: '2xl', md: '4xl', lg: '5xl' }}
            textAlign="center"
          >
            {pageData.story.title}
          </Heading>
          <Text>By {pageData.story.authorName}</Text>
        </Center>
      </ContentContainer>

      <ContentContainer text mt="10">
        <Stack gap={{ base: 8, md: 12 }}>
          {pageData.story.sections.map((section, index) => {
            if (section.__typename === 'TextBlock') {
              return <Text key={index}>{section.text}</Text>
            } else if (section.__typename === 'ImageBlock') {
              return (
                <Image
                  key={index}
                  src={section?.image?.url}
                  alt="A cool image"
                  className="mx-auto"
                  width={1200}
                  height={800}
                />
              )
            }
          })}
        </Stack>
      </ContentContainer>
    </PageWrapper>
  )
}

const STORY_QUERY = `
  query GetStory($slug: String!) {
    story(where: {slug: $slug}) {
      title
      slug
      authorName
      soul {
        slug
        name
      }
      sections {
          ... on TextBlock {
          __typename
          text
        }
        ... on ImageBlock {
          __typename
          image {
            url
          }
        }
      }
    }
  }
`

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.storySlug

  if (!params || !slug) {
    return {
      notFound: true,
    }
  }

  const pageData = await throttledCmsRequest<StoryQueryResponse>(STORY_QUERY, {
    slug,
  })

  if (!pageData.story) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pageData,
      revalidate: 60,
    },
  }
}

const ALL_STORIES_QUERY = `
  query GetAllStories {
    stories(first: 1000) {
      slug
      soul {
        slug
      }
    }
  }
`

type AllStoryPages = {
  stories: {
    slug: string
    soul: {
      slug: string
    }
  }[]
}

export async function getStaticPaths() {
  const pages = (await cmsRequest({
    query: ALL_STORIES_QUERY,
  })) as AllStoryPages

  const paths = pages?.stories.map((story) => ({
    params: { storySlug: story.slug, soul: story.soul.slug },
  }))

  return { paths, fallback: 'blocking' }
}
