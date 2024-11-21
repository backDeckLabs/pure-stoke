/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { uploadImage } from '@/lib/image-upload'
import { ChangeEvent, useState } from 'react'

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')

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

      // Upload to Hygraph
      // TODO: emit the file to the parent component and upload it at another time
      const response = await uploadImage(file)
      console.log('image uploaded? ', response)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxWidth: '300px', marginTop: '20px' }}
        />
      )}
    </div>
  )
}
