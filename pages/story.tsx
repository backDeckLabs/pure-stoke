import { cmsRequest } from '@/lib/hygraph'

export default function About({ pageData }) {
  console.log('page data: ', pageData)
  return (
    <div className="p-8">
      <h1 className="text-5xl text-center">{pageData.story.title}</h1>
      <div className="mt-8 mx-auto max-w-4xl flex flex-col gap-6">
        {pageData.story.sections.map((section, index) => {
          if (section.__typename === 'TextBlock') {
            return <p key={index}>{section.text}</p>
          } else if (section.__typename === 'ImageBlock') {
            return (
              <img
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

const ABOUT_PAGE_QUERY = `
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
  const pageData = await cmsRequest({
    query: ABOUT_PAGE_QUERY,
  })

  return {
    props: {
      pageData,
    },
  }
}
