import { Box, Heading } from '@chakra-ui/react'
import React, { FC } from 'react'

const Logo: FC = () => {
  return (
    <Box
      position="relative"
      transform={{ base: 'scale(0.5)', md: 'scale(0.75)', lg: 'scale(1)' }}
    >
      <Heading size="7xl" fontSize="100px" letterSpacing="50px">
        PURE
      </Heading>
      <Heading
        position="absolute"
        top="50%"
        left="52%"
        transform="translate(-50%, -50%)"
        size="2xl"
        letterSpacing="100px"
      >
        STOKE
      </Heading>
    </Box>
  )
}

export default Logo
