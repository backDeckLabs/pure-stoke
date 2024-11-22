import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'
import { pureStokeSystem } from '@/theme'

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={pureStokeSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
