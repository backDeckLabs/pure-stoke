import AppFooter from '@/components/decorator/AppFooter'
import AppHeader from '@/components/decorator/AppHeader'
import { Box, Flex, SkipNavContent, SkipNavLink } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

export interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  const mainContentId = 'pure-stoke-main-content'

  return (
    <Flex direction="column" flex="1">
      <SkipNavLink id={mainContentId}>Skip to main content</SkipNavLink>
      <Box position="relative">
        <AppHeader />
      </Box>

      <SkipNavContent
        id={mainContentId}
        as="main"
        flexGrow="1"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {children}
      </SkipNavContent>
      <AppFooter />
    </Flex>
  )
}

export default DefaultLayout
