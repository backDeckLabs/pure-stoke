import { Box, chakra, useRecipe } from '@chakra-ui/react'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import AutoResize from 'react-textarea-autosize'
import { CloseButton } from '../ui/close-button'

export interface SectionTextBlockProps {
  onChange: (value: string) => void
  onRemove: () => void
}

const StyledAutoResize = chakra(AutoResize)

const SectionTextBlock: FC<SectionTextBlockProps> = ({
  onChange,
  onRemove,
}) => {
  const recipe = useRecipe({ key: 'textarea' })
  const styles = recipe({ size: 'lg', variant: 'outline' })

  const [value, setValue] = useState('')

  useEffect(() => {
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  return (
    <Box position="relative">
      <StyledAutoResize
        value={value}
        onChange={handleTextChange}
        placeholder="So this one time..."
        minH="100px"
        resize="none"
        overflow="hidden"
        lineHeight="inherit"
        css={styles}
      />
      <CloseButton
        position="absolute"
        top="1"
        right="1"
        size="xs"
        variant="subtle"
        colorPalette="gray"
        onClick={onRemove}
      />
    </Box>
  )
}

export default SectionTextBlock
