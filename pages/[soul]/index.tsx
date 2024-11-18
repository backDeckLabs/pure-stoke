import { cmsRequest } from '@/lib/hygraph'
import { SoulQueryResponse } from '@/types/cms-response-types'
import Link from 'next/link'
import { GetStaticPropsContext } from 'next'

type SoulLandingPageProps = {
  pageData: SoulQueryResponse
  soulSlug: string
}

export default function SoulLandingPage({
  pageData,
  soulSlug,
}: SoulLandingPageProps) {
  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <Link href="/" className="text-xl underline">
        {`< Home`}
      </Link>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl">{pageData.soul.name}</h1>
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
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        This is the footer
      </footer>
    </div>
  )
}

const SOUL_QUERY = `
  query GetSoul($slug: String!) {
      soul(where: {slug: $slug}) {
      name
      story {
        title
        slug
      }
    }
  }
`

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.soul

  if (!params || !slug) {
    return {
      notFound: true,
    }
  }

  const pageData = await cmsRequest<SoulQueryResponse>({
    query: SOUL_QUERY,
    variables: { slug: slug },
  })

  return {
    props: {
      pageData,
      soulSlug: slug,
    },
  }
}

export async function getStaticPaths() {
  // const pages = (await cmsRequest({
  //   query: ALL_LEGAL_PAGES_QUERY,
  // })) as AllLegalPages

  // const paths = pages?.allLegalPages.map((page) => ({
  //   params: { slug: page.slug },
  // }))

  const paths = [{ params: { soul: 'dave', storySlug: 'test' } }]
  return { paths, fallback: 'blocking' }
}
