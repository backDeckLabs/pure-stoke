/* eslint-disable @next/next/no-img-element */
import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { SoulQueryResponse, Story } from '@/types/cms-response-types'
import Link from 'next/link'
import { GetStaticPropsContext } from 'next'
import {
  ALL_SOULS_QUERY,
  AllSoulPages,
  SOUL_PAGE_QUERY,
  SoulLandingPageProps,
} from '@/lib/soul-page-utils'
import PageWrapper from '@/components/layout/PageWrapper'
import { ContentContainer } from '@/components/layout/ContentContainer'
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { routeMap } from '@/lib/route-map'
import { Button } from '@/components/ui/button'

export default function SoulLandingPage({
  pageData,
  soulSlug,
}: SoulLandingPageProps) {
  const getStoryImage = (story: Story) => {
    const firstImageBlock = story.sections.find(
      (section) => section.__typename === 'ImageBlock'
    )
    return firstImageBlock ? firstImageBlock?.image?.url : ''
  }

  return (
    <PageWrapper>
      <ContentContainer>
        <Heading
          size={{ base: '2xl', md: '4xl', lg: '5xl' }}
          textAlign="center"
        >
          {pageData.soul.name}
        </Heading>
        <Stack my="8" maxW="800px" mx="auto">
          {pageData.soul?.blurb && <Text>{pageData.soul.blurb}</Text>}
        </Stack>
        <Center mt="6" mb="10">
          <Link href={routeMap.shareTheStoke(soulSlug)}>
            <Button>Share your story</Button>
          </Link>
        </Center>

        <Heading size="3xl">Stories</Heading>
        <Grid
          gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))"
          gap="4"
          mt="6"
        >
          {pageData.soul.story.map((story, index) => {
            const storyImage = getStoryImage(story)

            const bgStyles = storyImage
              ? { bg: 'grey.1000' }
              : {
                  bg: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
                  bgSize: '400% 400%',
                  animation: 'gradientAnimation 7s ease infinite',
                  animationDelay: 'calc(var(--animation-order) * 0.5s)',
                }

            return (
              <Link
                key={index}
                href={`/${soulSlug}/${story.slug}`}
                className="text-xl underline"
              >
                <Box w="full">
                  <AspectRatio ratio={16 / 9}>
                    <Flex
                      w="full"
                      h="full"
                      {...bgStyles}
                      style={
                        {
                          '--animation-order': `${index + 10}`,
                        } as React.CSSProperties
                      }
                      align="flex-end"
                      justify="flex-end"
                    >
                      {storyImage && (
                        <img
                          src={storyImage}
                          alt="A cool image"
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.8,
                          }}
                        />
                      )}
                      <Flex
                        direction="column"
                        justify="flex-end"
                        position="absolute"
                        bottom="0"
                        left="0"
                        w="full"
                        h="100%"
                        p="4"
                        zIndex="1"
                        bg="linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 70%)"
                        pointerEvents="none"
                      >
                        <Box color="white">
                          <Text fontSize="2xl" fontWeight="bold">
                            {story.title}
                          </Text>
                          <Text>By {story.authorName}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </AspectRatio>
                </Box>
              </Link>
            )
          })}
        </Grid>
      </ContentContainer>
    </PageWrapper>
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
