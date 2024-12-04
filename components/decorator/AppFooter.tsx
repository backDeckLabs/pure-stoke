import { LEGAL_COMPANY_NAME } from '@/lib/constants'
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ContentContainer } from '../layout/ContentContainer'

const AppFooter: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box as="footer" borderTop="1px solid" borderColor="gray.300">
      <ContentContainer>
        <Flex
          position="relative"
          py="6"
          justify="space-between"
          align="center"
          gap="4"
        >
          <Text>
            © {currentYear} {LEGAL_COMPANY_NAME}, All rights reserved.
          </Text>
        </Flex>
      </ContentContainer>
    </Box>
  )
}

export default AppFooter
