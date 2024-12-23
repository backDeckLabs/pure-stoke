import { Text } from '@chakra-ui/react'
import React, { FC } from 'react'

export interface BodyCopyProps {
  /** Copy to display in the component. Line breaks are respected when rendering */
  copy: string
}

const BodyCopy: FC<BodyCopyProps> = ({ copy }) => {
  return (
    <Text
      lineHeight="1.6"
      fontSize={{ base: 'md', md: 'lg' }}
      whiteSpace="pre-line"
    >
      {copy}
    </Text>
  )
}

export default BodyCopy
