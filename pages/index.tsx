import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import LogoMask from '@/components/patterns/LogoMask'
import { Button } from '@/components/ui/button'
import { routeMap } from '@/lib/route-map'
import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <PageWrapper>
      <ContentContainer textAlign="center">
        <Center>
          <LogoMask width="1000px" />
        </Center>

        <Heading size="2xl" mt="20" mb="15" fontStyle="italic">
          A community driven storytelling space
        </Heading>

        <Stack my="10" maxW="600px" mx="auto" textAlign="left" gap="6">
          <Text>
            Pure Stoke is the vision of the late, great, Dave Baxter. He
            didn&apos;t exactly know what &quot;it&quot; was, but he knew what
            it stood for - a lifestyle of joy, gratitude, and always finding the
            best in everything.
          </Text>
          <Text>
            This site is a tribute to Dave, and a place for all of us to share
            the Stoke.
          </Text>
        </Stack>

        <Link href={routeMap.soul('daveydawg')}>
          <Button mt="10">Davey Dawg</Button>
        </Link>
      </ContentContainer>
    </PageWrapper>
  )
}
