import { routeMap } from '@/lib/route-map'
import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import { ContentContainer } from '../layout/ContentContainer'
import { ColorModeButton } from '../ui/color-mode'
import LogoSvg from '../patterns/LogoSvg'

/**
 * Global Header component, displayed in the DefaultLayout
 */
const AppHeader: FC = () => {
  return (
    <Box
      position="relative"
      as="header"
      h="60px"
      borderBottom="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
      zIndex={{ base: '1302', md: '1302' }}
    >
      <ContentContainer h="full">
        <Flex align="center" justify="space-between" h="full" py="3">
          <Link href={routeMap.home()} aria-label="Home Page">
            <LogoSvg fontSize="100px" color="currentColor" />
          </Link>
          <ColorModeButton />
        </Flex>
      </ContentContainer>
    </Box>
  )
}

export default AppHeader
