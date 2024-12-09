import React, { FC } from 'react'
import { Prose } from '../ui/prose'
import { Box } from '@chakra-ui/react'

export interface RenderHtmlProps {
  /** HTML markup string to render */
  markup: string
}

const RenderHtml: FC<RenderHtmlProps> = ({ markup }) => {
  const htmlContent = String.raw

  const content = htmlContent`${markup}`

  return (
    <Box color={{ base: 'gray.950', _dark: 'gray.50' }}>
      <Prose dangerouslySetInnerHTML={{ __html: content }} size="lg" w="full" />
    </Box>
  )
}

export default RenderHtml
