import { emailValidationPattern, stringToSlug } from '@/lib/form-utils'
import { cmsRequest } from '@/lib/hygraph'
import {
  ALL_SOULS_QUERY,
  AllSoulPages,
  SOUL_PAGE_QUERY,
} from '@/lib/soul-page-utils'
import { SoulQueryResponse } from '@/types/cms-response-types'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export default function ShareTheStoke() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  const { soul } = router.query

  const CREATE_STORY_MUTATION = `
    mutation CreateStory($title: String!, $slug: String!, $soulSlug: String!, $authorName: String!, $authorEmail: String!, $sections: StorysectionsUnionCreateManyInlineInput) {
      createStory(
        data: {
          title: $title, 
          slug: $slug, 
          soul: {connect: {slug: $soulSlug}}, 
          authorName: $authorName,
          authorEmail: $authorEmail,
          sections: $sections
        }
      ) {
        id
        slug
      }
    }
  `

  const handleStorySubmit = handleSubmit(async (data) => {
    try {
      const storyResponse = await cmsRequest({
        query: CREATE_STORY_MUTATION,
        variables: {
          title: data.storyTitle,
          slug: stringToSlug(data.storyTitle),
          soulSlug: soul,
          authorName: data.authorName,
          authorEmail: data.authorEmail,
          sections: {
            create: [
              {
                TextBlock: {
                  text: data.story,
                },
              },
            ],
          },
        },
      })
      console.log('story response: ', storyResponse)
    } catch (error) {
      console.log('error creating story: ', error)
    }
  })

  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl">Share The Stoke</h1>
        <form
          className="flex flex-col gap-4"
          style={{ width: '400px' }}
          onSubmit={handleStorySubmit}
        >
          <label className="flex flex-col gap-2">
            <span>Your Name</span>
            <input
              type="text"
              className="text-black"
              {...register('authorName', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
                maxLength: {
                  value: 128,
                  message: 'Name must be less than 128 characters',
                },
              })}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span>Your Email</span>
            <input
              type="email"
              className="text-black"
              {...register('authorEmail', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value: emailValidationPattern,
                  message: 'Enter a valid email address',
                },
              })}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span>Story Title</span>
            <input
              type="text"
              className="text-black"
              {...register('storyTitle', {
                required: {
                  value: true,
                  message: 'Title is required',
                },
              })}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span>Story</span>
            <textarea
              className="text-black"
              rows={8}
              cols={20}
              {...register('story', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
              })}
            />
          </label>
          <button className="bg-white text-black py-2 px-2" type="submit">
            Share Story
          </button>
        </form>
      </main>
    </div>
  )
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.soul

  if (!params || !slug) {
    return {
      notFound: true,
    }
  }

  const pageData = await cmsRequest<SoulQueryResponse>({
    query: SOUL_PAGE_QUERY,
    variables: { slug: slug },
  })

  if (!pageData.soul) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pageData,
      soulSlug: slug,
    },
  }
}

export async function getStaticPaths() {
  const pages = (await cmsRequest({
    query: ALL_SOULS_QUERY,
  })) as AllSoulPages

  const paths = pages?.souls.map((soul) => ({
    params: { soul: soul.slug },
  }))

  return { paths, fallback: 'blocking' }
}
