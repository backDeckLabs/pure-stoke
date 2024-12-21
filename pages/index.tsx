import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import LogoMask from '@/components/patterns/LogoMask'
import { Button } from '@/components/ui/button'
import { getRandomIndex } from '@/lib/js-utils'
import { routeMap } from '@/lib/route-map'
import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { LuArrowRight } from 'react-icons/lu'

export default function Home({
  logoBackgroundAsset,
}: {
  logoBackgroundAsset: string
}) {
  return (
    <PageWrapper>
      <ContentContainer textAlign="center">
        <Center>
          <LogoMask width="1300px" backgroundAsset={logoBackgroundAsset} />
        </Center>

        <Heading size="2xl" mt="20" mb="15" fontStyle="italic">
          A community driven storytelling space
        </Heading>

        <Stack my="10" maxW="600px" mx="auto" textAlign="left" gap="6">
          <Text>
            Pure Stoke is the vision of the late, great, Dave Baxter. He
            didn&apos;t exactly know what &quot;it&quot; was, but he knew what
            it stood for - a lifestyle of joy, gratitude, and always finding the
            best in everything. A lens through which to experience the world.
          </Text>
          <Text>
            This site is a living tribute to Dave, and a place for all of us to
            share the Stoke.
          </Text>
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

const logoBackgroundVideoBank = [
  '/assets/videos/sailing-bg-1.mp4',
  '/assets/videos/sky-timelapse.mp4',
  '/assets/videos/surfing-water.mp4',
  '/assets/videos/ocean-waves-sunset.mp4',
]

// Randomly select a logo background asset for each page load
export async function getServerSideProps() {
  const defaultAssetIndex = getRandomIndex(logoBackgroundVideoBank.length)
  const backgroundAssetUrl = logoBackgroundVideoBank[defaultAssetIndex]

  return {
    props: {
      logoBackgroundAsset: backgroundAssetUrl,
    },
  }
}
