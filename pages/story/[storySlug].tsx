/* eslint-disable @next/next/no-img-element */
import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import FadeImg from '@/components/patterns/FadeImg'
import SeoTags from '@/components/seo/SeoTags'
import BackLink from '@/components/ui/BackLink'
import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { truncateString } from '@/lib/js-utils'
import { routeMap } from '@/lib/route-map'
import {
  getAuthorFullname,
  getSoulFullName,
  getStoryImage,
} from '@/lib/soul-page-utils'
import { StoryQueryResponse } from '@/types/cms-response-types'
import { AspectRatio, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'

export default function StoryPage({
  pageData,
}: {
  pageData: StoryQueryResponse
}) {
  const textBlocks = pageData.story.sections.filter(
    (section) => section.__typename === 'TextBlock'
  )
  const storyText = textBlocks.map((block) => block.text).join(' ')
  const seoDescription = truncateString(storyText, 160)

  return (
    <PageWrapper>
      <SeoTags
        title={pageData.story.title}
        description={seoDescription}
        image={getStoryImage(pageData.story)}
        label1="Written by"
        data1={getAuthorFullname(pageData.story)}
        label2="Written about"
        data2={getSoulFullName(pageData.story.soul)}
      />
      <ContentContainer>
        <BackLink
          href={routeMap.soul(pageData.story.soul.slug)}
          label={getSoulFullName(pageData.story.soul)}
        />
        <Center gap="4" flexDir="column" maxW="750px" mx="auto">
          <Heading
            size={{ base: '2xl', md: '4xl', lg: '5xl' }}
            textAlign="center"
          >
            {pageData.story.title}
          </Heading>
          <Heading
            fontSize={{ base: 'md', md: 'md', lg: 'lg' }}
            color={{ base: 'gray.600', _dark: 'gray.300' }}
          >
            By {getAuthorFullname(pageData.story)}
          </Heading>
        </Center>
      </ContentContainer>

      <ContentContainer text mt={{ base: 12, md: 16 }}>
        <Stack gap={{ base: 8, md: 12 }}>
          {pageData.story.sections.map((section, index) => {
            if (section.__typename === 'TextBlock') {
              return <Text key={index}>{section.text}</Text>
            } else if (section.__typename === 'ImageBlock') {
              const image = section.image
              return (
                <AspectRatio key={index} ratio={image?.width / image?.height}>
                  <FadeImg src={image?.url} alt="A cool image" />
                </AspectRatio>
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
      authorFirstName
      authorLastName
      soul {
        slug
        firstName
        lastName
      }
      sections(first: 100) {
        ... on TextBlock {
          __typename
          text
        }
        ... on ImageBlock {
          __typename
          image {
            height
            width
            url(transformation: {image: {resize: {width: 2400}}})
          }
        }
      }
    }
  }
`

export async function getStaticProps({
  params,
  preview,
}: GetStaticPropsContext) {
  const slug = params?.storySlug

  if (!params || !slug) {
    return {
      notFound: true,
    }
  }

  const pageData = await throttledCmsRequest<StoryQueryResponse>(
    STORY_QUERY,
    {
      slug,
    },
    preview
  )

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
