// src/lib/theme.ts
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
    components: {
        Radio: {
            baseStyle: {
                control: {
                    borderColor: 'gray.400',
                    borderWidth: '2px',
                    borderRadius: 'full',
                    bg: 'transparent',
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: 'none',
                    _hover: {
                        borderColor: 'blue.400',
                        transform: 'scale(1.05)',
                    },
                    _focusVisible: {
                        boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
                        transform: 'scale(1.05)',
                    },
                    _checked: {
                        bg: 'blue.500',
                        borderColor: 'blue.500',
                        color: 'white',
                        transform: 'scale(1.1)',
                        _hover: {
                            bg: 'blue.600',
                            borderColor: 'blue.600',
                        },
                        _focusVisible: {
                            boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
                        },
                    },
                    _disabled: {
                        bg: 'gray.200',
                        borderColor: 'gray.200',
                        cursor: 'not-allowed',
                        opacity: 0.6,
                        _hover: {
                            transform: 'none',
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
                    color: 'gray.700',
                    transition: 'color 0.2s',
                    _hover: {
                        color: 'gray.800',
                    },
                    _disabled: {
                        color: 'gray.400',
                    },
                },
            },
        },
    },
});

export default customTheme;