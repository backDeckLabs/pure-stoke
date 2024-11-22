import { Box, BoxProps } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

export interface ContentContainerProps extends BoxProps {
  /** Content to display inside the container */
  children: ReactNode
  /** Constrain container for text content */
  text?: boolean
  /** Conditionally prevent horizontal padding */
  fullScreenWidth?: boolean
}

export const ContentContainer: FC<ContentContainerProps> = ({
  children,
  text = false,
  fullScreenWidth = false,
  ...props
}) => {
  const maxContainerWidth = text ? '800px' : '1440px'

  return (
    <Box
      w="full"
      maxW={maxContainerWidth}
      px={fullScreenWidth ? 0 : 6}
      mx="auto"
      {...props}
    >
      {children}
    </Box>
  )
}
