/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Box, Flex, Text } from '@chakra-ui/react'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { CloseButton } from '../ui/close-button'
import { FileUploadRoot, FileUploadTrigger } from '../ui/file-upload'
import { Button } from '../ui/button'
import { LuUpload } from 'react-icons/lu'

export interface SectionImageBlockProps {
  onChange: (value: File | null) => void
  onRemove: () => void
}

const SectionImageBlock: FC<SectionImageBlockProps> = ({
  onChange,
  onRemove,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    onChange(selectedImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage])

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file) {
        setError('No file selected')
        return
      }

      if (file.size > 50 * 1024 * 1024) {
        // 50MB size limit
        setError('File size exceeds 50MB')
        return
      }

      setError('')
      setSelectedImage(file)

      // Create a preview URL
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  return (
    <Box
      position="relative"
      border="1px dashed"
      borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
      borderRadius="4px"
      p="4"
    >
      <FileUploadRoot accept="image/*" onChange={handleFileChange}>
        <Flex gap="2">
          <FileUploadTrigger>
            <Button variant="surface" colorPalette="gray">
              <LuUpload /> {previewUrl ? 'Change photo' : 'Upload photo'}
            </Button>
          </FileUploadTrigger>
        </Flex>
      </FileUploadRoot>
      <Text fontSize="xs" mt="2">
        Any image type, up to 50MB
      </Text>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ width: '100%', marginTop: '20px' }}
        />
      )}
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

export default SectionImageBlock
