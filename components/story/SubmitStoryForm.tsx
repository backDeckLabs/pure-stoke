import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  List,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { Field } from '@/components/ui/field'
import SectionTextBlock from './SectionTextBlock'
import SectionImageBlock from './SectionImageBlock'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { emailValidationPattern, stringToSlug } from '@/lib/form-utils'
import { cmsRequest } from '@/lib/hygraph'
import { uploadImage } from '@/lib/image-upload'
import { LuImage, LuText } from 'react-icons/lu'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '../ui/dialog'
import Link from 'next/link'
import { routeMap } from '@/lib/route-map'
import { Alert } from '../ui/alert'

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
  id: number
  type: StorySectionType
  value: StorySectionValue
}

export interface SubmitStoryFormProps {
  /** Soul to submit a story for */
  soul: string
}

const SubmitStoryForm: FC<SubmitStoryFormProps> = ({ soul }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [storySections, setStorySections] = useState<StorySection[]>([])
  const [showStorySectionsError, setShowStorySectionsError] = useState(false)
  const [submissionLoading, setSubmissionLoading] = useState(false)
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
  const [errorDuringSubmit, setErrorDuringSubmit] = useState(false)

  useEffect(() => {
    if (storySections.length > 0) {
      setShowStorySectionsError(false)
    }
  }, [storySections])

  const handleAddSection = (type: StorySectionType) => {
    setStorySections((prev) => [
      ...prev,
      { id: Date.now(), type, value: type === 'TextBlock' ? '' : null },
    ])
  }

  const handleRemoveSection = (id: number) => {
    setStorySections((prev) => prev.filter((section) => section.id !== id))
  }

  const handleSectionChange = (index: number, newValue: StorySectionValue) => {
    const updatedSections = [...storySections]
    updatedSections[index].value = newValue
    setStorySections(updatedSections)
  }

  const resetStoryForm = () => {
    setStorySections([])
    reset()
  }

  const handleStorySubmit = handleSubmit(async (data) => {
    setSubmissionLoading(true)

    const filteredSections = storySections.filter((section) => !!section.value)
    if (filteredSections.length === 0) {
      setShowStorySectionsError(true)
      setSubmissionLoading(false)
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

    try {
      console.log('creating story...')
      await cmsRequest({
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
      resetStoryForm()
    } catch (error) {
      console.log('error creating story: ', error)
      setErrorDuringSubmit(true)
    } finally {
      setSubmissionLoading(false)
      setShowSubmitSuccess(true)
    }
  })

  return (
    <Box>
      <Stack gap="4">
        <Heading
          size={{ base: '2xl', md: '4xl', lg: '5xl' }}
          textAlign="center"
        >
          Share The Stoke
        </Heading>
        <Box maxW="600px" mx="auto" my="4">
          <Text fontSize="xl" w="full" textAlign="center">
            Ground Rules
          </Text>
          <List.Root
            pl="4"
            as="ol"
            listStyle="decimal"
            display="flex"
            flexDir="column"
            gap="1"
            mt="2"
          >
            <List.Item>
              Leave your sorries at the door. If you have condolences to share,
              please do so directly with the Baxter family.
            </List.Item>
            <List.Item>
              This space is for sharing stories of pure stoke that you
              experienced with the man, the myth, the legend: Dave Baxter.
            </List.Item>
            <List.Item>
              So think back, dig deep, and remember the good times spent with
              Moondoggie that still put a smile on your face today.
            </List.Item>
            <List.Item>
              Feel free to submit as many stories as you want, with as many
              photos as you want...and don&apos;t leave out any details.
            </List.Item>
            <List.Item>Submissions from all ages are welcome.</List.Item>
          </List.Root>
        </Box>
      </Stack>

      <Box as="form" w="600px" mx="auto" mt="10" onSubmit={handleStorySubmit}>
        <Stack gap={4}>
          <Flex gap="2">
            <Field
              label="Your Name"
              invalid={!!errors['authorName']}
              errorText={errors['authorName']?.message as string}
            >
              <Input
                type="text"
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
            </Field>

            <Field
              label="Email Address"
              invalid={!!errors['authorEmail']}
              errorText={errors['authorEmail']?.message as string}
            >
              <Input
                type="text"
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
            </Field>
          </Flex>

          <Separator my="4" size="md" variant="dashed" />

          <Field
            label="Story Title"
            invalid={!!errors['storyTitle']}
            errorText={errors['storyTitle']?.message as string}
          >
            <Input
              type="text"
              size="lg"
              {...register('storyTitle', {
                required: {
                  value: true,
                  message: 'Please add a title for your story',
                },
              })}
            />
          </Field>
        </Stack>

        {/* Dynamic Sections */}
        <Box mt="4">
          {storySections.map((section, index) => (
            <Box key={section.id} mb="2">
              {section.type === 'TextBlock' ? (
                <SectionTextBlock
                  onChange={(val) => handleSectionChange(index, val)}
                  onRemove={() => handleRemoveSection(section.id)}
                />
              ) : (
                <SectionImageBlock
                  onChange={(val) => handleSectionChange(index, val)}
                  onRemove={() => handleRemoveSection(section.id)}
                />
              )}
            </Box>
          ))}
        </Box>

        {showStorySectionsError && (
          <Alert
            status="error"
            title="Please add at least one section to your story"
            mt="4"
          />
        )}

        <Flex mt="10" gap="2">
          <Button
            type="button"
            colorPalette="cyan"
            variant="ghost"
            size="sm"
            flexGrow={1}
            onClick={() => handleAddSection('TextBlock')}
          >
            Add Text Section <LuText />
          </Button>
          <Button
            type="button"
            colorPalette="purple"
            variant="ghost"
            size="sm"
            flexGrow={1}
            onClick={() => handleAddSection('ImageBlock')}
          >
            Add Image Section <LuImage />
          </Button>
        </Flex>

        <Center>
          <Button type="submit" loading={submissionLoading} mt="10" w="full">
            Share Story
          </Button>
        </Center>
      </Box>
      <DialogRoot
        lazyMount
        open={showSubmitSuccess}
        onOpenChange={(e) => setShowSubmitSuccess(e.open)}
        size="md"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Story Submitted!</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {errorDuringSubmit ? (
              <Text>
                Unfortunately an error occurred while submitting your story.
                Please try again later and contact Colin Baxter if you need help
                - cbaxter713@gmail.com
              </Text>
            ) : (
              <Stack>
                <Text>
                  Thanks for taking the time to share one of your cherised
                  memories with Dave!
                </Text>
                <Text>
                  Your story has been submitted. The Baxter family will reach to
                  you soon via the email address you provided, and will let you
                  know when the story is being published on the site.
                </Text>
                <Text mt="4">Cheers!</Text>
              </Stack>
            )}
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Share another story</Button>
            </DialogActionTrigger>
            <Link href={routeMap.soul(soul)}>
              <Button colorPalette="teal">Read more stoke</Button>
            </Link>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  )
}

export default SubmitStoryForm
