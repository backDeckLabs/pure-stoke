import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { SoulQueryResponse } from '@/types/cms-response-types'
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
import { Center, Grid, Heading } from '@chakra-ui/react'
import { routeMap } from '@/lib/route-map'
import { Button } from '@/components/ui/button'

export default function SoulLandingPage({
  pageData,
  soulSlug,
}: SoulLandingPageProps) {
  return (
    <PageWrapper>
      <ContentContainer>
        <Heading size="5xl" textAlign="center">
          {pageData.soul.name}
        </Heading>
        <Center mt="6" mb="10">
          <Link href={routeMap.shareTheStoke(soulSlug)}>
            <Button>Share the Stoke</Button>
          </Link>
        </Center>

        <Heading size="3xl">Stories</Heading>
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap="4" mt="6">
          {pageData.soul.story.map((story, index) => (
            <Link
              key={index}
              href={`/${soulSlug}/${story.slug}`}
              className="text-xl underline"
            >
              {story.title}
            </Link>
          ))}
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
