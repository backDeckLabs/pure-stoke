import { getRandomIndex } from '@/lib/js-utils'
import { AspectRatio, Box } from '@chakra-ui/react'
import React, { FC } from 'react'

export interface LogoMaskProps {
  backgroundAsset?: string
  width?: string
}

const LogoMask: FC<LogoMaskProps> = ({
  backgroundAsset = '/assets/videos/sailing-bg-1.mp4',
  width = '600px',
}) => {
  const logoAssetPath = '/assets/logos/Logo_vector_dark.svg'

  const defaultBackgroundAssets = [
    '/assets/videos/sailing-bg-1.mp4',
    '/assets/videos/sky-timelapse.mp4',
    '/assets/videos/surfing-water.mp4',
    '/assets/videos/ocean-waves-sunset.mp4',
  ]
  const defaultAssetIndex = getRandomIndex(defaultBackgroundAssets.length)
  const backgroundAssetUrl =
    backgroundAsset || defaultBackgroundAssets[defaultAssetIndex]

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
        {/* Use an image or a video as the background */}
        <video autoPlay muted loop>
          <source src={backgroundAssetUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
    </Box>
  )
}

export default LogoMask
