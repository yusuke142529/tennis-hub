// src/app/users/page.tsx
'use client'

import useSWR from 'swr'
import { Box, Heading, Text, Spinner, Center, VStack, useColorModeValue, Badge } from '@chakra-ui/react'

const fetcher = (url:string) => fetch(url).then(r => r.json())

export default function UsersPage() {
  const {data:users,error} = useSWR('/api/user', fetcher)
  const bg = useColorModeValue('white', 'gray.800')

  if(error) return (
    <Center minH="50vh">
      <Text color="red.500">Failed to load users</Text>
    </Center>
  )

  if(!users) return (
    <Center minH="50vh" flexDirection="column">
      <Spinner size="xl" color="brand.500" mb={4}/>
      <Text fontSize="lg">Loading...</Text>
    </Center>
  )

  return (
    <Box maxW="600px" mx="auto" mt="10" p={4} bg={bg} borderRadius="md" boxShadow="sm">
      <Heading mb="4" size="lg" textAlign="center">All Users</Heading>
      <VStack spacing={4} align="stretch">
        {users.map((u:any) => (
          <Box key={u.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="xs">
            <Text fontWeight="semibold">{u.email}</Text>
            <Text fontSize="sm" color="gray.600">Verified: {u.email_verified_at ? <Badge colorScheme="green">Yes</Badge> : <Badge colorScheme="red">No</Badge>}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}