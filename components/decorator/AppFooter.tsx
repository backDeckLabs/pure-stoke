import { LEGAL_COMPANY_NAME } from '@/lib/constants'
import { Box, Heading, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ContentContainer } from '../layout/ContentContainer'

const AppFooter: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
    >
      <ContentContainer>
        <Box textAlign="center" py="6">
          <Heading size="md" fontStyle="italic" mb="2" color="gray.500">
            Built with love by Dave&apos;s kids
          </Heading>
          <Text fontSize="14px" color="gray.600">
            © {currentYear} {LEGAL_COMPANY_NAME}, All rights reserved.
          </Text>
        </Box>
      </ContentContainer>
    </Box>
  )
}

export default AppFooter
