import { Text } from '@chakra-ui/react'
import React, { FC } from 'react'

/**
 * Display body copy formatted for legibility
 */
export interface BodyCopyProps {
  /** Copy to display in the component. Line breaks are respected when rendering */
  copy: string
}

const BodyCopy: FC<BodyCopyProps> = ({ copy }) => {
  const renderStringWithLinks = (input: string) => {
    // Regular expression to detect absolute URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g

    // Split the input string based on the URLs
    const parts = input.split(urlRegex)

    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <a href={part} key={index} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      )
    )
  }

  return (
    <Text
      lineHeight="1.6"
      fontSize={{ base: 'md', md: 'lg' }}
      whiteSpace="pre-line"
      css={{
        '& a': {
          color: 'teal',
          textDecoration: 'underline',
          fontWeight: '500',
        },
      }}
    >
      {renderStringWithLinks(copy)}
    </Text>
  )
}

export default BodyCopy
