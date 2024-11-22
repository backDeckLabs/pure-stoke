import { routeMap } from '@/lib/route-map'
import { Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import { ContentContainer } from '../layout/ContentContainer'
import { ColorModeButton } from '../ui/color-mode'

/**
 * Global Header component, displayed in the DefaultLayout
 */
const AppHeader: FC = () => {
  return (
    <Box
      position="relative"
      as="header"
      h={5}
      borderBottom="1px"
      borderColor="grey.500"
      zIndex={{ base: '1302', md: '1302' }}
    >
      <ContentContainer h="full">
        <Flex align="center" justify="space-between" h="full">
          <Link href={routeMap.home()} aria-label="Home Page">
            <Text>PURE STOKE</Text>
          </Link>
          <ColorModeButton />
        </Flex>
      </ContentContainer>
    </Box>
  )
}

export default AppHeader
