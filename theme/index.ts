import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'

const config = defineConfig({
  ...defaultConfig,
  cssVarsPrefix: 'stoke',
  globalCss: {
    'html, body': {
      display: 'flex',
      flexDirection: 'column',
      m: '0',
      minH: 'var(--chakra-vh)',
      bg: 'secondary.100',
      color: 'grey.800',
      fontFamily: 'body',
      ['&.chakra-ui-dark']: {
        bg: 'secondary.200',
        color: 'grey.100',
      },
    },
  },
})

export const pureStokeSystem = createSystem(config)
