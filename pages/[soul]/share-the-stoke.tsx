import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import SubmitStoryForm from '@/components/story/SubmitStoryForm'
import BackLink from '@/components/ui/BackLink'
import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { routeMap } from '@/lib/route-map'
import {
  ALL_SOULS_QUERY,
  AllSoulPages,
  SOUL_PAGE_QUERY,
  SoulLandingPageProps,
} from '@/lib/soul-page-utils'
import { SoulQueryResponse } from '@/types/cms-response-types'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

export default function ShareTheStoke({ pageData }: SoulLandingPageProps) {
  const router = useRouter()
  const { soul } = router.query

  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink
          href={routeMap.soul(pageData.soul.slug)}
          label={pageData.soul.name}
        />
        <SubmitStoryForm soul={soul as string} />
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
