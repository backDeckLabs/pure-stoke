import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/button'
import { routeMap } from '@/lib/route-map'
import { Heading } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <PageWrapper>
      <ContentContainer textAlign="center">
        <Heading size="3xl">Pure Stoke</Heading>
        <Link href={routeMap.soul('daveydawg')}>
          <Button mt="6">Davey Dawg</Button>
        </Link>
      </ContentContainer>
    </PageWrapper>
  )
}
