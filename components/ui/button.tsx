import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from '@chakra-ui/react'
import * as React from 'react'

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {
  colorPalette?: 'teal' | 'purple' | 'cyan'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ colorPalette = 'teal', ...props }, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props
    return (
      <ChakraButton
        disabled={loading || disabled}
        ref={ref}
        {...rest}
        colorPalette={colorPalette}
        fontWeight="bold"
      >
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    )
  }
)
