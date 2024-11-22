import { cmsRequest } from '@/lib/hygraph'
import { StoryQueryResponse } from '@/types/cms-response-types'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export default function StoryPage({
  pageData,
}: {
  pageData: StoryQueryResponse
}) {
  return (
    <div className="p-8">
      <Link href={`/${pageData.story.soul.slug}`} className="text-xl underline">
        {`< ${pageData.story.soul.name}`}
      </Link>
      <h1 className="text-5xl text-center">{pageData.story.title}</h1>
      <p className="text-center">By {pageData.story.authorName}</p>
      <div className="mt-8 mx-auto max-w-4xl flex flex-col gap-6">
        {pageData.story.sections.map((section, index) => {
          if (section.__typename === 'TextBlock') {
            return <p key={index}>{section.text}</p>
          } else if (section.__typename === 'ImageBlock') {
            return (
              <Image
                key={index}
                src={section.image.url}
                alt="A cool image"
                className="mx-auto"
                width={1200}
                height={800}
              />
            )
          }
        })}
      </div>
    </div>
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

  console.log('build story: ', slug)

  if (!params || !slug) {
    return {
      notFound: true,
    }
  }

  const pageData = await cmsRequest<StoryQueryResponse>({
    query: STORY_QUERY,
    variables: { slug: slug },
  })

  console.log('page data: ', pageData)

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
    stories {
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
