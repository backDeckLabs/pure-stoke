/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

export interface FadeImgProps {
  /** Source url of image to display */
  src: string
  /** Alt text for the image */
  alt: string
  /** styles to attach to the img tag */
  style?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  /** Loading strategy for the image */
  imgLoading?: 'lazy' | 'eager'
  /** Transition duration in seconds */
  transitionDuration?: number
  /** Height of the image container */
  containerHeight?: string
  /** Callback to trigger on load of image */
  onImgLoad?: () => void
}

const FadeImg: FC<FadeImgProps> = ({
  src,
  alt,
  style = {},
  imgLoading = 'lazy',
  transitionDuration = 0.4,
  containerHeight = 'full',
  onImgLoad,
  ...props
}) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Set image loaded to handle fade in
  useEffect(() => {
    if (!imageLoaded && imageRef.current?.complete) {
      setImageLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageRef.current])

  const handleImgLoad = () => {
    setImageLoaded(true)

    // Trigger optinoal callback
    onImgLoad?.()
  }

  return (
    <Box w="full" h={containerHeight}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: transitionDuration }}
          style={{ width: '100%', height: '100%' }}
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            onLoad={handleImgLoad}
            loading={imgLoading}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              userSelect: 'none',
              ...style,
            }}
            {...props}
          />
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}

export default FadeImg
