import { AspectRatio, Box } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, useEffect, useRef, useState } from 'react'

export interface LogoMaskProps {
  backgroundAsset?: string
  width?: string
}

const LogoMask: FC<LogoMaskProps> = ({ backgroundAsset, width = '600px' }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [clientReady, setClientReady] = useState(false)

  const logoAssetPath = '/assets/logos/Logo_vector_dark.svg'

  useEffect(() => {
    setClientReady(true)
    setTimeout(() => {
      setVideoLoaded(true)
    }, 200)
    console.log('set client to ready')
  }, [])

  // Set video loaded to handle fade in
  // useEffect(() => {
  //   if (!setVideoLoaded && videoRef.current?.complete) {
  //     setVideoLoaded(true)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [videoRef.current])

  const handleVideoLoad = (event) => {
    console.log('video loaded', event)
    setVideoLoaded(true)
  }

  return (
    <Box
      className="logo-container"
      w={width}
      pointerEvents="none"
      css={{
        '&': {
          position: 'relative',
          maskImage: `url("${logoAssetPath}")`,
          WebkitMaskImage: `url("${logoAssetPath}")`,
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          maskSize: 'contain',
        },
        '& video': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      }}
    >
      <AspectRatio ratio={932 / 268} w="full">
        {clientReady ? (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: videoLoaded ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%' }}
            >
              <video autoPlay muted loop onLoad={handleVideoLoad}>
                <source src={backgroundAsset} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div />
        )}
      </AspectRatio>
    </Box>
  )
}

export default LogoMask
