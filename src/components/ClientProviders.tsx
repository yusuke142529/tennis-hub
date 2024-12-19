// src/components/ClientProviders.tsx
'use client'

import { ReactNode } from 'react'
import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { DiagnosisProvider } from '@/lib/store'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// システムテーマに応じた自動切り替え設定
const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

// semanticTokensは _light / _dark を使用
const semanticTokens = {
  colors: {
    bgBody: { _light: 'gray.50', _dark: 'gray.800' },
    textBody: { _light: 'gray.800', _dark: 'gray.200' },
    borderDefault: { _light: 'gray.400', _dark: 'gray.600' },
    brandPrimary: { _light: 'brand.500', _dark: 'brand.400' },
    brandHover: { _light: 'brand.600', _dark: 'brand.300' },
    radioHoverBorder: { _light: 'blue.400', _dark: 'blue.300' },
    radioCheckedBg: { _light: 'blue.500', _dark: 'blue.400' },
    radioCheckedHoverBg: { _light: 'blue.600', _dark: 'blue.500' },
    // focusRingはRGBAで直接定義
    focusRing: { _light: 'rgba(66, 153, 225, 0.6)', _dark: 'rgba(66, 153, 225, 0.8)' },
    textHover: { _light: 'gray.800', _dark: 'gray.100' },
  },
}

const theme = extendTheme({
  config,
  semanticTokens,
  fonts: {
    heading: `${inter.style.fontFamily}, ${baseTheme.fonts.heading}`,
    body: `${inter.style.fontFamily}, ${baseTheme.fonts.body}`,
  },
  colors: {
    brand: {
      50: '#eef5ff',
      100: '#cfe1ff',
      200: '#9fc2ff',
      300: '#6fa4ff',
      400: '#4085ff',
      500: '#0067ff',
      600: '#0052cc',
      700: '#003e99',
      800: '#002966',
      900: '#001533',
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brandPrimary',
          color: 'white',
          transition: 'background-color 0.2s ease',
          _hover: {
            bg: 'brandHover',
          },
          _active: {
            bg: 'brand.700',
            transform: 'scale(0.98)',
          },
          _focusVisible: {
            // focusRingはsemanticTokenとして色のみを参照可能だが、boxShadowはトークンを直書きできない場合がある
            // 一旦直接var()で参照
            boxShadow: '0 0 0 3px var(--chakra-colors-focusRing)',
          },
        },
        outline: {
          borderColor: 'brandPrimary',
          color: 'brandPrimary',
          _hover: {
            bg: 'brand.50',
          },
          _active: {
            bg: 'brand.100',
            transform: 'scale(0.98)',
          },
          _focusVisible: {
            boxShadow: '0 0 0 3px var(--chakra-colors-focusRing)',
          },
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },
    Radio: {
      baseStyle: {
        control: {
          borderColor: 'borderDefault',
          borderWidth: '2px',
          borderRadius: 'full',
          bg: 'transparent',
          transition: 'all 0.3s cubic-bezier(0.25,0.8,0.25,1)',
          boxShadow: 'none',
          _hover: {
            borderColor: 'radioHoverBorder',
            transform: 'scale(1.05)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          },
          _focusVisible: {
            boxShadow: '0 0 0 3px var(--chakra-colors-focusRing)',
            transform: 'scale(1.05)',
          },
          _checked: {
            bg: 'radioCheckedBg',
            borderColor: 'radioCheckedBg',
            color: 'white',
            transform: 'scale(1.1)',
            bgGradient: 'linear(to-br, brand.500, brand.600)',
            _hover: {
              bg: 'radioCheckedHoverBg',
              borderColor: 'radioCheckedHoverBg',
            },
            _focusVisible: {
              boxShadow: '0 0 0 3px var(--chakra-colors-focusRing)',
            },
          },
          _disabled: {
            bg: 'gray.200',
            borderColor: 'gray.200',
            cursor: 'not-allowed',
            opacity: 0.6,
            _hover: {
              transform: 'none',
              boxShadow: 'none',
            },
          },
          _active: {
            transform: 'scale(1.08)',
          },
        },
        label: {
          ml: 3,
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'textBody',
          transition: 'color 0.2s',
          // ダークモード対応はsemantic token "textHover"で対応
          _hover: {
            color: 'textHover',
          },
          _disabled: {
            color: 'gray.400',
          },
        },
      },
      variants: {
        modern: {
          control: {
            borderWidth: '2px',
            _checked: {
              bgGradient: 'linear(to-r, brand.500, brand.700)',
              transform: 'translateY(-1px) scale(1.1)',
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'bgBody',
        color: 'textBody',
      },
    },
  },
})

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <DiagnosisProvider>
          {children}
        </DiagnosisProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}