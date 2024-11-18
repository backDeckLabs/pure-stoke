import { cmsRequest } from '@/lib/hygraph'
import { StoryQueryResponse } from '@/lib/story-utils'
import Image from 'next/image'

export default function About({ pageData }: { pageData: StoryQueryResponse }) {
  return (
    <div className="p-8">
      <h1 className="text-5xl text-center">{pageData.story.title}</h1>
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
              />
            )
          }
        })}
      </div>
    </div>
  )
}

const STORY_QUERY = `
  query GetStory {
    story(where: {slug: "first-test-story-stoke"}) {
    title
    slug
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

export async function getStaticProps() {
  const pageData = await cmsRequest<StoryQueryResponse>({
    query: STORY_QUERY,
  })

  return {
    props: {
      pageData,
    },
  }
}
