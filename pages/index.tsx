import { ContentContainer } from '@/components/layout/ContentContainer'
import PageWrapper from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/button'
import { routeMap } from '@/lib/route-map'
import { Box, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <PageWrapper>
      <ContentContainer textAlign="center">
        <Box position="relative">
          <Heading size="7xl" fontSize="100px" letterSpacing="50px">
            STOKE
          </Heading>
          <Heading
            position="absolute"
            top="50%"
            left="51%"
            transform="translate(-50%, -50%)"
            size="2xl"
            letterSpacing="90px"
          >
            PURE
          </Heading>
        </Box>

        <Text my="10">Some words here about the gist of PureStoke</Text>

        <Link href={routeMap.soul('daveydawg')}>
          <Button mt="20">Davey Dawg</Button>
        </Link>
      </ContentContainer>
    </PageWrapper>
  )
}
