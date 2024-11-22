import { Box } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

export interface PageWrapperProps {
  /** Content to display in the page */
  children: ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <Box py={{ base: '10', md: '16' }} data-test="page-wrapper">
      {children}
    </Box>
  )
}

export default PageWrapper
