import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import BodyCopy from '@/components/patterns/BodyCopy'
import LogoMask from '@/components/patterns/LogoMask'
import { Button } from '@/components/ui/button'
import { routeMap } from '@/lib/route-map'
import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { LuArrowRight } from 'react-icons/lu'

export default function Home() {
  const homePageCopy = `
  Pure Stoke is the vision of the late, great, Dave Baxter. He didn't exactly know what "it" was, but he knew what it stood for - a lifestyle of joy, gratitude, and always finding the best in everything. A lens through which to experience the world.

  This site is a living tribute to Dave, and a place for all of us to share the Stoke.
  `

  return (
    <PageWrapper>
      <ContentContainer textAlign="center">
        <Center>
          <LogoMask width="1300px" />
        </Center>

        <Heading size="2xl" mt="20" mb="15" fontStyle="italic">
          A community driven storytelling space
        </Heading>

        <Stack my="10" maxW="650px" mx="auto" textAlign="left" gap="6">
          <BodyCopy copy={homePageCopy} />
          {/* <Text>
            Pure Stoke is the vision of the late, great, Dave Baxter. He
            didn&apos;t exactly know what &quot;it&quot; was, but he knew what
            it stood for - a lifestyle of joy, gratitude, and always finding the
            best in everything. A lens through which to experience the world.
          </Text>
          <Text>
            This site is a living tribute to Dave, and a place for all of us to
            share the Stoke.
          </Text> */}
        </Stack>

        <Link href={routeMap.soul('daveydawg')}>
          <Button mt="6" size="xl">
            Davey Dawg
            <LuArrowRight />
          </Button>
        </Link>
      </ContentContainer>
    </PageWrapper>
  )
}
