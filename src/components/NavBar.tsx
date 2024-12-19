'use client'

import { useSession, signOut } from 'next-auth/react'
import { 
  Flex, 
  Heading, 
  Spacer, 
  Button, 
  Link as ChakraLink, 
  HStack, 
  useColorModeValue, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  MenuDivider, 
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Box,
  Divider
} from '@chakra-ui/react'
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function NavBar() {
  const { data: session } = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const bgGradient = useColorModeValue(
    'linear(to-r, brand.400, brand.500)', 
    'linear(to-r, brand.700, brand.800)'
  )
  const textColor = useColorModeValue('white', 'gray.100')
  const hoverColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.900')
  const borderColor = useColorModeValue('whiteAlpha.600', 'whiteAlpha.800')

  const navLinks = [
    { href: '/profile', label: 'Profile' },
    { href: '/posts', label: 'Posts' },
    { href: '/tennis-diagnosis', label: 'AI診断' },
    { href: '/library', label: 'Library' } // ライブラリページリンク追加済み
  ]

  const AuthLinks = () => (
    <>
      {navLinks.map((navItem) => (
        <ChakraLink
          as={NextLink}
          key={navItem.href}
          href={navItem.href}
          aria-label={`Navigate to ${navItem.label}`}
          _hover={{ textDecoration: 'underline', color: hoverColor }}
          fontWeight="semibold"
          transition="color 0.2s ease"
        >
          {navItem.label}
        </ChakraLink>
      ))}
      <Button 
        variant="outline" 
        onClick={() => signOut()} 
        borderColor={borderColor} 
        color="white"
        _hover={{ bg: 'whiteAlpha.200' }}
        transition="background 0.2s ease"
        aria-label="Logout"
      >
        Logout
      </Button>
    </>
  )

  const GuestLinks = () => (
    <>
      {navLinks.map((navItem) => (
        <ChakraLink
          as={NextLink}
          key={navItem.href}
          href={navItem.href}
          aria-label={`Navigate to ${navItem.label}`}
          _hover={{ textDecoration: 'underline', color: hoverColor }}
          fontWeight="semibold"
          transition="color 0.2s ease"
        >
          {navItem.label}
        </ChakraLink>
      ))}
      <ChakraLink
        as={NextLink}
        href="/signin"
        aria-label="Sign In page"
        _hover={{ textDecoration: 'underline', color: hoverColor }}
        fontWeight="semibold"
        transition="color 0.2s ease"
      >
        Sign In
      </ChakraLink>
      <ChakraLink
        as={NextLink}
        href="/signup"
        aria-label="Sign Up page"
        _hover={{ textDecoration: 'underline', color: hoverColor }}
        fontWeight="semibold"
        transition="color 0.2s ease"
      >
        Sign Up
      </ChakraLink>
    </>
  )

  return (
    <Flex
      as="header"
      aria-label="Main Navigation"
      align="center"
      bgGradient={bgGradient}
      color={textColor}
      px={4}
      py={3}
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="999"
    >
      <HStack spacing={3}>
        <Box as="span" aria-hidden="true">
          🎾
        </Box>
        <Heading as="h1" size="md" fontWeight="bold" letterSpacing="wide" aria-label="Tennis HUB Home">
          <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: 'none' }} color="white">
            Tennis HUB
          </ChakraLink>
        </Heading>
      </HStack>
      <Spacer />

      {/* デスクトップ表示 */}
      <HStack display={{ base: 'none', md: 'flex' }} spacing={6}>
        {session?.user ? <AuthLinks /> : <GuestLinks />}
        <IconButton
          aria-label="Toggle Color Mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
          color="white"
          onClick={toggleColorMode}
          _hover={{ bg: 'whiteAlpha.200' }}
          transition="background 0.2s ease"
        />

        {session?.user && (
          <Menu>
            <MenuButton as={IconButton} variant="ghost" _hover={{ bg: 'whiteAlpha.200' }} aria-label="User menu" aria-haspopup="true">
              <Avatar size="sm" name={session.user.name || 'User'} src={session.user.image || ''} />
            </MenuButton>
            <MenuList>
              <MenuItem as={NextLink} href="/profile" fontWeight="semibold" aria-label="My Profile">My Profile</MenuItem>
              <MenuDivider />
              <MenuItem fontWeight="semibold" onClick={() => signOut()} aria-label="Logout">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>

      {/* モバイル表示: ハンバーガーメニュー */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        aria-label="Open Navigation Menu"
        icon={<HamburgerIcon />}
        variant="ghost"
        color="white"
        onClick={onOpen}
        ml={2}
        _hover={{ bg: 'whiteAlpha.200' }}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} aria-label="Mobile Navigation Menu">
        <DrawerOverlay />
        <DrawerContent bgGradient={bgGradient} color={textColor}>
          <DrawerCloseButton aria-label="Close Menu" />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {session?.user ? <AuthLinks /> : <GuestLinks />}
              <Button
                variant="ghost"
                onClick={toggleColorMode}
                leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                fontWeight="semibold"
                justifyContent="flex-start"
                width="100%"
                _hover={{ bg: 'whiteAlpha.200' }}
                aria-label="Toggle Color Mode in Mobile"
              >
                {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>

              {session?.user && (
                <>
                  <Divider borderColor={borderColor} />
                  <Button 
                    variant="ghost" 
                    onClick={() => signOut()} 
                    fontWeight="semibold"
                    justifyContent="flex-start"
                    width="100%"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    aria-label="Logout"
                  >
                    Logout
                  </Button>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}