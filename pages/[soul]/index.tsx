/* eslint-disable @next/next/no-img-element */
import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { SoulQueryResponse, Story } from '@/types/cms-response-types'
import Link from 'next/link'
import { GetStaticPropsContext } from 'next'
import {
  ALL_SOULS_QUERY,
  AllSoulPages,
  getAuthorFullname,
  getSoulFullName,
  getStoryImage,
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
import SeoTags from '@/components/seo/SeoTags'

export default function SoulLandingPage({
  pageData,
  soulSlug,
}: SoulLandingPageProps) {
  const soulImage = pageData.soul.image?.url

  const fullName = getSoulFullName(pageData.soul)

  return (
    <PageWrapper>
      <SeoTags
        title={fullName}
        image={pageData.soul.image?.url}
        description={pageData.soul.blurb}
      />
      <ContentContainer>
        <Flex
          flexDirection={{ base: 'column', sm: 'row' }}
          gap={{ base: '4', sm: '6', md: '10' }}
          maxW="1000px"
          mx="auto"
          mb="20"
        >
          {soulImage ? (
            <Box
              position="relative"
              w="100%"
              maxW="400px"
              borderRadius="12px"
              overflow="hidden"
              pointerEvents="none"
            >
              <img
                src={soulImage}
                alt={`Picture of ${fullName}`}
                style={{ width: '100%' }}
              />
            </Box>
          ) : null}

          <Box textAlign="left">
            <Heading size={{ base: '4xl', md: '5xl', lg: '6xl' }}>
              {fullName}
            </Heading>
            <Stack mt="6" maxW="800px" mx="auto">
              {pageData.soul?.blurb && (
                <Text whiteSpace="pre-line">{pageData.soul.blurb}</Text>
              )}
              <Center mt="10">
                <Link href={routeMap.shareTheStoke(soulSlug)}>
                  <Button>Share your story</Button>
                </Link>
              </Center>
            </Stack>
          </Box>
        </Flex>

        <Grid
          gridTemplateColumns={{
            base: 'repeat(auto-fill, minmax(325px, 1fr))',
            xl: 'repeat(3, 1fr)',
          }}
          gap="4"
          mt="6"
        >
          {pageData.soul.story.map((story, index) => {
            const storyImage = getStoryImage(story)

            const bgStyles = storyImage
              ? { bg: 'gray.950' }
              : {
                  bg: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
                  bgSize: '400% 400%',
                  animation: 'gradientAnimation 7s ease infinite',
                  animationDelay: 'calc(var(--animation-order) * 0.5s)',
                }

            return (
              <Link
                key={index}
                href={routeMap.story(story.slug)}
                className="text-xl underline"
              >
                <Box w="full" borderRadius="4px" overflow="hidden">
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
                          <Text>By {getAuthorFullname(story)}</Text>
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

export async function getStaticProps({
  params,
  preview,
}: GetStaticPropsContext) {
  const slug = params?.soul

  if (!params || !slug) {
    return {
      notFound: true,
    }
  }

  const pageData = await throttledCmsRequest<SoulQueryResponse>(
    SOUL_PAGE_QUERY,
    { slug },
    preview
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
