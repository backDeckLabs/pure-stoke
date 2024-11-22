import SectionImageBlock from '@/components/story/SectionImageBlock'
import SectionTextBlock from '@/components/story/SectionTextBlock'
import { emailValidationPattern, stringToSlug } from '@/lib/form-utils'
import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { uploadImage } from '@/lib/image-upload'
import {
  ALL_SOULS_QUERY,
  AllSoulPages,
  SOUL_PAGE_QUERY,
} from '@/lib/soul-page-utils'
import { SoulQueryResponse } from '@/types/cms-response-types'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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

type StorySectionType = 'TextBlock' | 'ImageBlock'
type StorySectionValue = string | File | null

type StorySection = {
  type: StorySectionType
  value: StorySectionValue
}

export default function ShareTheStoke() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [storySections, setStorySections] = useState<StorySection[]>([])

  const { soul } = router.query

  const handleAddSection = (type: StorySectionType) => {
    setStorySections((prev) => [
      ...prev,
      { type, value: type === 'TextBlock' ? '' : null },
    ])
  }

  const handleSectionChange = (index: number, newValue: StorySectionValue) => {
    const updatedSections = [...storySections]
    updatedSections[index].value = newValue
    setStorySections(updatedSections)
  }

  const handleStorySubmit = handleSubmit(async (data) => {
    console.log('story sections: ', storySections)

    const filteredSections = storySections.filter((section) => !!section.value)
    if (filteredSections.length === 0) {
      console.log('No sections added')
      // TODO: handle error here
      return
    }

    // Loop through sections and upload any images
    const sectionsJson = await Promise.all(
      filteredSections.map(async (section) => {
        if (section.type === 'ImageBlock') {
          const file = section.value as File
          const imageId = await uploadImage(file)

          console.log('image id is: ', imageId)

          // Formatted ImageBlock section json
          return {
            ImageBlock: {
              image: {
                connect: {
                  id: imageId,
                },
              },
            },
          }
        }

        // Formatted TextBlock section json
        return {
          TextBlock: {
            text: section.value as string,
          },
        }
      })
    )

    console.log('sections json: ', sectionsJson)

    try {
      console.log('creating story...')
      const storyResponse = await cmsRequest({
        query: CREATE_STORY_MUTATION,
        variables: {
          title: data.storyTitle,
          slug: stringToSlug(data.storyTitle),
          soulSlug: soul,
          authorName: data.authorName,
          authorEmail: data.authorEmail,
          sections: {
            create: sectionsJson,
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

          {/* Dynamic Sections */}
          <div>
            {storySections.map((section, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                {section.type === 'TextBlock' ? (
                  <SectionTextBlock
                    onChange={(val) => handleSectionChange(index, val)}
                  />
                ) : (
                  <SectionImageBlock
                    onChange={(val) => handleSectionChange(index, val)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Section Controls */}
          <div style={{ margin: '20px 0' }}>
            <button
              type="button"
              onClick={() => handleAddSection('TextBlock')}
              style={{ marginRight: '10px' }}
            >
              Add Text Section
            </button>
            <button
              type="button"
              onClick={() => handleAddSection('ImageBlock')}
            >
              Add Image Section
            </button>
          </div>
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

  const pageData = await throttledCmsRequest<SoulQueryResponse>(
    SOUL_PAGE_QUERY,
    { slug }
  )

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
