"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/zodSchemas";
import {
  useToast,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  VStack,
  Image,
  Text
} from "@chakra-ui/react";

export default function ProfileForm({ initialData }: { initialData: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: initialData?.display_name || "",
      bio: initialData?.bio || "",
      location: initialData?.location || "",
      tennis_type_name: initialData?.tennis_type_name || "",
      tennis_comment: initialData?.tennis_comment || "",
      // tennis_image_urlはサーバー側で更新される想定とし、フォームには表示しないため、ここでは送らない
      // もし編集を考慮するならhidden等で保持できますが、ここでは常に表示のみ
    },
  });
  const toast = useToast();

  async function onSubmit(data: any) {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Update failed",
        description: json.error || "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const tennisImageUrl = initialData?.tennis_image_url;

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt="10"
      p={8}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
    >
      <Heading mb="4" size="lg" textAlign="center">
        Your Profile
      </Heading>

      {/* テニスキャラクター画像表示エリア */}
      <Box mb={6} textAlign="center">
        {tennisImageUrl ? (
          <Image
            src={tennisImageUrl}
            alt="Tennis Character"
            display="inline-block"
            borderRadius="md"
            maxW="200px"
            border="1px solid"
            borderColor="gray.200"
          />
        ) : (
          <Text color="gray.500">No tennis character image available</Text>
        )}
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.display_name}>
            <FormLabel>Display Name</FormLabel>
            <Input
              {...register("display_name")}
              placeholder="Your display name"
              focusBorderColor="brand.500"
            />
            {errors.display_name && (
              <FormErrorMessage>{errors.display_name.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.location}>
            <FormLabel>Location</FormLabel>
            <Input
              {...register("location")}
              placeholder="e.g. New York, USA"
              focusBorderColor="brand.500"
            />
            {errors.location && (
              <FormErrorMessage>{errors.location.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.bio}>
            <FormLabel>Bio</FormLabel>
            <Textarea
              {...register("bio")}
              placeholder="A short introduction about yourself"
              focusBorderColor="brand.500"
            />
            {errors.bio && (
              <FormErrorMessage>{errors.bio.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.tennis_type_name}>
            <FormLabel>Tennis Type Name</FormLabel>
            <Input
              {...register("tennis_type_name")}
              placeholder="e.g. Aggressive Baseliner"
              focusBorderColor="brand.500"
            />
            {errors.tennis_type_name && (
              <FormErrorMessage>{errors.tennis_type_name.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.tennis_comment}>
            <FormLabel>Tennis Comment</FormLabel>
            <Textarea
              {...register("tennis_comment")}
              placeholder="A detailed description of your tennis style"
              focusBorderColor="brand.500"
            />
            {errors.tennis_comment && (
              <FormErrorMessage>{errors.tennis_comment.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button type="submit" colorScheme="brand">
            Update Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
}