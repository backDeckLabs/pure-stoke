import { cmsRequest, throttledCmsRequest } from '@/lib/hygraph'
import { SoulQueryResponse } from '@/types/cms-response-types'
import Link from 'next/link'
import { GetStaticPropsContext } from 'next'
import {
  ALL_SOULS_QUERY,
  AllSoulPages,
  SOUL_PAGE_QUERY,
} from '@/lib/soul-page-utils'

type SoulLandingPageProps = {
  pageData: SoulQueryResponse
  soulSlug: string
}

export default function SoulLandingPage({
  pageData,
  soulSlug,
}: SoulLandingPageProps) {
  return (
    <div>
      <Link href="/">{`< Home`}</Link>
      <main>
        <h1>{pageData.soul.name}</h1>
        <Link href={`/${soulSlug}/share-the-stoke`}>Share the Stoke</Link>
        <h3>Stories</h3>
        {pageData.soul.story.map((story, index) => (
          <Link
            key={index}
            href={`/${soulSlug}/${story.slug}`}
            className="text-xl underline"
          >
            {story.title}
          </Link>
        ))}
      </main>
      <footer>This is the footer</footer>
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
