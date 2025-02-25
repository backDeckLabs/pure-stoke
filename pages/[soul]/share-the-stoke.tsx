import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import SeoTags from '@/components/seo/SeoTags'
import SubmitStoryForm from '@/components/story/SubmitStoryForm'
import BackLink from '@/components/ui/BackLink'
import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { routeMap } from '@/lib/route-map'
import {
  ALL_SOULS_QUERY,
  AllSoulPages,
  getSoulFullName,
  SOUL_PAGE_QUERY,
  SoulLandingPageProps,
} from '@/lib/soul-page-utils'
import { SoulQueryResponse } from '@/types/cms-response-types'
import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'

export default function ShareTheStoke({ pageData }: SoulLandingPageProps) {
  return (
    <PageWrapper>
      <SeoTags
        title={'Share the Stoke'}
        description={`Remember a time you spent with ${pageData.soul.firstName} that made you feel alive, piss your pants laughing, or just plain happy? Share it here!`}
      />
      <ContentContainer>
        <BackLink
          href={routeMap.soul(pageData.soul.slug)}
          label={getSoulFullName(pageData.soul)}
        />
        <Box mt="4">
          <SubmitStoryForm soul={pageData.soul} />
        </Box>
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
