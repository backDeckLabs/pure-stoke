import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import { LuChevronLeft } from 'react-icons/lu'

export interface BackLinkProps {
  label: string
  href: string
}

const BackLink: FC<BackLinkProps> = ({ label, href }) => {
  return (
    <Link href={href}>
      <Flex
        gap="2"
        align="center"
        w="fit-content"
        border="1px solid"
        borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
        borderRadius="4px"
        p="2"
        pr="3"
      >
        <LuChevronLeft size="24px" />
        <Text fontWeight="bold">{label}</Text>
      </Flex>
    </Link>
  )
}

export default BackLink
