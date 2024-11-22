/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Box } from '@chakra-ui/react'
import { ChangeEvent, FC, useEffect, useState } from 'react'

export interface SectionImageBlockProps {
  onChange: (value: File | null) => void
}

const SectionImageBlock: FC<SectionImageBlockProps> = ({ onChange }) => {
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
    <Box border="1px dashed" borderColor="gray.300" borderRadius="16px" p="4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxWidth: '300px', marginTop: '20px' }}
        />
      )}
    </Box>
  )
}

export default SectionImageBlock
